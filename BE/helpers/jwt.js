const expressJwt = require('express-jwt');
const dotenv = require('dotenv')
dotenv.config()
const secret = process.env.JWTKEY


module.exports = jwt;

function jwt() {
    return expressJwt({ secret,  algorithms: ['HS256'] }).unless({
        path: [
            '/api/v1/users/authenticate',
            '/api/v1/users/create',
        ]
    });
}
