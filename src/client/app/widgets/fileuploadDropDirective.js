(function (window, document, angular) {
	"use strict";

	/**
	 * A fileupload component
	 */
	angular.module('app.widgets')
		.directive('fileupload', FileUploadDirective);

	FileUploadDirective.$inject = ['$rootScope', 'fileuploadService'];

	/* @ngInject */
	function FileUploadDirective($rootScope, fileuploadService) {

		var directive = {
			restrict: 'A',
			templateUrl: 'app/widgets/fileupload.html',
			controller: FileUploadControllerInner,
			controllerAs: 'vm',
			bindToController: true,
			transclude: true,
			scope: {
				maxFiles: "=?fuMaxFiles",
				maxFilesText: "=?fuMaxFilesText",
				maxFileSize: "=?fuMaxFileSize",
				maxFileSizeError: "=?fuMaxFileSizeError",
				accept: "=fuAccept"
			}
		};

		FileUploadControllerInner.$inject = ['$scope', '$element', '$attrs'];
		/* @ngInject */
		function FileUploadControllerInner($scope, $element, $attrs) {
			var vm = this;

			$scope.change = change;
			$scope.abort = abort;
			$scope.filesForUpload = [];

			if (!vm.maxFiles || vm.maxFiles < 0) {
				vm.maxFiles = 100;
			}

			function change(files) {
				if (files && files.length) {
					if (validate(files) === false) {
						return;
					}

					fileuploadService.uploadFiles(files);
				}
			}

			function abort($event, fileIdx) {
				var abortedFile = $scope.filesForUpload[fileIdx].file;

				$scope.filesForUpload[fileIdx].upload.abort();
				$scope.filesForUpload.splice(fileIdx, 1);

			}

			function validate(files) {
				/**
				 * Clears model
				 * @returns boolean
				 */
				var clearFiles = function () {
					$scope.files = [];
					$rootScope.$apply($scope.files);
					setTimeout(function () {
						$scope.files = [];
						$rootScope.$apply($scope.files);
					}, 0);
				};

				if (vm.maxFiles > 0 && $scope.filesForUpload.length + files.length > vm.maxFiles) {
					alert(vm.maxFilesText);
					clearFiles();
					return false;
				}

				if (vm.maxFileSize && vm.maxFileSize > 0) {
					for (var i = 0; i < files.length; ++i) {
						if (files[i].size > vm.maxFileSize) {
							alert(vm.maxFileSizeError);
							clearFiles();
							return false;
						}
					}
				}

				return true;
			}
		}

		return directive;
	}


})(window, document, angular);

