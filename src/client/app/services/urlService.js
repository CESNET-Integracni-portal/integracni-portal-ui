(function () {

	"use strict";

	angular.module('services.module')
		.factory('urlService', UrlService);

	/* @ngInject */
	function UrlService($location) {
		return {
			basePath: function () {
				var path = $location.path();
				var absUrl = $location.absUrl();
				return absUrl.substring(0, (absUrl.length - path.length));
			},
			redirectToHome: function () {
			},
			redirectToShared: function () {
				$location.path("shared");
			},
			redirect: function () {
				$location.path(this.basePath());
			}
		};
	}

})();

