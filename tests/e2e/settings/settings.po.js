var Settings = function () {

    this.get = function () {
        browser.get('http://147.32.80.219:8080/integracni-portal-ui/');
    };

    this.login = function (usr, pw) {
        element(by.id('username')).sendKeys(usr);
        element(by.id('password')).sendKeys(pw);
        element(by.id('logbtn')).click();
    };

    this.getToSettings = function () {
        element(by.id('settings')).click();
    };

    // labels
    this.getToLabels = function () {
        element(by.css('[ng-click="tab.setTab(1)"]')).click();
    };

    this.getLabels = function () {
        return element.all(by.repeater('label in user.labels'));
    };

    this.createLabel = function (name, color) {
        element(by.css('[mac-modal="label"]')).click();
        element(by.model('label.name')).sendKeys(name);
        element.all(by.model('label.color')).get(color).click();
        element(by.css('[type="submit"]')).click();
    };

    this.editLabel = function (name, color) {
        element(by.css('[ng-click="editLabel($index, label)"]')).click();
        element(by.model('label.name')).clear();
        element(by.model('label.name')).sendKeys(name);
        element.all(by.model('label.color')).get(color).click();
        element(by.css('[type="submit"]')).click();
    };

    this.deleteLabel = function () {
        element(by.css('[ng-click="deleteLabel($index)"]')).click();
    };

    // groups
    this.getToGroups = function () {
        element(by.css('[ng-click="tab.setTab(2)"]')).click();
    };

    this.getGroups = function () {
        return element.all(by.repeater('group in user.groups'));
    };

    this.createGroup = function (name) {
        element(by.css('[mac-modal="group"]')).click();
        element(by.model('group.name')).sendKeys(name);
        element(by.css('[value="Vytvořit skupinu"]')).click();
    };

    this.editGroup = function (name) {
        element(by.css('[ng-click="editGroup($index, group)"]')).click();
        element(by.model('group.name')).clear();
        element(by.model('group.name')).sendKeys(name);
        element(by.css('[value="Vytvořit skupinu"]')).click();
    };

    this.deleteGroup = function () {
        element(by.css('[ng-click="deleteGroup($index)"]')).click();
    };

    this.showMembers = function () {
        element(by.css('[mac-modal="members"]')).click();
    };

    this.hideMembers = function () {
        var parent = element(by.id('members'));
        parent.element(by.css('[mac-modal-close=""]')).click();
    };

    this.getMembers = function () {
        return element.all(by.repeater('user in group.users'));
    };

    this.addMember = function (member) {
        element(by.model('group.member')).sendKeys(member);
        element(by.css('[value="Přidat člena"]')).click();
    };

    this.deleteMember = function () {
        element(by.css('[ng-click="deleteMember(user, group)"]')).click();
    };

    this.getToPassword = function () {
        element(by.css('[ng-click="tab.setTab(5)"]')).click();
    };
};
module.exports = Settings;
