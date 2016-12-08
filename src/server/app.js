/*************************************************************************
 *
 * COMPRO CONFIDENTIAL
 * __________________
 *
 *  [2015] - [2020] Compro Technologies Private Limited
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Compro Technologies Private Limited. The
 * intellectual and technical concepts contained herein are
 * proprietary to Compro Technologies Private Limited and may
 * be covered by U.S. and Foreign Patents, patents in process,
 * and are protected by trade secret or copyright law.
 *
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Compro Technologies Pvt. Ltd..
 ***************************************************************************/
 
/***********************************************************
 * This module configures express app.
 * Defines backend endpoints
 ************************************************************/
var appEnvironment = require('./config/env');

//Enable NewRelic Monitoring for all environments except local
//Newrelic should be loaded before all other modules. Dont move this code snippet down.
if (appEnvironment != "local") {
    require ('newrelic');
}

/*
 * Load errorhandler before all other modules. 
 * This enables catching errors which occur on server startup.
 */
var ErrorHandler = require('./error/error-handler');


var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

//Authentication modules
var passport = require('passport');
var redisStore = require('connect-redis')(session);
var path = require('path');

var authController = require('./controllers/auth-controller')
var config = require('./config');
var redis = require('./libs/redis');
var reqUtils = require('./libs/request-utils');

//Instantiate Redis client
var redisClient = redis.redisClient;


var app = express();
var isProduction = process.env.NODE_ENV === 'production';

// Support JSON-encoded bodies
app.use(bodyParser.json({
	limit: '5mb'
}));

// Support URL-encoded bodies     
app.use(bodyParser.urlencoded({
	limit: '5mb', 
	extended: true 
}));

/**********************************
* Authentication/Authorization
***********************************/


var cookieConfig = {};

if (config.app.sso.enabled) {
	cookieConfig.domain = config.app.sso.domain;
}

app.use(session(
	{
		secret: config.app.session["cookie-secret"], 
		store: new redisStore({client: redisClient}),
		saveUninitialized:true,
		resave:false,
		cookie: cookieConfig				
	}
));	

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  if(user)		
	  done(null, user);
});
passport.deserializeUser(function(userObj, done) {		
	  done(null,userObj);
});

app.use(function (req, res, next) {
	if(config.app.redirectToHttps && !reqUtils.isHttps(req)){
		res.redirect('https://' + req.headers.host + req.url);
	} else {
		next();
	}
});

app.post('/login', authController.login);
app.get('/logout', authController.logout);
//Javascript Error Handler
app.post('/error/javascript', ErrorHandler.javascriptErrorController);

if (!isProduction) {
  // We require the bundler inside the if block because
  // it is only needed in a development environment. 
  var bundle = require('./webDevServer.js');
  bundle();
} else {
    // Accessing the static assets from the dist in production environment
    app.use(express.static(path.resolve(__dirname, './../../dist')));
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
 syslog.info('Express server running on port ' + port);
});



module.exports = app;


