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

    it('should show personal settings page', function () {
        stgs.getToSettings();
    });

    // pw
    it('should show password change page', function () {
        stgs.getToPassword();
        // TODO
        expect(true);
    });

    // labels
    it('should get labels', function () {
        stgs.getToLabels();
        expect(stgs.getLabels().count() > 0);
    });

    it('should create label', function () {
        var count = stgs.getLabels().count();
        stgs.createLabel('pinda', 3);
        expect(stgs.getLabels().count() === count + 1);
        expect(stgs.getLabels().last().getText()).toContain('pinda');
    });

    it('should edit label', function () {
        stgs.editLabel('pizdicka', 2);
        expect(stgs.getLabels().first().getText()).toContain('pizdicka');
    });

    it('should delete label', function () {
        var count = stgs.getLabels().count();
        stgs.deleteLabel();
        expect(stgs.getLabels().count() === count - 1);
    });

    // groups
    it('should get groups', function () {
        stgs.getToGroups();
        expect(stgs.getGroups().count() > 0);
    });

    it('should create group', function () {
        var count = stgs.getGroups().count();
        stgs.createGroup('skupinka');
        expect(stgs.getGroups().count() === count + 1);
        expect(stgs.getGroups().last().getText()).toContain('skupinka');
    });

    it('should edit group', function () {
        stgs.editGroup('skupinecka');
        expect(stgs.getGroups().first().getText()).toContain('skupinecka');
    });

    it('should add member to group', function () {
        stgs.showMembers();
        var count = stgs.getMembers().count();
        stgs.addMember('pepa@gege.com');
        expect(stgs.getMembers().count() === count + 1);
        expect(stgs.getMembers().last().getText()).toContain('pepa@gege.com');
        stgs.hideMembers();
    });

    it('should delete member from group', function () {
        stgs.showMembers();
        var count = stgs.getMembers().count();
        stgs.deleteMember();
        expect(stgs.getMembers().count() === count - 1);
        stgs.hideMembers();
    });

    it('should delete group', function () {
        var count = stgs.getGroups().count();
        stgs.deleteGroup();
        expect(stgs.getGroups().count() === count - 1);
    });
});
