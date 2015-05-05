//conf.js
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://147.32.80.219:8080/integracni-portal-ui/',
    suites: {
        home: './home/home.spec.js',
        admin: './admin/admin.spec.js',
        settings: './settings/settings.spec.js'
    },
    capabilities: {
        browserName: 'firefox'
    },
    onPrepare: function () {
        browser.driver.manage().window().setSize(1024, 768);
    }
};
