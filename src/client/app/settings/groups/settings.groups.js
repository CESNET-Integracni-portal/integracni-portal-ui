(function () {
	angular.module('settings.module')
		.controller('groupsController', GroupsController);

	/* @ngInject */
	function GroupsController(groupService, $modal) {
		var vm = this;

		vm.createGroup = createGroup;
		vm.deleteGroups = deleteGroups;
		vm.editGroup = editGroup;
		vm.renameGroup = renameGroup;

		vm.selectedGroups = [];

		loadGroups();

		function createGroup() {
			var modal = $modal.open({
				templateUrl: 'app/settings/groups/createGroupModal.html',
				controller: CreateGroupModalController,
				controllerAs: 'vm',
				backdrop: 'static'
			});
			modal.result.then(loadGroups);
		}

		function renameGroup() {
			var modal = $modal.open({
				templateUrl: 'app/settings/groups/renameGroupModal.html',
				controller: RenameGroupModalController,
				controllerAs: 'vm',
				backdrop: 'static',
				resolve: {
					group: function () {
						return vm.selectedGroups[0];
					}
				}
			});
			modal.result.then(loadGroups);
		}

		function editGroup(group) {
			var modal = $modal.open({
				templateUrl: 'app/settings/groups/editMembersModal.html',
				controller: EditMembersModalController,
				controllerAs: 'vm',
				backdrop: 'static',
				resolve: {
					group: function () {
						return group || vm.selectedGroups[0];
					}
				}
			});
			modal.result.then(loadGroups);
		}

		function deleteGroups() {
			angular.forEach(vm.selectedGroups, function (group) {
				groupService.deleteGroup(group.id).then(function () {
					var idx = vm.groups.indexOf(group);
					if (idx !== -1) {
						vm.groups.splice(idx, 1);
					}
				});
			});
		}

		function loadGroups() {
			vm.selectedGroups = [];
			groupService.getAll().then(function (groups) {
				vm.groups = groups.data;
			});
		}

	}

	/* @ngInject */
	function CreateGroupModalController(groupService, $modalInstance) {
		var vm = this;

		vm.groupName = '';

		vm.ok = function () {
			if (vm.groupName) {
				groupService.createGroup(vm.groupName).success(onSuccess);
			}
		};

		vm.cancel = function () {
			$modalInstance.dismiss();
		};

		function onSuccess(group) {
			$modalInstance.close(group);
		}
	}

	/* @ngInject */
	function RenameGroupModalController(groupService, $modalInstance, group) {
		var vm = this;

		vm.groupName = group.name;

		vm.ok = function () {
			if (vm.groupName) {
				groupService.renameGroup(group.id, vm.groupName).then($modalInstance.close);
			}
		};

		vm.cancel = function () {
			$modalInstance.dismiss();
		};
	}

	/* @ngInject */
	function EditMembersModalController(groupService, $modalInstance, userService, group) {
		var vm = this;

		vm.group = group;
		vm.selectedUser = null;
		vm.users = [];

		userService.getAll().then(function (users) {
			vm.users = users.data;
		});

		vm.filterUsers = function (value) {
			return _(vm.users)
				.filter(function (user) {
					return _.includes(user.username, value) && user.id !== userService.getLoggedUserId() && !_.includes(_.map(vm.group.members, 'id'), user.id);
				})
				.take(10)
				.value();
		};

		vm.addMember = function () {
			if (vm.selectedUser) {
				groupService.addMember(group.id, vm.selectedUser.id).then(function () {
					vm.group.members.push(vm.selectedUser);
					vm.selectedUser = null;
				});
			}
		};

		vm.removeMember = function (user) {
			groupService.removeMember(group.id, user.id).then(function (data) {
				var idx = vm.group.members.indexOf(user);
				if (idx !== -1) {
					vm.group.members.splice(idx, 1);
				}
			});
		};

		vm.ok = function () {
			$modalInstance.close();
		};
	}
})();
