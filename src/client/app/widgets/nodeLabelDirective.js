(function (angular) {

	"use strict";

	angular.module('app.widgets')
		.directive('nodeLabel', NodeLabelDirective);

	/* @ngInject */
	function NodeLabelDirective() {
		return {
			template: '<span class="label label-{{data.color}}">{{data.name}}</span>',
			scope: {
				data: '='
			}
		};
	}

})(angular);