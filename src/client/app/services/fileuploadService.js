(function (angular) {

	"use strict";

	angular.module('app.module')
		.factory('fileuploadService', FileuploadService);

	/* @ngInject */
	function FileuploadService($rootScope, cookieService, Upload, config) {

		var allFiles = [];
		var uploadQueue = [];
		var uploading = false;
		var uploadStartedCallback = angular.noop;

		return {
			uploadFiles: uploadFiles,
			getFiles: getFiles,
			clearFiles: clearFiles,
			setUploadStartedCallback: setUploadStartedCallback
		};

		function uploadFiles(files, space, folderId) {
			if (!files || files.length === 0) {
				return;
			}

			angular.forEach(files, function (file) {
				if (file.type !== 'directory') {
					var upload = {
						file: file,
						upload: null,
						done: false,
						percents: 0,
						folderId: folderId,
						space: space
					};
					uploadQueue.push(upload);
					allFiles.push(upload);
				}
			});

			if (!uploading) {
				uploadStartedCallback();
				doUpload();
			}
		}

		function getFiles() {
			return allFiles;
		}

		function clearFiles() {
			allFiles.length = 0;
		}

		function setUploadStartedCallback(cb) {
			uploadStartedCallback = cb;
		}

		function doUpload() {
			if (uploadQueue.length !== 0) {
				uploading = true;

				var uploadObj = uploadQueue.shift();
				uploadObj.upload = createUpload(uploadObj);
			} else {
				uploading = false;
			}
		}

		function createUpload(uploadObj) {
			var accessToken = cookieService.getCookie('accessToken');
			var tokenType = cookieService.getCookie('tokenType');

			var rootUrl = config.baseUrl + '/space/' + uploadObj.space;
			if (uploadObj.folderId) {
				rootUrl += '/folder/' + uploadObj.folderId;
			}

			var uploadConfig = {
				url: rootUrl + '/file',
				file: uploadObj.file,
				headers: {
					Authorization: tokenType + " " + accessToken
				}
			};

			return Upload.upload(uploadConfig)
				.progress(updateProgress)
				.success(onFinish)
				.error(onFinish);


			function updateProgress(evt) {
				uploadObj.percents = Math.round(100.0 * evt.loaded / evt.total);
			}

			function onFinish(body, status) {
				uploadObj.done = true;

				if (status === 200 || status === 201) {
					$rootScope.$broadcast('file.uploaded', {
						parentId: uploadObj.folderId,
						space: uploadObj.space,
						file: body
					});
				} else {
					console.log(status);
					console.log(body);
				}

				doUpload(); // continue with next file upload (if any)
			}
		}

	}

})
(angular);