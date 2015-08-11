(function () {

	"use strict";

	angular.module('app.module')
		.factory('uploadFilesModal', UploadFilesModalService);

	/* @ngInject */
	function UploadFilesModalService($modal) {
		return {
			open: open
		};

		function open(space, parentFolderId) {
			var modal = $modal.open({
				templateUrl: 'app/services/modals/uploadFilesModal.html',
				controller: ModalController,
				controllerAs: 'vm',
				backdrop: 'static',
				resolve: {
					space: function () {
						return space;
					},
					parentFolder: function () {
						return parentFolderId;
					}
				}
			});

			return modal;

			/* @ngInject */
			function ModalController($modalInstance, fileuploadService) {
				var vm = this;

				vm.folderName = '';

				vm.uploadFiles = function(files) {
					fileuploadService.uploadFiles(files, space, parentFolderId);
				};

				vm.cancel = function() {
					$modalInstance.dismiss();
				};
			}
		}
	}

})();
