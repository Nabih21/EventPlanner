import express from 'express';
import { UserModel } from '../models/Users.js';


// Services
import { generateToken, verifyToken } from '../service/jwt.js';
import { hashPassword, verifyPassword } from '../service/password.js';
import { getUserFromJwtToken } from '../middleware/auth.js';


const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username: username });

    if (user) {
        return res.json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
        username,
        password: hashedPassword
    })
    await newUser.save();

    res.json({ message: 'User registered successfully' });

});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username: username });

    if ( !user) {
        console.log("Attempted login user is non-existent")
        return res.json({ message: 'InvalidUser' });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if ( !isPasswordValid) {
        console.log("Username or password is incorrect")
        return res.json({ message: 'PasswordBad' });
    }

    const token = generateToken({userID: user._id, username: user.username}) ;
    res.json({token, userID: user._id, username: user.username});

});

router.get('/me', getUserFromJwtToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Return user data without password
        const userData = {
            _id: user._id,
            username: user.username
        };
        
        return res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

export { router as usersRouter };