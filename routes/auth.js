import express from 'express';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator'; 
import bcrypt from 'bcryptjs';
const router = express.Router();

const JWT_SECRET = 'Harryisagoodb$oy';
import jwt from 'jsonwebtoken';

// Create a User using POST "/api/auth/createuser". Doesn't require auth
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

        const data = {
            user:{
                id: user.id
            } 
        }
        
        // JWT Sign (data and secret); // Synchronours method
        const authToken =  jwt.sign(data, JWT_SECRET);

        res.json(authToken);

    }

    catch(error) {
        console.log(error);
        res.status(500).send("Some Error occured");
    }


});

export default router;
