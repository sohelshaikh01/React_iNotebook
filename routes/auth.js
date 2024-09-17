import express from 'express';
import User from '../models/User';
const router = express.Router();

// Create a User using POST "/api/auth". Doesnt Require auth
router.get('/', (req, res) => {
    console.log(req.body);
    
    const user = new User(req.body);
    user.save();
    res.send(req.body);
});

export default router;