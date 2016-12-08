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
 * Main entry point to application. 
 * This module starts express server.
 ************************************************************/

//External Node Modules

var path = require('path');
var nodemon = require('nodemon');

var isProduction = process.env.NODE_ENV === 'production';

if(!isProduction ){
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, './app'),
    ignore: [],
    watch: ['server/*'],
    ext: 'js'
  }).on('restart', function() {
    console.log('Server restarted!');
  });
} else {
  require('./app')
}