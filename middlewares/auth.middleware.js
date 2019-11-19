const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    try
    {
        const token = req.header('Authorization');
        if(!token) res.status(401).send('Access denied.');

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // set the request "authorized" property with the validation result
        next();
    } catch(err) {
        res.status(501).json(err);
    }
}

module.exports = authorize;