(function () {

	"use strict";

	angular.module('services.module')
		.factory('userService', UserService);

	/* @ngInject */
	function UserService(utils, httpService) {
		/**
		 Users parameters:
		 int id - unique
		 string username
		 string email
		 array permissions
		 array roles
		 int unitId - id of unit group in which belongs
		 int quota
		 string onuser - optional
		 */
		return {
			setLoggedUserId: function (userId) {
				localStorage.setItem("userId", userId);
			},

			getLoggedUserId: function () {
				return parseInt(localStorage.getItem("userId")) || null;
			},

			/**
			 * Retrieve all Users
			 *
			 * @returns {promise}
			 */
			getAll: function () {
				return httpService.createRequest("GET", 'user', {});
			},
			/**
			 * Create a User
			 *
			 * @param {array} user - user parameters
			 * @returns {promise}
			 */
			createUser: function (user) {
				return httpService.createRequest("POST", 'user', {user: user});
			},
			/**
			 * Retrieve a User
			 *
			 * @param {int} userId - user identifier
			 * @returns {promise}
			 */
			getUser: function (userId) {
				return httpService.createRequest("GET", 'user/' + userId, {});
			},
			/**
			 * Change User's password
			 *
			 * @param {int} userId - user identifier
			 * @param {string} oldpassword - old user's password
			 * @param {string} password - new user's password
			 * @returns {unresolved}
			 */
			changePassword: function (userId, oldpassword, password) {
				return httpService.createRequest("POST", 'user/' + userId + '/passwordChange', {
					oldpassword: oldpassword,
					password: password
				}, "application/json");
			},
			/**
			 * Assign an Organization Unit to a User
			 *
			 * @param {int} userId - user identifier
			 * @param {int} unitId - unit identifier
			 * @returns {promise}
			 */
			assignUnit: function (userId, unitId) {
				return httpService.createRequest("POST", 'user/' + userId + '/unitAssignment', {unitId: unitId});
			},
			/**
			 * Assign User Roles to a User
			 *
			 * @param {int} userId - user identifier
			 * @param {array} roles - array of roles names
			 * @returns {promise}
			 */
			assignRoles: function (userId, roles) {
				return httpService.createRequest("POST", 'user/' + userId + '/rolesAssignment', {roles: roles});
			},
			/**
			 * Grant permission to a User
			 *
			 * @param {int} userId - user identifier
			 * @param {array} permissions - array of permissions names
			 * @returns {promise}
			 */
			grantPermissions: function (userId, permissions) {
				return httpService.createRequest("POST", 'user/' + userId + '/permissionsGrant', {permissions: permissions});
			},
			/**
			 * Retrieve current logged-in User
			 *
			 * @returns {promise}
			 */
			getCurrent: function () {
				return httpService.createRequest("GET", 'user/current', {});
			},
			// Other methods that should be defined by API v0.2
			deleteUser: function (userId) {
			},
			updateUser: function (userId, user) {
				return user;
			},
			// Helper methods
			getExternistsForUnit: function (unitId) {
				var result = utils.getAllWhere(users, "unitId", unitId);
				result = utils.getAllWhereNotNull(result, "user");
				return result;
			},
			getWhere: function (column, value, array) {
				if (array === null)
					array = users;
				return utils.getAllWhere(array, column, value);
			}
		};
	}

	var users = [
		//super user
		{
			id: 1,
			username: "SuperUser",
			name: "Pepa Karbanátek",
			email: "super@fel.cvut.cz",
			unitId: 0,
			stats: {
				spaceleft: 0
			},
			permissions: {
				units: true,
				main_admin: false,
				externists: false,
				password: false
			},
			quota: 0
		},
		// manager of units
		{
			id: 2,
			username: "admin",
			name: "Jiří Blažek",
			email: "blazej18@fel.cvut.cz",
			unitId: 1,
			stats: {
				spaceleft: 3.758
			},
			permissions: {
				units: true,
				main_admin: true,
				externists: true,
				password: true
			},
			quota: 4
		},
		// externist
		{
			id: 3,
			username: "Externist",
			name: "František Mokrý",
			email: "externista@fel.cvut.cz",
			unitId: 1,
			onuser: "haslakat@fel.cvut.cz",
			stats: {
				spaceleft: 6
			},
			permissions: {
				units: false,
				main_admin: false,
				externists: false,
				password: true
			},
			user: {
				id: 1,
				email: "jan.novak@fel.cvut.cz"
			},
			quota: 6,
			orgunit: "ATG"
		},
		// student
		{
			id: 4,
			username: "Student",
			name: "Josef Plíhal",
			email: "jan.novak@fel.cvut.cz",
			unitId: 2,
			stats: {
				spaceleft: 4.8
			},
			permissions: {
				units: false,
				main_admin: false,
				externists: false,
				password: false
			},
			quota: 8
		}
	];

})();

