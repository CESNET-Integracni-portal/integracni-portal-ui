(function () {
	'use strict';

	angular.module('utils.fileSaver', [])
		.factory('fileSaver', fileSaver);

	fileSaver.$inject = [];

	/* @ngInject */
	function fileSaver() {
		return function (blob, filename) {
			saveAs(blob, filename);
		};
	}

})();
