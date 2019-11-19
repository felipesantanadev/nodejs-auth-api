const jwt = require('jsonwebtoken');

const authorize = (roles = []) => {
    return (req, res, next) => {
        try
        {
            const token = req.header('Authorization');
            if(!token) return res.status(401).send('Access denied.');
    
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified; // set the request "authorized" property with the validation result
    
            if(roles.length > 0 && !verified.roles.some(r => roles.includes(r))){
                return res.status(401).send('Access Denied');
            }
    
            next();
        } catch(err) {
            console.log(err);
            return res.status(501).json(err);
        }
    }
}

module.exports = authorize;