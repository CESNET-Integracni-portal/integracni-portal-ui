(function () {

	"use strict";

	angular.module('services.module')
		.factory('homeService', HomeService);

	/* @ngInject */
	function HomeService(httpService) {
		/**
		 Folder parameters:
		 int id - unique
		 string name
		 array breadcrumbs
		 array folders
		 array files
		 int createdOn
		 int changedOn
		 */
		return {
			// root
			getAll: function () {
				return httpService.createRequest("GET", 'archive', {});
				//return httpService.createRequest("GET", 'home', {});
			},
			createFolderInRoot: function (name) {
				// create on server side
				return httpService.createRequest("POST", 'archive', {name: name});
				//return httpService.createRequest("POST", 'home', {name: name});
			},
			// subfolder of root
			getById: function (archiveId) {
				return httpService.createRequest("GET", 'archive/folder/' + archiveId, {});
				//return httpService.createRequest("GET", 'home/folder/' + archiveId, {});
			},
			createFolder: function (folderId, name) {
				// create on server side
				return httpService.createRequest("POST", 'archive/folder/' + folderId, {name: name});
				//return httpService.createRequest("POST", 'home/folder/' + folderId, {name: name});
			},
			renameFolder: function (folderId, name) {
				// create on server side
				return httpService.createRequest("PUT", 'archive/folder/' + folderId, {name: name});
				//return httpService.createRequest("PUT", 'home/folder/' + folderId, {name: name});
			},
			downloadFolder: function (folderId) {
				// download request
			},
			deleteFolder: function (folderId) {
				// create on server side
				return httpService.createRequest("DELETE", 'archive/folder/' + folderId, {});
				// return httpService.createRequest("DELETE", 'home/folder/' + folderId, {});
			},
			addFileToRoot: function (file) {
				// create on server side
				return httpService.createRequest(
					"POST", 'archive', {file: file}, "multipart/form-data");
//                return httpService.createRequest(
//                        "POST",
//                        baseUrl + 'home/folder/' + folderId + "/files",
//                        $.param({fileName: file, name: name}), "multipart/form-data");
			},
			addFile: function (folderId, file) {
				// create on server side
				return httpService.createRequest(

					"POST", 'archive/folder/' + folderId, {file: file}, "multipart/form-data");
//                return httpService.createRequest(
//                        "POST",
//                        baseUrl + 'home/folder/' + folderId + "/files",
//                        $.param({fileName: file, name: name}), "multipart/form-data");
			},
			getFavorites: function () {
				// ??? TODO
				return [];
			},
			favoriteFolder: function () {
				// TODO
			},
			unfavoriteFolder: function () {
				// TODO
			}
		};
	}

})();

