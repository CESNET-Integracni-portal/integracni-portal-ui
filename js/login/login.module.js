(function () {
    var logmod = angular.module('login.module', ['utils.module', 'services.module']);

    // TODO
    logmod.controller('loginCtrl', function ($scope, $rootScope, oauthService, userService) {

        var handleError = function (data, status, headers, config) {
            if (status === 401) {
//                $scope.errorMessage = "Špatné přihlašovací údaje";
                alert("Špatné přihlašovací údaje");
            } else {
//                $scope.errorMessage = "Někde se stala chyba";
                alert("Někde se stala chyba");
            }
        };

        var assignCurrentUser = function () {
            // GET CURRENT FROM SERVER
            var curr = userService.getCurrent();
            localStorage.setItem("user", JSON.stringify(curr));
            localStorage.setItem("loggedIn", "true");
            $rootScope.currentUser = curr;
            $rootScope.loggedIn = true;
        };

        $scope.submitLogin = function (user, psw) {
            var deffered = oauthService.loginWithPass(user, psw);
            deffered.success(function () {
                assignCurrentUser();
            });
            deffered.error(function (data, status, headers, config) {
                handleError(data, status, headers, config);
                oauthService.login();
            });
        };
    });
})();
