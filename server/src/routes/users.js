import express from 'express';
import { UserModel } from '../models/Users.js';
import { TicketModel } from '../models/Tickets.js';
import { FriendsModel } from '../models/Friends.js';

import { getUserFromJwtToken } from '../middleware/auth.js';



// Services
import { generateToken} from '../service/jwt.js';
import { hashPassword, verifyPassword } from '../service/password.js';


const router = express.Router();
console.log("✅ Users router loaded");

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

router.get('/viewUsers', async (req, res) => {

    const users = await UserModel.find({}, {password: 0})

    return res.status(200).json({ 
        message: 'All users',
        Users: users
     });

});


router.get('/viewUser/:id', async (req, res) => {
    const {id} = req.params
    let user
    
    try{
        user = await UserModel.find({_id: id}, {password: 0})
    }
    catch(error) {
        return res.status(400).json({ 
            Error: "id provided is invalid"
         });
    }
    if(user.length < 1){
        return res.status(400).json({ 
            Error: 'No user with such ID'
         });
    }
    return res.status(200).json({ 
        message: 'User data',
        User: user
     });

});

router.get('/getUser', getUserFromJwtToken, async (req, res) => {
    try {
        console.log("Backend user:",req.user.username);
        const user = await UserModel.findById(req.user.userID);
        
        if (!user) {
            return res.status(404).json({ 
                Error: 'User not found'
            });
        }

        return res.status(200).json({ 
            message: 'User data retrieved successfully',
            User: user
        });
    } catch (error) {
        return res.status(500).json({ 
            Error: "Error retrieving user data",
            Details: error.message
        });
    }
});

router.post('/sendFriendRequest/:id', getUserFromJwtToken, async (req, res) => {
    const {id} = req.params
    let user
    
    try{
        user = await UserModel.find({_id: id}, {password: 0})
    }
    catch(error) {
        return res.status(400).json({ 
            Error: "id provided is invalid"
         });
    }
    if(user.length < 1){
        return res.status(400).json({ 
            Error: 'No user with such ID'
         });
    }

    if(req.user.username == user[0].username){
        return res.status(400).json({ 
            Error: 'Cant send a friend request to yourself'
         });
    }

    let Connection = await FriendsModel.find({username1: req.user.username,  username2: user[0].username});
    if (Connection.length > 0){
        return res.status(400).json({ 
            Error: 'Connection between these 2 users Already exists'
         });
    }
    Connection = await FriendsModel.find({username1: user[0].username,  username2: req.user.username});
    if (Connection.length > 0){
        return res.status(400).json({ 
            Error: 'Connection between these 2 users Already exists'
         });
    }

    let friendRequest = new FriendsModel({
        username1: req.user.username,
        username2: user[0].username
    })
    friendRequest = await friendRequest.save();

    return res.status(200).json({ 
        message: 'Friend Request Sent',
        friendRequest
     });

});



export { router as usersRouter };