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

    it('should get to admin page', function () {
        admin.getToAdmin();
        expect(browser.getCurrentUrl()).toContain('admin');
    });

    it('should load org units', function () {
        expect(admin.getUnits().count() > 0);
    });

    it('should create orgunit', function () {
        var count = admin.getUnits().count();
        admin.createUnit('newUnit', 34, 'email@gege.com');
        expect(admin.getUnits.count() === count + 1);
    });

    it('should edit orgunit', function () {
        admin.editUnit('editted', 1, 'gege@gegw.gew');
        expect(admin.getUnits().row(0).getText()).toContain('editted', 'gege@gegw.gew');
    });

    it('should delete orgunit', function () {
        var count = admin.getUnits();
        admin.deleteUnit();
        expect(admin.getUnits().count() === count - 1);
    });

    // externists
    it('should go to externists', function () {
        admin.getToExternists();
        expect(admin.getExternists().count() > 0);
    });

    it('should create externist', function () {
        var count = admin.getExternists().count();
        admin.createExternist('newUser', 'email@gege.com', 32, 'testunit', 'onuser@gre.hre');
        expect(admin.getExternists.count() === count + 1);
    });

    it('should edit externist', function () {
        admin.editExternist('edittedUser', 'email@gegewge.com', 52, 'testunit2', 'onuser2@gre.hre');
        expect(admin.getExternists().row(0).getText()).toContain('edittedUser', 'email@gegewge.com');
    });

    it('should delete externist', function () {
        var count = admin.getExternists();
        admin.deleteExternist();
        expect(admin.getExternists().count() === count - 1);
    });

    // back to units
    it('should go to orgunits', function () {
        admin.getToUnits();
        expect(admin.getUnits().count() > 0);
    });
});


