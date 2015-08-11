(function () {

	"use strict";

	angular.module('app.widgets')
		.filter('bytes', bytesFilter);

	bytesFilter.$inject = ['$filter'];
	/* @ngInject */
	function bytesFilter($filter) {
		return function (bytes, precision) {
			if (bytes === 0) {
				return '0 bytes';
			}
			if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
				return '-';
			}
			if (typeof precision === 'undefined') {
				precision = 1;
			}
			var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];
			var number = Math.floor(Math.log(bytes) / Math.log(1024));
			var val = (bytes / Math.pow(1024, Math.floor(number)));
			var formatted = $filter('number')(val, precision).replace(/(\.|,)0$/, '');
			return formatted + ' ' + units[number];
		};
	}

})();