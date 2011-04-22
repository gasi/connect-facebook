Connect Facebook Middleware
===========================

[Connect][] middleware that parses Facebook cookie and populates
`req.facebook.session` with a Facebook session object.


Installation
------------

    npm install connect-facebook


Development
-----------

    git clone https://github.com/gasi/connect-facebook.git connect-facebook
    npm link ./connect-facebook


Basic usage
-----------

    var connect = require('connect');
    var facebookMiddleware = require('connect-facebook');

    // Define your Facebook credentials:
    var FACEBOOK_APP_ID = '';
    var FACEBOOK_APP_SECRET = '';

    connect.createServer(
        connect.cookieParser(),
        facebookMiddleware(FACEBOOK_APP_ID, FACEBOOK_APP_SECRET),
        function(req, res, next) {
            res.end(JSON.stringify(req.facebook.session));
        }
    );

    /*
        Output:

        {
            access_token: '...',
            expires: '13034...',
            secret: '...',
            session_key: '...',
            sig: '...',
            uid: '630665057'
        }
    */


Reporting Issues
----------------

Please file bugs or other issues in our [issues tracker][issues].

[connect]: http://senchalabs.github.com/connect/
[express-js]: http://expressjs.com
[issues]: https://github.com/gasi/connect-facebook/issues
