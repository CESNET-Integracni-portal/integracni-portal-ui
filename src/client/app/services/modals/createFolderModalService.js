(function () {

	"use strict";

	angular.module('app.module')
		.factory('createFolderModal', CreateFolderModalService);

	/* @ngInject */
	function CreateFolderModalService($modal) {
		return {
			open: open
		};

		function open(space, parentFolderId) {
			return $modal.open({
				templateUrl: 'app/services/modals/createFolderModal.html',
				controller: ModalController,
				controllerAs: 'vm',
				backdrop: 'static',
				resolve: {
					space: function () {
						return space;
					},
					parentFolderId: function () {
						return parentFolderId;
					}
				}
			});
		}
	}

	/* @ngInject */
	function ModalController($modalInstance, spaceService, space, parentFolderId) {

		var vm = this;

		vm.folderName = '';

		vm.ok = function() {
			if (!parentFolderId) {
				spaceService.createFolderInRoot(space, vm.folderName)
					.success(onSuccess);
			} else {
				spaceService.createFolder(space, parentFolderId, vm.folderName)
					.success(onSuccess);
			}
		};

		vm.cancel = function() {
			$modalInstance.dismiss();
		};

		function onSuccess(folder) {
			$modalInstance.close(folder);
		}
	}

})();
