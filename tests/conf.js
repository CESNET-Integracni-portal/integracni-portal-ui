//conf.js

// This is the configuration file showing how a suite of tests might
// handle log-in using the onPrepare field.
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://147.32.80.219:8080/integracni-portal-ui/',
    specs: [
        'spec.js'
    ],
    capabilities: {
        browserName: 'firefox'
    },
    
    onPrepare: function () {
        browser.driver.get('http://147.32.80.219:8080/integracni-portal-ui/login.html');
        browser.driver.findElement(by.id('admlog')).click();

        browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /index/.test(url);
            });
        }, 10000);
    }
};
