module.exports = function() {
    var client = './src/client/';
    var server = './src/server/';
    var clientApp = client + 'app/';
    var clientTest = client + 'test/';
    var report = './report/';
    var root = './';
    var specRunnerFile = 'specs.html';
    var temp = './.tmp/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true}).js;
    var bower = {
        json: require('./bower.json'),
        directory: './bower_components/',
        ignorePath: '../..'
    };
    var nodeModules = 'node_modules';

    var config = {
    	build: './build/',
    	client: client,
    	clientApp: clientApp,
    	css: temp + 'css/styles.css',
    	fonts: [
    	        client + 'styles/fonts/**/*.*',
    	        'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
    	        'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
    	        'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'
    	        ],
    	html: client + '**/*.html',
    	index: 'index.html',
    	preprocessScripts: [client + '**/app.module.js'],
    	images: client + 'images/**/*.*',
    	
    	
    	favicon: server + 'favicon.ico',
    	
        /**
         * File paths
         */
        // all javascript that we want to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        htmltemplates: clientApp + '**/*.html',
        // app js, with no specs
        js: [
            client + '**/*.module.js',
            client + '**/*.js',
            '!' + clientTest + '**/*',
            temp + '**/app.module.js',
            '!' + client + '**/app.module.js'
        ],
        jsOrder: [
            '**/*.module.js',
            '**/app.module.js',
            '**/*.js'
        ],
        sass: [
			client + 'styles/scss/styles.scss',
			client + '**/*.scss'
		],
        warConfig: "./config/WEB-INF/**",
        report: report,
        root: root,
        server: server,
        source: 'src/',
        stubsjs: [
            bower.directory + 'angular-mocks/angular-mocks.js',
            client + 'stubs/**/*.js'
        ],
        temp: temp,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * plato
         */
        plato: {js: clientApp + '**/*.js'},

        /**
         * browser sync
         */
        browserReloadDelay: 5000,

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.module',
                root: 'app/',
                standAlone: false
            }
        },

        /**
         * Bower and NPM files
         */
        bower: bower,
        packages: [
            './package.json',
            './bower.json'
        ],

        /**
         * specs.html, our HTML spec runner
         */
        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,

        /**
         * The sequence of the injections into specs.html:
         *  1 testlibraries
         *      mocha setup
         *  2 bower
         *  3 js
         *  4 spechelpers
         *  5 specs
         *  6 templates
         */
        testlibraries: [
            nodeModules + '/mocha/mocha.js',
            nodeModules + '/chai/chai.js',
            nodeModules + '/mocha-clean/index.js',
            nodeModules + '/sinon-chai/lib/sinon-chai.js'
        ],
        specHelpers: [client + 'test-helpers/*.js'],
        specs: [clientTest + '**/*.spec.js'],
        serverIntegrationSpecs: [client + '/tests/server-integration/**/*.spec.js'],

        /**
         * E2E settings
         */
        scenarios: clientTest + '**/*.spec.e2e.js',

        /**
         * Node settings
         */
        nodeServer: './src/server/app.js',
        defaultPort: '8001'
    };

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    /**
     * karma settings
     */
    config.karma = getKarmaOptions();

    return config;

    ////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                clientApp + '**/*.module.js',
                clientApp + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'} //, subdir: '.', file: 'text-summary.txt'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }
};
