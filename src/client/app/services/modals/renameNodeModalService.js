(function () {

	"use strict";

	angular.module('app.module')
		.factory('renameNodeModal', RenameNodeModalService);

	/* @ngInject */
	function RenameNodeModalService($modal) {
		return {
			open: open
		};

		function open(space, node) {
			var modal = $modal.open({
				templateUrl: 'app/services/modals/renameNodeModal.html',
				controller: ModalController,
				controllerAs: 'vm',
				backdrop: 'static'
			});

			return modal;

			/* @ngInject */
			function ModalController($modalInstance, spaceService) {
				var vm = this;

				vm.name = node.name || node.filename;

				vm.ok = function () {
					if (node.type === 'folder') {
						spaceService.renameFolder(space, node.id, vm.name).then(close);
					} else {
						spaceService.renameFile(space, node.uuid, vm.name).then(close);
					}
				};

				vm.cancel = function() {
					$modalInstance.dismiss();
				};

				function close() {
					if (node.type === 'folder') {
						node.name = vm.name;
					} else {
						node.filename = vm.name;
					}
					$modalInstance.close();
				}
			}
		}
	}

})();
