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
        admin.getToExternists();
        admin.getToUnits();
        expect(admin.getUnits().get(0)).toBe('grehre');
    });

    it('should create orgunit', function () {
        var units = admin.getUnits();
        admin.createUnit('newUnit', 34, 'email@gege.com');
        expect(admin.getUnits.count() === units.count() + 1);
    });

    it('should edit orgunit', function () {
        admin.editUnit('editted', 1, 'gege@gegw.gew');
        expect(admin.getUnits().first().getText()).toContain('editted', 'gege@gegw.gew');
    });

    it('should delete orgunit', function () {
        var units = admin.getUnits();
        admin.deleteUnit();
        expect(admin.getUnits().count() === units.count() - 1);
    });

//    // externists
//    it('should go to externists', function () {
//        admin.getToExternists();
//        expect(admin.getExternists().count() > 0);
//    });
//
//    it('should create externist', function () {
//        var exts = admin.getExternists();
//        admin.createExternist('newUser', 'email@gege.com', 32, 'testunit', 'onuser@gre.hre');
//        expect(admin.getExternists.count() === exts.count() + 1);
//    });
//
//    it('should edit externist', function () {
//        admin.editExternist('edittedUser', 'email@gegewge.com', 52, 'testunit2', 'onuser2@gre.hre');
//        expect(admin.getExternists().first().getText()).toContain('edittedUser', 'email@gegewge.com');
//    });
//
//    it('should delete externist', function () {
//        var exts = admin.getExternists();
//        admin.deleteExternist();
//        expect(admin.getExternists().count() === exts.count() - 1);
//    });
//
//    // back to units
//    it('should go to orgunits', function () {
//        admin.getToUnits();
//        expect(admin.getUnits().count() > 0);
//    });
});


