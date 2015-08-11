(function () {
	'use strict';

	angular.module('utils.exception', ['utils.logger'])
		.config(config);

	config.$inject = ['$provide'];
	function config($provide) {
		$provide.decorator('$exceptionHandler', extendExceptionHandler);
	}

	extendExceptionHandler.$inject = ['$delegate', '$injector'];
	/* @ngInject */
	function extendExceptionHandler($delegate, $injector) {
		return function (exception, cause) {
			if (exception === 'unauthenticated') {
				$injector.get('$state').go('login');
				return;
			}
			var errorData = {
				exception: exception,
				cause: cause
			};
			$delegate(exception, cause);
			$injector.get('logger').error(exception.message, errorData); // $injector - circular dependency
		};
	}

})();
