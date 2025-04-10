import express from 'express';
import { UserModel } from '../models/Users.js';
import { TicketModel } from '../models/Tickets.js';
import { getUserFromJwtToken } from '../middleware/auth.js';



// Services
import { generateToken} from '../service/jwt.js';
import { hashPassword, verifyPassword } from '../service/password.js';


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

router.get('/viewTickets', getUserFromJwtToken, async (req, res) => {

    const tickets = await TicketModel.find({UserID: req.user.userID}) 

    return res.status(200).json({ 
        message: 'Here are your tickets',
        Tickets: tickets
     });

});


export { router as usersRouter };