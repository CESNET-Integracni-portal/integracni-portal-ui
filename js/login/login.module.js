(function () {
    var logmod = angular.module('login.module', ['utils.module', 'services.module']);

    logmod.controller('loginCtrl', function ($scope, $rootScope, oauthService, userService) {

        var handleError = function (data, status, headers, config) {
            if (status === 401) {
                alert("Špatné přihlašovací údaje");
            } else {
                alert("Někde se stala chyba");
            }
        };

        var assignCurrentUser = function () {
            // Ready for API v0.2
            //userService.getCurrent().success(function (data) {
            var curr = userService.getCurrent();
            localStorage.setItem("user", JSON.stringify(curr));
            localStorage.setItem("loggedIn", "true");
            $rootScope.currentUser = curr;
            $rootScope.loggedIn = true;
            //});
        };

        $scope.submitLogin = function (user, psw) {
            oauthService.loginWithPass(user, psw).success(function () {
                assignCurrentUser();
            }).error(function (data, status, headers, config) {
                handleError(data, status, headers, config);
                oauthService.login();
            });
        };
    });
})();
