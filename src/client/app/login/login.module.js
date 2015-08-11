(function () {
    var logmod = angular.module('login.module', ['utils.module', 'services.module']);

    logmod.controller('loginCtrl', /* @ngInject */ function ($scope, $rootScope, oauthService, userService, logger, $state) {

        var handleError = function (status) {
            if (status === 401) {
				logger.error("Špatné přihlašovací údaje");
            } else {
				logger.error("Někde se stala chyba");
            }
        };

		$scope.submitLogin = function (user, psw) {
			oauthService.loginWithPass(user, psw).then(function () {
				$state.go('index');
			}, function (response) {
				handleError(response.status);
				oauthService.login();
			});
		};
	});
})();
