var Admin = function () {

    this.get = function () {
        browser.get('http://147.32.80.219:8080/integracni-portal-ui/');
    };

    this.login = function (usr, pw) {
        element(by.id('username')).sendKeys(usr);
        element(by.id('password')).sendKeys(pw);
        element(by.id('logbtn')).click();
    };
};
module.exports = Admin;
