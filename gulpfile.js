var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var glob = require('glob');
var gp = require('gulp-protractor');
var gulp = require('gulp');
var path = require('path');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});
var eslint = require('gulp-eslint');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var preprocess = require('gulp-preprocess');

var colors = $.util.colors;
var envenv = $.util.env;
var port = process.env.PORT || config.defaultPort;

/**
 * yargs variables can be passed in to alter the behavior, when present.
 * Example: gulp serve-dev
 *
 * --verbose  : Various tasks will produce more output to the console.
 * --nosync   : Don't launch the browser with browser-sync when serving code.
 * --debug    : Launch debugger with node-inspector.
 * --debug-brk: Launch debugger and break on 1st line with node-inspector.
 * --startServers: Will start servers for midway tests on the test task.
 */

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * vet the code and create coverage report
 * @return {Stream}
 */
gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
        // @todo FS
        // commenting out jscs for now, as we'll try to switch to eslint completely or use both together
        //.pipe($.jscs());
});

/**
 * Create a visualizer report
 */
gulp.task('plato', function(done) {
    log('Analyzing source with Plato');
    log('Browse to /report/plato/index.html to see Plato results');

    startPlatoVisualizer(done);
});

/**
*  * Quality check against styleguide
*   * @return {Stream}
*    */
gulp.task('quality', function() {
    gulp.src(['app/**/*.js'])
        .pipe(eslint({}))
        .pipe(eslint.format());
});

/**
 * Compile SASS to css
 * @return {Stream}
 */
gulp.task('preprocess-styles', ['clean-styles'], function() {
    log('Compiling Sass --> CSS');
    var sass = require('gulp-sass');
    return gulp
        .src(config.sass)
		.pipe(sourcemaps.init())
        .pipe($.plumber()) // exit gracefully if something fails after this
        .pipe(sass({errLogToConsole: true}))
		.pipe(sourcemaps.write())
//        .on('error', errorLogger) // more verbose and dupe output. requires emit.
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp + 'css/'));
});
/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function(done) {
    var files = [].concat(
        config.temp + '**/*.css',
        config.build + 'styles/**/*.css'
    );
    clean(files, done);
});
/**
 * Watch changes on SASS files and call preprocessing.
 */
gulp.task('watch-styles', function() {
    gulp.watch([config.sass], ['preprocess-styles']).on('change', changeEvent);
});
/**
 * Inject styles into the index page.
 * @return {Stream}
 */
gulp.task('inject-styles', ['preprocess-styles', 'inject-scripts'], function() {
	log('Wire up css into the html, after files are ready');

    return gulp
        .src(config.temp + config.index)
        .pipe(inject(config.css))
        .pipe(gulp.dest(config.temp));
});

/**
 * Preprocessing scripts and copying them to the temp file
 * @return {Stream}
 */
gulp.task('preprocess-scripts', ['clean-scripts'], function() {
	log('Copying Scripts to temp file');
	var environment = require('./config/env_'+getEnvironment())();
	
	return gulp.src(config.preprocessScripts)
		.pipe(preprocess({
			context: {
				ROOT_CONTEXT: environment.rootContext,
				BASE_URL: environment.baseUrl,
				OAUTH_URL: environment.oauthUrl
			}
		}))
		.pipe(gulp.dest(config.temp));
});
/**
 * Remove all scripts from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-scripts', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + 'js/**/*.js'
    );
    clean(files, done);
});
/**
 * Watch changes on script files and call preprocessing.
 */
gulp.task('watch-scripts', function() {
    gulp.watch([config.preprocessScripts], ['preprocess-scripts']).on('change', changeEvent);
});
/**
 * Wire-up scripts and the bower dependencies.
 * @return {Stream}
 */
gulp.task('inject-scripts', ['preprocess-scripts'], function() {
	log('Wiring the bower dependencies into the html');
	
	var wiredep = require('wiredep').stream;
	var options = config.getWiredepDefaultOptions();

	// Only include stubs if flag is enabled
	var js = args.stubs ? [].concat(config.js, config.stubsjs) : config.js;

	return gulp
	.src(config.client + config.index)
	.pipe(wiredep(options))
	.pipe(inject(js, '', config.jsOrder))
	.pipe(gulp.dest(config.temp));
});


