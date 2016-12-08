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
 
/********************************************************************
 * local environment configuration. 
 * This is base configuration and other environments override this.
 ********************************************************************/
'use strict';

var config = {        
    "app" : {
        "session" : {
            // Secret for encrypting session cookie
            "cookie-secret": "compro123",
            //Max age of Stay SignIn cookie (7 days)
            "staySignInAge": 604800000, 
            "redis" : {
                // Redis URL
                // REDISCLOUD_URL environment variable (if set) will take precedence
                "url": "redis://compro:comprodls@pub-redis-17865.us-east-1-4.6.ec2.redislabs.com:17865"
            }
        },
        "sso" : {
            //To enable Single sign on within apps 
            "enabled": false,
            //Domain to use for authorization cookie in case of Single sign on
            "domain" : ".comprodls.com",
        },
        //Redirect to Https.
        "redirectToHttps" : false
    }            
}

module.exports = config;
