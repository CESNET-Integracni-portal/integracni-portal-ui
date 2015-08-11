/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var multiparty = require('connect-multiparty');
var environment = process.env.NODE_ENV;
var glob = require('glob');

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

var TOKEN_NAME = 'access_token';


app.use(function (req, res, next) {
	if (req.get(TOKEN_NAME) && req.url.indexOf('/api/') === 0 && req.url != '/api/logout' && req.url != '/api/login') {
		// pages with token required
		//if (tokenExpired(req)) {
		//	res.status(401);
		//	res.json({});
		//	return;
		//}
		//res.setHeader(TOKEN_NAME, getUpdatedToken(req));
	} else if (req.url.indexOf('.woff') != -1) {
		res.contentType("application/x-font-woff");
	} else if (req.url.indexOf('.ttf') != -1) {
		res.contentType("application/x-font-ttf");
	} else if (req.url.indexOf('.otf') != -1) {
		res.contentType("application/x-font-otf");
	}
	return next();
});

/**
 * Authorizace
 */
app.post('/oauth/token', function (req, res) {

	var login = req.params.username;
	var password = req.params.password;

	res.json({
		access_token: "00017d76-0e64-4196-9115-f2552d424946",
		expires_in: 3586,
		refresh_token: "f1a79dec-9640-457d-9bb1-0dfb4954b6e9",
		token_type: "bearer"
	});
});

/**
 * Prihlaseni uzivatele.
 */
app.post('/api/login', function (req, res) {

	var login = req.body.username;
	var password = req.body.password;

	res.json({});
});

/**
 * Odhlaseni uzivatele.
 */
app.post('/api/logout', function (req, res) {
	res.json({});
});

app.get(new RegExp('^\/api\/space$'), function (req, res) {
	var space = req.params[0];
	res.json([
		{
			"id": "cesnet",
			"name": "CESNET"
		},
		{
			"id": "bacula",
			"name": "Bacula"
		}
	]);
});

app.get(new RegExp('^\/api\/space\/([a-zA-Z-]*)$'), function (req, res) {
	var space = req.params[0];

	//glob('./spaces/cesnet/*.*', function(err, files) {
	//	var response = {
	//		folder: [],
	//		files: []
	//	};
	//	if (files) {
	//		for(var i in files) {
	//			var file = files[i];
	//
	//		}
	//	}
	//});

	res.json({
		"folders": [
			{
				"id": "3cf4e5a2-35ca-449d-b683-5da284ab7cfe",
				"name": "prace",
				"createdOn": "2014-12-31T13:05+0100",
				"changedOn": "2014-12-31T13:09+0100"
			}
		],
		"files": [
			{
				"uuid": "1ff076ae-7f8d-4d07-bb03-71aef2141f91",
				"filename": "todo.txt",
				"mimetype": "text/plain",
				"filesize": 86,
				"createdOn": "2014-12-31T13:09+0100",
				"changedOn": "2014-12-31T13:42+0100"
			}
		]
	});
});

app.post(new RegExp('^\/api\/space\/([a-zA-Z-]*)\/folder$'), function (req, res) {
	var space = req.params[0];

	res.json({
		"id": "3cf4e5a2-35ca-449d-b683-5da284ab7cfe",
		"name": "Dokumenty",
		"breadcrumbs": [
			{
				"id": "de54e5a2-35ca-449d-b683-6aa284ab7c55",
				"name": "Dokumenty"
			}
		],
		"folders": [],
		"files": [],
		"createdOn": "2014-12-31T13:05+0100",
		"changedOn": "2014-12-31T13:09+0100"
	});
});

app.get(new RegExp('^\/api\/space\/([a-zA-Z-]*)\/folder\/([a-zA-Z0-9-]+)$'), function (req, res) {
	var space = req.params[0];

	res.json({
		"id": "3cf4e5a2-35ca-449d-b683-5da284ab7cfe",
		"name": "Dokumenty",
		"breadcrumbs": [
			{
				"id": "de54e5a2-35ca-449d-b683-6aa284ab7c55",
				"name": "Dokumenty"
			}
		],
		"folders": [
			{
				"id": 4,
				"name": "Tabulky rychlostí",
				"owner": {
					"id": 1,
					"username": "jan"
				},
				"createdOn": "2014-11-08T14:23+0100",
				"changedOn": "2014-11-08T14:23+0100"
			}
		],
		"files": [
			{
				"uuid": "1ff076ae-7f8d-4d07-bb03-71aef2141f91",
				"filename": "todo.txt",
				"mimetype": "text/plain",
				"filesize": 86,
				"createdOn": "2014-12-31T13:09+0100",
				"changedOn": "2014-12-31T13:42+0100"
			}
		],
		"createdOn": "2014-12-31T13:05+0100",
		"changedOn": "2014-12-31T13:09+0100"
	});
});

app.post('^\/api\/space\/([a-zA-Z-]*)\/file$', multiparty(), function (req, res) {
	var file = req.files.file;

	res.json({
		"uuid": "1ff076ae-7f8d-4d07-bb03-71aef2141f91",
		"filename": "todo.txt",
		"mimetype": "text/plain",
		"filesize": 86,
		"createdOn": "2014-12-31T13:09+0100",
		"changedOn": "2014-12-31T13:42+0100"
	});
});

app.post('^\/api\/space\/([a-zA-Z-]*)\/folder\/([a-zA-Z0-9-]+)\/file$', multiparty(), function (req, res) {
	var file = req.files.file;

	res.json({
		"uuid": "1ff076ae-7f8d-4d07-bb03-71aef2141f91",
		"filename": "todo.txt",
		"mimetype": "text/plain",
		"filesize": 86,
		"createdOn": "2014-12-31T13:09+0100",
		"changedOn": "2014-12-31T13:42+0100"
	});
});


switch (environment) {
	case 'build':
		console.log('** BUILD **');
		app.use(express.static('./build/'));
		// Any invalid calls for templateUrls are under app/* and should return 404
		app.use('/app/*', function (req, res, next) {
			send404(req, res);
		});
		// Any deep link calls should return index.html
		app.use('/*', express.static('./build/index.html'));
		break;
	default:
		console.log('** DEV **');
		app.use(express.static('./.tmp'));
		app.use(express.static('./src/client/'));
		app.use(express.static('./'));
		// Any invalid calls for templateUrls are under app/* and should return 404
		app.use('/app/*', function (req, res, next) {
			send404(req, res);
		});
		// Any deep link calls should return index.html
		app.use('/*', express.static('./.tmp/index.html'));
		break;
}

app.listen(port, function () {
	console.log('Express server listening on port ' + port);
	console.log('env = ' + app.get('env') +
	'\n__dirname = ' + __dirname +
	'\nprocess.cwd = ' + process.cwd());
});


function send404(req, res, description) {
	var data = {
		status: 404,
		message: 'Not Found',
		description: description,
		url: req.url
	};
	res.status(404)
		.send(data)
		.end();
}