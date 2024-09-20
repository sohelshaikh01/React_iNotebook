import jwt from 'jsonwebtoken';
const JWT_SECRET = "Iam$goodboy";

// It is used where I need the login 
const fetchUser = (req, res, next) => {

    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch(error) {
        res.send(401).send({error: "Please authenticate using a valid token"});
    }
}

// Creating middleware
export default fetchUser;