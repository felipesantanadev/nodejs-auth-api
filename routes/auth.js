const router = require('express').Router();
const User = require('../models/User');
const userValidation = require('../validations/userValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authorize = require('../middlewares/auth.middleware');

router.get('/', async (req, res) => {
    try
    {
        const users = await User.find();
        res.json(users);
    }
    catch(err) {
        res.status(501).json(err);
    }
});

router.post('/:id/assign-role', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).send('User not found.');
        if(!req.body.role) return res.status(400).send('The "role" parameter is required.');

        user.roles.push(req.body.role);
        const result = await User.updateOne({ _id: req.params.id }, { roles: user.roles });
        return res.json(result);
    }
    catch(err){
        console.log(err);
        return res.status(501).json(err);
    }
});

router.post('/register', async (request, response) => {
    try{
        const {error} = userValidation.registerValidation(request.body);
        if(error) response.status(400).json(error);

        // Check if the email is already in the database
        const emailExist = await User.findOne({email: request.body.email});
        if(emailExist) response.status(400).json("The email is already registered.");

        // Hash the password
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(request.body.password, salt);

        const user = new User({
            username: request.body.username,
            email: request.body.email,
            password: hashPassword
        });
    
        const result = user.save();
        response.json(result);
    }catch(err){
        response.status(501).json(err);
    }
});

router.post('/login', async (request, response) => {
    try
    {
        const {error} = userValidation.loginValidation(request.body);
        if(error) return response.status(400).json(error);

        const user = await User.findOne({ email: request.body.email });
        if(!user) return response.status(404).send('Email or password is not valid.');

        const validPassword = await bcrypt.compare(request.body.password, user.password);
        if(!validPassword) return response.status(404).send('Email or password is not valid.');

        // Create Token
        const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET);
        response.header('auth_token', token);
        return response.json({ auth_token: token });
    } catch(err){
        console.log(err);
        response.status(501).json(err);
    }
});

router.get('/my-information', authorize, async (req, res) => {
    try
    {
        const userIdentity = req.user; // req.user was set in auth.middleware.js
        const user = await User.findById(userIdentity.id);
        if(!user)
            return res.status(404).send('User not found.');
        
        return res.json(user);
    }
    catch(err) {
        return res.status(501).json(err);
    }
});

router.get('/only-admin', authorize(roles = ["admin"]), async (req, res, roles = ["user"]) => {
    res.send('Success.');
});

module.exports = router;