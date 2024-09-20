import express from 'express';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator'; 
import bcrypt from 'bcryptjs';
const router = express.Router();
import fetchUser from '../middleware/fetchUser.js';

const JWT_SECRET = 'Iam$goodboy';
import jwt from 'jsonwebtoken';

// ROUTE 1: Create a User using POST "/api/auth/createuser". Doesn't require auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors, return bad request and the errrors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try{
        // Compare new user email to present or not already.
        let user = await User.findOne({email: req.body.email});
        if(user) { // if present then to return.
            return res.status(400).json({error: "Sorry a user with this email already exists"});
        }

        const salt = await  bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Saving data to User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

    }
    catch(error) {
        console.log(error);
        res.status(500).send("Some Error occured");
    }

});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login", No login required
router.post('/login', [
    body('email', 'Enter a valid name').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async(req, res) => {
    // If there are errors, return bad requests.
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array() });
    } 

    const {email, password } = req.body;
    try{
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({error: "please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({error: "please try to login with correct credentials" });
        }

        const data = {
            user:{
                id: user.id
            } 
        }
        
        // JWT Sign (data and secret); // Synchronours method
        const authToken =  jwt.sign(data, JWT_SECRET);
        res.json({authToken: authToken});
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

});

// ROUTE 3: Get logged in User Details using: POST: "api/auth/getuser". Login required
    router.post('/getuser', fetchUser, async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("password");
        // Select except the password
        res.send(user);
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


export default router;
