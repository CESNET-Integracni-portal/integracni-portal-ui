(function (angular) {

	"use strict";

	angular.module('app.widgets')
		.directive('uploadView', UploadViewDirective);

	/* @ngInject */
	function UploadViewDirective(fileuploadService) {
		var directive = {
			templateUrl: 'app/widgets/uploadView.html',
			controller: UploadViewController,
			controllerAs: 'vm',
			scope: {}
		};

		function UploadViewController() {
			var vm = this;
			vm.files = fileuploadService.getFiles();

			fileuploadService.setUploadStartedCallback(function() {
				vm.opened = true;
			});
		}

		return directive;
	}

})(angular);