(function () {

	angular.module('settings.module')
		.controller('labelsController', LabelController);

	/* @ngInject */
	function LabelController(labelService, $modal) {
		var vm = this;

		vm.createLabel = createLabel;
		vm.editLabel = editLabel;
		vm.deleteLabels = deleteLabels;

		vm.labels = [];
		vm.selectedLabels = [];

		loadLabels();

		function createLabel() {
			var modal = $modal.open({
				templateUrl: 'app/settings/labels/labelModal.html',
				controller: LabelModalController,
				controllerAs: 'vm',
				backdrop: 'static',
				resolve: {
					originalLabel: function () {
						return null;
					}
				}
			});
			modal.result.then(loadLabels);
		}

		function editLabel(label) {
			var modal = $modal.open({
				templateUrl: 'app/settings/labels/labelModal.html',
				controller: LabelModalController,
				controllerAs: 'vm',
				backdrop: 'static',
				resolve: {
					originalLabel: function () {
						return label || vm.selectedLabels[0];
					}
				}
			});
			modal.result.then(loadLabels);
		}

		function deleteLabels() {
			angular.forEach(vm.selectedLabels, function (label) {
				labelService.deleteLabel(label.id).then(function () {
					var idx = vm.labels.indexOf(label);
					if (idx !== -1) {
						vm.labels.splice(idx, 1);
					}
				});
			});
		}

		function loadLabels() {
			vm.selectedLabels = [];
			labelService.getAll().then(function (labels) {
				vm.labels = labels.data;
			});
		}
	}

	/* @ngInject */
	function LabelModalController(labelService, $modalInstance, originalLabel) {
		var vm = this;

		vm.editing = !!originalLabel;
		vm.groupName = '';
		vm.label = angular.copy(originalLabel || {
			name: '',
			color: 'default'
		});
		vm.colors = [
			'default',
			'primary',
			'success',
			'info',
			'warning',
			'danger'
		];

		vm.ok = function () {
			if (!originalLabel) {
				labelService.createLabel(vm.label).then(onSuccess);
			} else {
				labelService.updateLabel(originalLabel.id, vm.label).then(onSuccess);
			}
		};

		vm.cancel = function () {
			$modalInstance.dismiss();
		};

		function onSuccess(group) {
			$modalInstance.close(group);
		}
	}
})();