/**
 * Preprocessing all messages into the message result file
 * @return {Stream}
 */
gulp.task('preprocess-messages', ['clean-messages'], function() {
	return mergeMessages("messages_cs.json");
//	.pipe(gulp.dest(config.temp+'messages/'));
});
/**
 * Remove all messages from the build and temp folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-messages', function(done) {
	var files = [].concat(
			config.temp + 'messages_cs.json',
			config.build + '**/messages_cs.json'
	);
	clean(files, done);
});

/**
 * Watch changes on messages files and call preprocessing.
 */
gulp.task('watch-messages', function() {
    gulp.watch(config.client+'messages/*.json', ['preprocess-messages']).on('change', changeEvent);
});

/**
 * Watch changes on index page file and call preprocessing.
 */
gulp.task('watch-index', function() {
    gulp.watch(config.client+config.index, ['inject']).on('change', changeEvent);
});

/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('copy-fonts', ['clean-fonts'], function() {
    log('Copying fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'styles/fonts'));
});
/**
 * Remove all fonts from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-fonts', function(done) {
      	clean(config.build + 'styles/fonts/**/*.*', done);
});

/**
 * Copy war archive configuration.
 * @return {Stream}
 */
gulp.task('copy-war-config', ['clean-war-config'], function() {
	log('Copying war config');
	
	return gulp
	.src(config.warConfig)
	.pipe(gulp.dest(config.build + 'WEB-INF'));
});
/**
 * Remove all war archive configuratuon from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-war-config', function(done) {
	clean(config.build + 'WEB-INF/**/*.*', done);
});


/**
 * Compress images
 * @return {Stream}
 */
gulp.task('copy-images', ['clean-images'], function() {
    log('Compressing and copying images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});
/**
 * Remove all images from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-images', function(done) {
    clean(config.build + 'images/**/*.*', done);
});

/**
 * Ă‡reate HTML5 cache manifest file.
 * Depends on build task.
 * @param  {Stream} index.html file stream
 * 
 */
gulp.task('cache-manifest', ['build', 'clean-cache-manifest'], function() {
		var manifest = require('gulp-manifest');
		var pkg = require('./package.json');
		var rev = require('gulp-rev');
		return gulp.src([config.build + "**/*.js", 
		                 config.build + "**/*.css", 
		                 config.build + "**/*.html",
		                 config.build + "**/*.gif", 
		                 config.build + "**/*.png", 
		                 config.favicon ])
		.pipe(manifest({
			hash: true,
			preferOnline: false,
			network: [''],
			filename: pkg.name + '.mf',
			exclude: pkg.name + '.mf'
		}))
		.pipe(rev())
		.pipe(gulp.dest(config.build));
});
/**
 * Remove all HTML5 cache manifests
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-cache-manifest', function(done) {
	clean(config.build + '*.mf', done);
});


/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', ['clean-code'], function() {
    log('Creating an AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.if(args.verbose, $.bytediff.start()))
        .pipe($.minifyHtml({empty: true}))
        .pipe($.if(args.verbose, $.bytediff.stop(bytediffFormatter)))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});

/**
 * Inject all dependenciest into the index page.
 */
gulp.task('inject', ['inject-styles', 'inject-scripts', 'templatecache'], function() {
    
});

/**
 * Optimize all files, move to a build folder,
 * and inject them into the new index.html
 * @return {Stream}
 */
gulp.task('optimize', ['inject', 'test'], function() {
    log('Optimizing the js, css, and html');

    var assets = $.useref.assets({searchPath: './'});
    // Filters are named for the gulp-useref path
    var cssFilter = $.filter('**/*.css');
    var jsAppFilter = $.filter('**/' + config.optimized.app);
    var jslibFilter = $.filter('**/' + config.optimized.lib);

    var templateCache = config.temp + config.templateCache.file;

    return gulp
        .src(config.temp + config.index)
        .pipe($.plumber())
        .pipe(inject(templateCache, 'templates'))
        .pipe(assets) // Gather all assets from the html with useref
        // Get the css
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        // Get the custom javascript
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate({add: true}))
        .pipe($.uglify())
        .pipe(getHeader())
        .pipe(jsAppFilter.restore())
        // Get the vendor javascript
        .pipe(jslibFilter)
        .pipe($.uglify()) // another option is to override wiredep to use min files
        .pipe(jslibFilter.restore())
        // Take inventory of the file names for future rev numbers
        .pipe($.rev())
        // Apply the concat and file replacement with useref
        .pipe(assets.restore())
        .pipe($.useref())
        // Replace the file names in the html with rev numbers
        .pipe($.revReplace())
        .pipe(gulp.dest(config.build));
});

