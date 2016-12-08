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

 /**********************************************************************
 * Provides functions for user authentication
 ***********************************************************************/
'use strict';

var comproDLS = require('comprodls-sdk').init();
var config = require('../config');
var env = require('../config/env');


var authCookieName = "dls_config";

//Authenticate user credentials.
var authWithDLS = function(username,password,orgid,callback) {
    comproDLS.authWithCredentials(orgid, {username: username, password: password}, {}).then(
        function success(response) {
          var userObj = {};
          userObj['username'] = username;     
          userObj['userid'] = response['user']['uuid'];
          userObj['name'] = response['user']['name'];      
          userObj['orgid']= orgid; 
          userObj['expires_in'] = response['token']['expires_in'];
          userObj['access_token'] = response['token']['access_token'];
          userObj['refresh_token'] = response['token']['refresh_token'];
          if(response.user.roles.admin){
              userObj.role_primary = "admin"
          } else if(response.user.roles.teacher){
              userObj.role_primary = "teacher"
          } else if(response.user.roles.student){
              userObj.role_primary = "student"
          }
          callback(userObj);
        },
        function error(err) {
          callback(null,err.httpcode,err.message);
        }
    );
}


//Authenticate Login Request
exports.login  = function(req, res, next) {
  authWithDLS(req.body["username"],req.body["password"],req.body["orgid"],function(user, statusCode, errormsg) {
    if (!user) {
      return res.send({success:false,status:statusCode,message:errormsg});
    } else {
       req.logIn(user, function(err) {
          if (err) {         
            return res.send({success:false, msg:'Internal server error'});
          }
          req.session.orgid = req.body["orgid"];
          req.session.expiresIn = user['expires_in'];
          req.session.accessToken = user['access_token'];
          req.session.refreshToken = user['refresh_token'];

          var authcookieConfig = {};
          var authCookieJSON = {
            "userid":user.userid,
            "orgid":req.session.orgid,
            "sso":false,
            "role" : user.role_primary
          }
          if (req.body.staySignedIn) {
            //Setting cookie age to 7 days (if stay signed is checked)
            req.session.cookie.maxAge = config.app.session.staySignInAge;
            authcookieConfig.maxAge = config.app.session.staySignInAge;
          }
          if (config.app.sso.enabled) {            
            authCookieJSON.sso = true;            
            authCookieJSON.env = env;
            authcookieConfig.domain = config.app.sso.domain;
          }
          res.cookie(authCookieName,JSON.stringify(authCookieJSON), authcookieConfig);
          
          delete user.expires_in;
          delete user.access_token;
          delete user.refresh_token;
                    
          //req.session.messages = "Login successful";          
          return res.status(200).send({success:true,user:user});
      });
    }
  });
}

//Handle user logout request
exports.logout = function(req, res){  
  req.logout();
  req.session.destroy(function(){
      var authcookieConfig = {};
      if (config.app.sso.enabled) {
        authcookieConfig.domain = config.app.sso.domain;
      }
      res.clearCookie(authCookieName, authcookieConfig);
      return res.status(200).send({success:true});
  });
}