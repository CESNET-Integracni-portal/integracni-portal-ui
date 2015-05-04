// home page object
var IpHomePage = require('./home.po.js');

describe('integracni-portal - homepage', function () {

    var home = new IpHomePage();

    it('should log in', function () {
        home.get();
        var usr = "admin";
        home.login(usr, usr);
        expect(browser.getTitle()).toContain(usr);
    });

    it('should load files from space', function () {
        expect(home.getFolders().count() > 0);
    });

    it('should filter folders', function () {
        home.createFolder('testerrr');
        home.createFolder('testerrrrrrr343');
        home.setSearch('tester');
        expect(home.getFolders().count() >= 2);
        home.clearSearch();
    });

    // create, delete, edit
    it('should create folder in home root', function () {
        var folders_length = home.getFolders().count();
        home.createFolder('test_folder');
        var folders = home.getFolders();
        expect(folders_length === folders.count() - 1);
    });

    it('should delete folder', function ( ) {
        var folders_length = home.getFolders().count();
        home.deleteFolder();
        var folders = home.getFolders();
        expect(folders_length === folders.count() + 1);
    });

    it('should edit folder', function () {
        home.editFolder("aaaaa");
        expect(home.getFolders().first().getText()).toContain("aaaaa");
    });

    // pin, unpin
    it('should pin folder to favorites', function () {
        var count = home.getFavorites();
        home.favoriteFolder();
        expect(home.getFavorites().count() > count);
    });

    it('should unpin folder from favorites', function () {
        var count = home.getFavorites();
        home.favoriteFolder();
        expect(home.getFavorites().count() === count - 1);
    });
    
    // get shared
    it('should open shared folders and files', function () {
       home.getToShared();
       expect(home.getShared().count() > 0);
    });

    // logout
    it('should logout', function () {
        home.logout();
        expect(browser.getTitle()).toEqual('- Integrační portál');
    });
});