/**
 * Build everything
 * This is separate so we can run tests on
 * optimize before handling image, fonts and war configuration
 */
gulp.task('build', ['optimize', 'copy-images', 'copy-fonts', 'preprocess-messages', 'copy-war-config'], function() {
    log('Building everything');

    var msg = {
        title: 'gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'Running `gulp serve-build`'
    };
    preprocessEnvironment(args.env);
    del(config.temp);
    log(msg);
    notify(msg);
});

/**
 * Watch changes on build project files and call preprocessing.
 */
gulp.task('watch-build', function() {
	 gulp.watch([config.sass, config.js, config.html], ['optimize', browserSync.reload])
    .on('change', changeEvent);
});

/**
 * Create application package war with all necessary information.
 * Depends on build and manifest tasks.
 * 
 */
gulp.task('package', ['build', 'cache-manifest'], function () {
	var pkg = require('./package.json');
	var zip = require('gulp-zip');
    gulp.src([config.build + "**/*.js", 
              config.build + "**/*.css", 
              config.build + "**/*.html", 
              config.build + "**/*.gif", 
              config.build + "**/*.png", 
              config.build + "**/*.xml",
              config.build + "**/*.jar",
              config.build + "**/*.woff",
              config.build + "**/*.woff2",
              config.build + "**/*.ttf",
              config.build + "**/*.otf",
              config.build + "**/*.json",
              config.favicon,
              config.build + '*.mf'])
        .pipe(zip(pkg.name + '-' + pkg.version + '.war'))
        .pipe(gulp.dest(config.build));
    
    
//    if(!args.env || args.env == 'prod' ||  args.env == 'test') {
//    	//set application manifest with cache into the html 	
//    	var tap = require('gulp-tap');
//    	gulp.src(config.build + '*.mf')
//    	     .pipe(tap(function(file, t) {
//    	    	 gulp.src(config.build + '/index.html')
// 		        .pipe(replace('<html data-ng-app="app">', '<html data-ng-app="app" manifest="'+file.relative+'">'))
// 		        .pipe(gulp.dest(config.build));
//		    }))
//    	.pipe(gulp.dest(config.build));
//    }
});








/**
 * Run the spec runner
 * @return {Stream}
 */
gulp.task('serve-specs', ['build-specs'], function(done) {
    log('run the spec runner');
    serve(true /* isDev */, true /* specRunner */);
    done();
});

/**
 * Inject all the spec files into the specs.html
 * @return {Stream}
 */
gulp.task('build-specs', ['templatecache'], function(done) {
    log('building the spec runner');

    var wiredep = require('wiredep').stream;
    var templateCache = config.temp + config.templateCache.file;
    var options = config.getWiredepDefaultOptions();
    var specs = config.specs;

    if (args.startServers) {
        specs = [].concat(specs, config.serverIntegrationSpecs);
    }
    options.devDependencies = true;

    return gulp
        .src(config.specRunner)
        .pipe(wiredep(options))
        .pipe(inject(config.js, '', config.jsOrder))
        .pipe(inject(config.testlibraries, 'testlibraries'))
        .pipe(inject(config.specHelpers, 'spechelpers'))
        .pipe(inject(specs, 'specs', ['**/*']))
        .pipe(inject(templateCache, 'templates'))
        .pipe(gulp.dest(config.client));
});



/**
 * Remove all files from the build, temp, and reports folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.temp, config.report);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});




/**
 * Remove all js and html from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-code', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + 'js/**/*.js',
        config.build + '**/*.html'
    );
    clean(files, done);
});

