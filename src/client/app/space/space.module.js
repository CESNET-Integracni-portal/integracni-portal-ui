(function () {
	angular.module('space.module', ['services.module', 'utils.module'])
		.controller('spaceController', SpaceController)
		.controller('spaceMenuController', SpaceMenuController);

	/* @ngInject */
	function SpaceController($scope, $state, folder, labels, spaceService, fileuploadService, createFolderModal, uploadFilesModal, renameNodeModal, fileSaver) {
		var vm = this;

		vm.space = $state.params.space;
		vm.folderId = $state.params.folderId;
		vm.folder = folder;
		vm.userLabels = labels;
		vm.isLabelView = !!$state.params.label;

		vm.uploadFiles = uploadFiles;
		vm.empty = isEmpty;
		vm.openCreateFolderModal = openCreateFolderModal;
		vm.openUploadFilesModal = openUploadFilesModal;
		vm.openRenameModal = openRenameModal;
		vm.delete = deleteNodes;
		vm.download = download;

		vm.toggleFavorite = toggleFavorite;
		vm.toggleLabel = toggleLabel;
		vm.hasLabel = hasLabel;

		vm.selectedNodes = [];

		$scope.$on('file.uploaded', function (evt, params) {
			if (params.space === vm.space && params.parentId === vm.folderId) {
				folder.files.push(params.file);
			}
		});

		function uploadFiles(files) {
			if (files && files.length) {
				fileuploadService.uploadFiles(files, vm.space, vm.folderId);
			}
		}

		function isEmpty() {
			if (vm.folder) {
				return (!vm.folder.folders || vm.folder.folders.length === 0) && (!vm.folder.files || vm.folder.files.length === 0);
			}
			return true;
		}

		function openCreateFolderModal() {
			var modal = createFolderModal.open(vm.space, vm.folderId);
			modal.result.then(function (folder) {
				if (folder) {
					vm.folder.folders.push(folder);
				}
			});
		}

		function openUploadFilesModal() {
			uploadFilesModal.open(vm.space, vm.folderId);
		}

		function openRenameModal() {
			var nodeToRename = vm.selectedNodes[0];
			var modal = renameNodeModal.open(vm.space, nodeToRename);
		}

		function deleteNodes() {
			angular.forEach(vm.selectedNodes, function (node) {
				if (node.type === 'folder') {
					spaceService.deleteFolder(vm.space, node.id).success(function () {
						_.remove(vm.folder.folders, node);
					});
				} else {
					spaceService.deleteFile(vm.space, node.uuid).success(function () {
						_.remove(vm.folder.files, node);
					});
				}
			});
			vm.selectedNodes = [];
		}

		function download() {
			angular.forEach(vm.selectedNodes, function (node) {
				if (node.type !== 'folder') {
					spaceService.getFileContent(vm.space, node.uuid)
						.success(function (response) {
							fileSaver(response, vm.selectedNodes[0].filename);
						});
				}
			});
		}

		function toggleFavorite() {
			// TODO
		}

		function toggleLabel(label) {
			var forceSet = vm.selectedNodes.length > 1;

			_.forEach(vm.selectedNodes, function (node) {
				node.labels = node.labels || [];

				var containsLabel = _(node.labels)
					.map('id')
					.contains(label.id);

				if (forceSet || !containsLabel) {
					spaceService.addLabel(vm.space, node, label.id).then(function () {
						if (!containsLabel) {
							node.labels.push(label);
						}
					});
				} else {
					spaceService.removeLabel(vm.space, node, label.id).then(function () {
						var idx = _.map(node.labels, 'id').indexOf(label.id);
						if (idx !== -1) {
							node.labels.splice(idx, 1);
						}
					});
				}
			});
		}

		function hasLabel(label) {
			if (vm.selectedNodes.length !== 1) {
				return false;
			}
			return _(vm.selectedNodes[0].labels || [])
				.map('id')
				.includes(label.id);
		}

	}

	/* @ngInject */
	function SpaceMenuController(labels, favorites) {
		var vm = this;

		vm.labels = labels;
		vm.favorites = favorites;
	}
})();