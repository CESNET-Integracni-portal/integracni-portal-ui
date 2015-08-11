var gulpConfig = require('./gulp.config')();
var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');

exports.config = {
    baseUrl: 'http://localhost:' + gulpConfig.defaultPort,
    specs: [gulpConfig.scenarios],

    capabilities: {
        //browserName: 'firefox',
        browserName: 'phantomjs',
        /* 
         * Can be used to specify the phantomjs binary path.
         * This can generally be ommitted if you installed phantomjs globally.
         */
        'phantomjs.binary.path': require('phantomjs').path,

        /*
         * Command line args to pass to ghostdriver, phantomjs's browser driver.
         * See https://github.com/detro/ghostdriver#faq
         */
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
    },

    onPrepare: function() {
     	browser.driver.manage().window().maximize();
        // Add a screenshot reporter:
        jasmine.getEnv().addReporter(new HtmlReporter({
           baseDirectory: 'report/e2e',
           takeScreenShotsOnlyForFailedSpecs: true
        }));
    }
};
