(function () {
    var logmod = angular.module('login.module', ['utils.module', 'services.module']);


    // TODO
   logmod.factory('loginService', function ($rootScope) {
        return {
            assignCurrentUser: function (user) {
                $rootScope.currentUser = user;
                return user;
            },
            showLogin: function () {
                alert("howno");
            }
        };
    });
    
    // TODO
    logmod.controller('loginCtrl', function ($scope, oauthService) {

        this.cancel = $scope.$dismiss;

        var handleError = function (data, status, headers, config) {
            if (status === 401) {
                $scope.errorMessage = "Špatné přihlašovací údaje";
            } else {
                $scope.errorMessage = "Někde se stala chyba";
            }
        };

        this.submit = function (user, psw) {

            var deffered = oauthService.loginWithPass(user, psw);
            deffered.error(function (data, status, headers, config) {
                handleError(data, status, headers, config);
            });
        };
    });
})();
