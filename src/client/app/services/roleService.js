(function () {

	"use strict";

	angular.module('services.module')
		.factory('roleService', RoleService);

	/* @ngInject */
	function RoleService(httpService) {
		/**
		 User roles parameters:
		 int id - unique
		 string name
		 string description
		 array permissions
		 */
		return {
			/**
			 * Retrieve all User Roles
			 *
			 * @returns {promise}
			 */
			getAll: function () {
				// Ready for API v.2
				return httpService.createRequest("GET", 'role', {});
			},
			/**
			 * Create a User Role
			 *
			 * @param {array} role - role parameters
			 * @returns {promise}
			 */
			createRole: function (role) {
				// Ready for API v.2
				return httpService.createRequest("POST", 'role', {role: role});
			},
			/**
			 * Retrieve a User Role
			 *
			 * @param {int} roleId - role identifier
			 * @returns {promise}
			 */
			getRole: function (roleId) {
				// Ready for API v.2
				return httpService.createRequest("GET", 'role/' + roleId, {});
			},
			/**
			 * Update a User Role
			 *
			 * @param {int} roleId - role identifier
			 * @param {array} role - role parameters
			 * @returns {promise}
			 */
			updateRole: function (roleId, role) {
				// Ready for API v.2
				return httpService.createRequest("PUT", 'role/' + roleId, {role: role});
			}
		};
	}

})();

