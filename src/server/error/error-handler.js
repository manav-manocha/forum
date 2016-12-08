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
 
/*************************************
 * Application Error Handler
 **************************************/
'use strict';

//Get Application Logger
require('../libs/logging');

//Log runtime/uncaught exceptions
process.on('uncaughtException', function(err) {
    syslog.error("Uncaught Error, " + err.stack);
});

//Generic function log errors
exports.logError = function(err) {   
    syslog.error(err);    
};

//Log javascript errors
exports.javascriptErrorController = function(req,res){
    syslog.error("APPS_ERROR , Javascript Error " + JSON.stringify(req.body));    
    res.send(true);
};