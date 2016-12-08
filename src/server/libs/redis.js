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
 * Module to handle Redis connections. 
 * Redis is currently being used to store user session data.
 ************************************************************/
'use strict';

//External npm modules
var redis = require('redis');

//Application configuration
var config = require('../config');

var errorHandler = require('../error/error-handler');

// Get Redis URL from environment variable. If not present in environment variable, get from config.
var redisURL = process.env.REDIS_URL || config.app.session.redis.url;

//Create Redis client
var redisClient = redis.createClient(redisURL);

//Redis Event handlers
redisClient.on('connect', function() {
    syslog.info('REDIS connection successful.');
});
redisClient.on('error', function(err) {
    errorHandler.logError("REDIS-ERROR: Connection Error, " + err);
});
redisClient.on('end', function() {
    syslog.info('REDIS connection closed');
});


//Module exports/public functions
exports.redisClient = redisClient