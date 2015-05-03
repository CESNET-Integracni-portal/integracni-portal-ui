// settings page object
var Settings = require('./settings.po.js');

describe('integracni-portal - settings', function () {

    var stgs = new Settings();

    it('should log in', function () {
        stgs.get();
        var usr = "admin";
        stgs.login(usr, usr);
        expect(browser.getTitle()).toContain(usr);
    });
});
