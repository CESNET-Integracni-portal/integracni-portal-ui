(function () {
    var logmod = angular.module('login.module', ['utils.module', 'services.module', 'Mac']);

    // TODO
    logmod.factory('loginService', function ($rootScope, modal, oauthService, userService) {
        return {
            assignCurrentUser: function () {
                // GET CURRENT FROM SERVER
                var curr = userService.getCurrent();
                $rootScope.currentUser = curr;
                $rootScope.loggedIn = true;
            },
            login: function () {
                modal.show('login');
            },
            logout: function () {
                oauthService.logout();
                $rootScope.currentUser = null;
                $rootScope.loggedIn = false;
                this.login();
            }
        };
    });

    // TODO
    logmod.controller('loginCtrl', function ($scope, oauthService, loginService, userService) {

        var handleError = function (data, status, headers, config) {
            if (status === 401) {
//                $scope.errorMessage = "Špatné přihlašovací údaje";
                alert("Špatné přihlašovací údaje");
            } else {
//                $scope.errorMessage = "Někde se stala chyba";
                alert("Někde se stala chyba");
            }
        };

        $scope.submitLogin = function (user, psw) {
            var deffered = oauthService.loginWithPass(user, psw);
            deffered.success(function () {
                // var user = userService.getCurrent();
                loginService.assignCurrentUser();
                oauthService.refresh();
            });
            deffered.error(function (data, status, headers, config) {
                handleError(data, status, headers, config);
                oauthService.refresh();
                loginService.login();
            });
        };
    });
})();
