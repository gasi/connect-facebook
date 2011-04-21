//////////////////////////////////////////////////////////////////////////////
//
//  Connect Facebook Middleware
//
//  Copyright 2011 Daniel Gasienica <daniel@gasienica.ch>
//
//  Licensed under the Apache License, Version 2.0 (the "License"); you may
//  not use this file except in compliance with the License. You may obtain
//  a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
//  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
//  License for the specific language governing permissions and limitations
//  under the License.
//
//////////////////////////////////////////////////////////////////////////////

/**
 * Module dependencies.
 */

var connect = require('connect');
var facebook = require('facebook-graph');

/**
 * Parse `req.cookies` and populate `req.facebook.session` with a Facebook
 * session object.
 * Since cookies are used, we must use the [connect.cookieParser()][1]
 * middleware _before_ `facebookCookieParser()`.
 *
 * [1] http://senchalabs.github.com/connect/middleware-cookieParser.html
 *
 * Examples:
 *
 *      connect.createServer(
 *          connect.cookieParser(),
 *          connect.facebookCookieParser(<your-app-id>, <your-app-secret>),
 *          function(req, res, next) {
 *              res.end(JSON.stringify(req.facebook.session));
 *          }
 *     );
 *
 * @return {Function}
 * @api public
 */

module.exports = function facebookCookieParser(appId, appSecret) {
    if (!appId) throw new Error('Facebook application ID required.');
    if (!appSecret) throw new Error('Facebook application secret required.');

    return function facebookCookieParser(req, res, next) {
        var cookies = req.cookies;
        if (!cookies) {
            var message = 'facebookCookieParser depends on connect.cookieParser.';
            var error = new Error(message);
            return next(error);
        }

        req.facebook = {
            session: null
        };

        var facebookSession = facebook.getSessionFromCookie(cookies, appId, appSecret);
        if (facebookSession) {
            req.facebook.session = facebookSession;
        }

        next();
    };
};
