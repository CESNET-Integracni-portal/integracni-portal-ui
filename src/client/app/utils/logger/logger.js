(function () {
	'use strict';

	angular.module('utils.logger')
		.factory('logger', Logger);

	Logger.$inject = ['$log', 'toastr'];
	/* @ngInject */
	function Logger($log, toastr) {
		var log = {
			error: error,
			info: info,
			success: success,
			warning: warning
		};

		var service = {
			showToasts: true,

			error: log.error,
			info: log.info,
			success: log.success,
			warning: log.warning,
			notify: log.notify,

			// straight to console; bypass toastr
			log: $log.log
		};

		return service;

		function error(message, data, title) {
			toastr.error(message, title);
			$log.error('Error: ' + message, data);
		}

		function info(message, data, title) {
			toastr.info(message, title);
			$log.info('Info: ' + message, data);
		}

		function success(message, data, title) {
			toastr.success(message, title);
			$log.info('Success: ' + message, data);
		}

		function warning(message, data, title) {
			toastr.warning(message, title);
			$log.warn('Warning: ' + message, data);
		}

		function notify(type, message, data, title) {
			log[type](message, data, title);
		}
	}
}());
