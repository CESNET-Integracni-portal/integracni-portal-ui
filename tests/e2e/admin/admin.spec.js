// admin page object
var Admin = require('./admin.po.js');

describe('integracni-portal - admin', function () {

    var admin = new Admin();

    it('should log in', function () {
        admin.get();
        var usr = "admin";
        admin.login(usr, usr);
        expect(browser.getTitle()).toContain(usr);
    });
});


