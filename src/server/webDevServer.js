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
 * This module starts web express server.
 ************************************************************/

var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./../../webpack.config.js');
var port = 8080;


module.exports = function () {

  // First we fire up Webpack an pass in the configuration we
  // created
  var bundleStart = null;
  var compiler = Webpack(webpackConfig);

  // We give notice in the terminal when it starts bundling and
  // set the time it started
  compiler.plugin('compile', function() {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  // We also give notice when it is done compiling, including the
  // time it took.
  compiler.plugin('done', function() {
    syslog.info('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  var bundler = new WebpackDevServer(compiler, {

    publicPath: '/',
    
    // To serve your index.html in place of 404 responses
    historyApiFallback: true,

    // Configure hot replacement
    hot: true,

    // The rest is terminal configurations
    quiet: false, //output anything to the console.
    noInfo: true, //suppress useless information
    stats: {
      colors: true //add some colors to the output
    },
    proxy: { // All API request are proxied to Express-server running on 3000 port
      '/': {
          target: 'http://localhost:3000/'
        }
     }
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(port, 'localhost', function () {
    syslog.info('Web-dev-server running on port ' + port);
  });

};