/**
 * Run specs once and exit
 * To start servers and run midway specs as well:
 *    gulp test --startServers
 * @return {Stream}
 */
gulp.task('test', ['vet', 'templatecache'], function(done) {
    // we don't have the karam setup fully ready yet, so we are not running it
    //startTests(true /*singleRun*/ , done);
    done();
});

/**
 * Run specs and wait.
 * Watch for file changes and re-run tests on each change
 * To start servers and run midway specs as well:
 *    gulp autotest --startServers
 */
gulp.task('autotest', function(done) {
    startTests(false /*singleRun*/ , done);
});

/**
 * Run e2e specs
 *
 * @return {Stream}
 */
gulp.task('test-e2e', ['vet'], function(done) {
    if(!args.env) {
		args.env = 'dev';
	}
	gulp.start(['inject', 'preprocess-messages', 'watch-index', 'watch-styles', 'watch-scripts', 'watch-messages']);
	serve(true /*isDev*/);
	runProtractor(function (){
		browserSync.exit();
	});
});

/**
 * serve the dev environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-dev', function() {
	if(!args.env) {
		args.env = 'dev';
	}
	gulp.start(['inject', 'preprocess-messages', 'watch-index', 'watch-styles', 'watch-scripts', 'watch-messages']);
    serve(true /*isDev*/);
});

/**
 * serve the build environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-build', function() {
	if(!args.env) {
		args.env = 'dev';
	}
	gulp.start(['build', 'watch-build']);
    serve(false /*isDev*/);
});


/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function() {
    var msg = 'Bumping versions';
    var type = args.type;
    var version = args.ver;
    var options = {};
    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }
    log(msg);

    return gulp
        .src(config.packages)
        .pipe($.print())
        .pipe($.bump(options))
        .pipe(gulp.dest(config.root));
});

////////////////

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * Preprocess all messages file into the result message file
 * @param filename result file
 */
function mergeMessages(filename){
	var extend = require('node.extend');
	var gutil = require('gulp-util');
	var tap = require('gulp-tap');
	var data = {};
 	return gulp.src(config.client+'messages/*.json')
 		.pipe(tap(function(file, t) {
 			var jsonFile = JSON.parse(file.contents.toString());
 	    	if(jsonFile.translation) {
 	    		data = extend(true, data, jsonFile.translation);
 	    	} else {
 	    		data = extend(true, data, jsonFile);
 	    	}
		 }))
		 .on('end', function (){
			 var src = require('stream').Readable({ objectMode: true });
		   	src._read = function () {
		   		this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(JSON.stringify(data)) }));
		   		this.push(null);
		   	};
		   	src.pipe(gulp.dest(config.temp+'messages/'));
		   	src.pipe(gulp.dest(config.build+'messages/'));
		 });
}

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
function inject(src, label, order) {
    var options = {read: false};
    if (label) {
        options.name = 'inject:' + label;
    }
    return $.inject(orderSrc(src, order), options);
}

/**
 * Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc (src, order) {
    //order = order || ['**/*'];
    return gulp
        .src(src)
        .pipe($.if(order !== null, $.order(order)));
}

/**
 * serve the code
 * --debug-brk or --debug
 * --nosync
 * @param  {Boolean} isDev - dev or build mode
 * @param  {Boolean} specRunner - server spec runner html
 */
function serve(isDev, specRunner) {
    var debug = args.debug || args.debugBrk;
    var debugMode = args.debug ? '--debug' : args.debugBrk ? '--debug-brk' : '';
    var nodeOptions = getNodeOptions(isDev);

    if (debug) {
        runNodeInspector();
        nodeOptions.nodeArgs = [debugMode + '=5858'];
    }

    if (args.verbose) {
        console.log(nodeOptions);
    }

    return $.nodemon(nodeOptions)
        .on('restart', ['vet'], function(ev) {
            log('*** nodemon restarted');
            log('files changed:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function () {
            log('*** nodemon started');
            startBrowserSync(isDev, specRunner);
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
}

function getNodeOptions(isDev) {
    return {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };
}

function runNodeInspector() {
    log('Running node-inspector.');
    log('Browse to http://localhost:8080/debug?port=5858');
    var exec = require('child_process').exec;
    exec('node-inspector');
}

/**
 * Start BrowserSync
 * --nosync will avoid browserSync
 */
function startBrowserSync(isDev, specRunner) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting BrowserSync on port ' + port);

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.sass,
            config.temp + '**/*.css'
        ] : [],
        ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 3000 //1000
    } ;
    if (specRunner) {
        options.startPath = config.specRunnerFile;
    }

    browserSync(options);
}

