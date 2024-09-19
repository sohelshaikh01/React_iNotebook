import express from 'express';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator'; // Correct import

const router = express.Router();

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

        // Saving data to User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }); 
        res.status("User created successfully");
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Some Error occured");
    }


});

export default router;
