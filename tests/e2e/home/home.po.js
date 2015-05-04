var IpHomePage = function () {

    this.get = function () {
        browser.get('http://147.32.80.219:8080/integracni-portal-ui/');
    };

    this.login = function (usr, pw) {
        element(by.id('username')).sendKeys(usr);
        element(by.id('password')).sendKeys(pw);
        element(by.id('logbtn')).click();
    };

    this.logout = function () {
        element(by.id('lgout')).click();
    };

    this.createFolder = function (name) {
        element(by.css('[mac-modal="folder"]')).click();
        element(by.model('folder.name')).sendKeys(name);
        element(by.css('[value="Uložit složku"]')).click();
    };

    this.deleteFolder = function (name) {
        element(by.css('[ng-click="deleteFolder(folder.id)"]')).click();
    };

    this.editFolder = function (newname) {
        element(by.css('[ng-click="editFolder(folder.id)"]')).click();
        var namemodel = element(by.model("folder.name"));
        var oldname = namemodel.getAttribute('value');
        namemodel.clear();
        namemodel.sendKeys(newname);
        element(by.css('[value="Uložit složku"]')).click();
    };

    this.getFolders = function () {
        return element.all(by.repeater('folder in home.folders'));
    };

    this.clearSearch = function () {
        element(by.model('search')).clear();
    };

    this.setSearch = function (search) {
        element(by.model('search')).sendKeys(search);
    };

    this.favoriteFolder = function () {
        element(by.css('[ng-click="favoriteFolder(folder)"]')).click();
    };

    this.getToShared = function () {
        element(by.css('[ui-sref="shared"]')).click();
    };
    
    this.getShared = function () {
        return element.all(by.repeater('folder in shared.folders'))
    };

    this.getFavorites = function () {
        return element.all(by.repeater('fast in user.fasts'));
    };
};
module.exports = IpHomePage;