/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer(done) {
    log('Running Plato');

    var files = glob.sync(config.plato.js);
    var excludeFiles = /.*\.spec\.js/;
    var plato = require('plato');

    var options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    var outputDir = config.report + '/plato';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        if (args.verbose) {
            log(overview.summary);
        }
        if (done) { done(); }
    }
}

/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @param  {Function} done - Callback to fire when karma is done
 * @return {undefined}
 */
function startTests(singleRun, done) {
    var child;
    var excludeFiles = [];
    var fork = require('child_process').fork;
    var karma = require('karma').server;
    var serverSpecs = config.serverIntegrationSpecs;
    var e2eSpecs = [config.scenarios];
    var allSpes = [].concat(serverSpecs, e2eSpecs);


    if (args.startServers) {
        log('Starting servers');
        var savedEnv = process.env;
        savedEnv.NODE_ENV = 'dev';
        savedEnv.PORT = 8888;
        child = fork(config.nodeServer);
    } else {
        if (allSpecs && allSpecs.length) {
            excludeFiles = allSpecs;
        }
    }

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    ////////////////

    function karmaCompleted(karmaResult) {
        log('Karma completed');
        if (child) {
            log('shutting down the child process');
            child.kill();
        }
        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
}

/**
 * Start the tests using Protractor.
 * @param  {Function} done - Callback to fire when Protractor is done
 * @return {Stream}
 */
function runProtractor(done) {
    log('Running e2e specs...');

    return gulp
        .src([config.scenarios], {read:false})
        .pipe($.plumber())
        .pipe(gp.protractor({
            configFile: './protractor.conf.js'
        }))
        .on('error', function() {
            log('Protractor error.');
            done();
        })
        .on('end', function() {
            log('Protractor end.');
            done();
        })
        ;
}

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' +
        (data.endSize / 1000).toFixed(2) + ' kB and is ' +
        formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Log an error message and emit the end of a task
 */
function errorLogger(error) {
    log('*** Start of Error ***');
    log(error);
    log('*** End of Error ***');
    this.emit('end');
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted perentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}

/**
 * Format and return the header for files
 * @return {String}           Formatted file header
 */
function getHeader() {
    var pkg = require('./package.json');
    var template = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @authors <%= pkg.authors %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''
    ].join('\n');
    return $.header(template, {
        pkg: pkg
    });
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

/**
 * Show OS level notification using node-notifier
 */
function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle',
        contentImage: path.join(__dirname, 'gulp.png'),
        icon: path.join(__dirname, 'gulp.png')
    };
    _.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
}


/**
 * Preprocess all necessary configuration files for environment.
 * For example set application context root or services URL.
 * Environment enumeration:
 * 		prod - production version
 * 		test - test version
 * 		dev - develop version (localhost)
 */ 
function preprocessEnvironment(env) {
    if(env) {
    	log('Preprocessing data for concrete environment: ' + env);
    	//dev or test production, replace project configuration
    	var environment = require('./config/env_'+env)();
    	var rootContext = environment.rootContext;
    	if(rootContext && rootContext.length > 0) {
    		gulp.src(config.build + '/index.html')
    		.pipe(replace('<base href="/">', '<base href="/' + rootContext + '/">'))
    		.pipe(gulp.dest(config.build));
    		
    		gulp.src(config.build + '/WEB-INF/jboss-web.xml')
    		.pipe(replace('<context-root>/</context-root>', '<context-root>/' + rootContext + '</context-root>'))
    		.pipe(gulp.dest(config.build + 'WEB-INF'));
    	}
    }
}

function getEnvironment(){
	var env = args.env;
	if(!env){
		env = 'prod';
	}
	return env;
}

module.exports = gulp;
