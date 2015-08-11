(function () {

	"use strict";

	angular.module('services.module')
		.factory('groupService', GroupService);

	/* @ngInject */
	function GroupService(utils, httpService) {
		/**
		 Groups parameters:
		 int id - unique
		 string name
		 array members
		 */
		var groups = [];
		return {
			getAll: function () {
				return httpService.createRequest("GET", 'group', {});
			},
			createGroup: function (groupName) {
				return httpService.createRequest("POST", 'group', {name: groupName});
			},
			deleteGroup: function (groupId) {
				return httpService.createRequest("DELETE", 'group/' + groupId, {});
			},
			addMember: function (groupId, userId) {
				return httpService.createRequest("POST", 'group/' + groupId + '/addMember', {memberId: userId});
			},
			removeMember: function (groupId, userId) {
				return httpService.createRequest("POST", 'group/' + groupId + '/removeMember', {memberId: userId});
			},
			renameGroup: function (groupId, groupName) {
				return httpService.createRequest("POST", 'group/' + groupId + '/nameChange', {name: groupName});
			}
		};
	}

})();

