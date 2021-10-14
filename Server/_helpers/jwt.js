const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');
const reviewService = require('../reviews/review.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ],
        path: [
            // public routes that don't require authentication
            '/reviews/authenticate',
            '/reviews/add'
        ]
        
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

async function isRevoked(req, payload, done) {
    const review = await reviewService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!review) {
        return done(null, true);
    }

    done();
};

