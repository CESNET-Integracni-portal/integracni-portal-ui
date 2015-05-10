var Admin = function () {

    this.get = function () {
        browser.get('http://147.32.80.219:8080/integracni-portal-ui/');
    };

    this.login = function (usr, pw) {
        element(by.id('username')).sendKeys(usr);
        element(by.id('password')).sendKeys(pw);
        element(by.id('logbtn')).click();
    };

    this.getToAdmin = function () {
        element(by.id('admin')).click();
    };

    // units
    this.getToUnits = function () {
        element(by.css('[ng-click="tab.setTab(3)"]')).click();
    };

    this.getUnits = function () {
        return element.all(by.repeater('unit in user.units'));
    };

    this.createUnit = function (name, quota, admins) {
        element(by.css('[mac-modal="orgunit"]')).click();
        element(by.model('unit.name')).sendKeys(name);
        element(by.model('unit.quota')).sendKeys(quota);
        element(by.model('unit.admins')).sendKeys(admins);
        element(by.css('[value="Uložit"]')).click();
    };

    this.editUnit = function (name, quota, admins) {
        element(by.css('[ng-click="editUnit($index, unit)"]'));
        var vname = element(by.model('unit.name'));
        var vquota = element(by.model('unit.quota'));
        var vadmins = element(by.model('unit.admins'));
        vname.clear();
        vname.sendKeys(name);
        vquota.clear();
        vquota.sendKeys(quota);
        vadmins.clear();
        vadmins.sendKeys(admins);
        element(by.css('[value="Uložit"]')).click();
    };

    this.deleteUnit = function () {
        element(by.css('[ng-click="deleteUnit($index)"]')).click();
    };

    // externists
    this.getToExternists = function () {
        element(by.css('[ng-click="tab.setTab(4)"]')).click();
    };

    this.getExternists = function () {
        return element.all(by.repeater('external in user.externists'));
    };

    this.createExternist = function (name, email, quota, unit, onuser) {
        element(by.css('[mac-modal="externist"]')).click();
        element(by.model('external.name')).sendKeys(name);
        element(by.model('external.email')).sendKeys(email);
        element(by.model('external.quota')).sendKeys(quota);
        element(by.model('external.unit')).sendKeys(unit);
        element(by.model('external.onuser')).sendKeys(onuser);
        element(by.css('[value="Registrovat externistu"]')).click();
    };

    this.editExternist = function (name, email, quota, unit, onuser) {
        element(by.css('[ng-click="editUser($index, external)"]'));
        var vname = element(by.model('external.username'));
        var vemail = element(by.model('external.email'))
        var vquota = element(by.model('external.quota'));
        var vunit = element(by.model('external.unit'));
        var vonuser = element(by.model('external.onuser'));
        vname.clear();
        vname.sendKeys(name);
        vemail.clear();
        vemail.sendKeys(email);
        vquota.clear();
        vquota.sendKeys(quota);
        vunit.clear();
        vunit.sendKeys(unit);
        vonuser.clear();
        vonuser.sendKeys(onuser);
        element(by.css('[value="Registrovat externistu"]')).click();
    };

    this.deleteExternist = function () {
        element(by.css('[ng-click="deleteUser($index)"]')).click();
    };
};
module.exports = Admin;
