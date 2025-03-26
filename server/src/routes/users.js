import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username: username });

    if (user) {
        return res.json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if ( !isPasswordValid) {
        console.log("Username or password is incorrect")
        return res.json({ message: 'PasswordBad' });
    }

    const token = jwt.sign({
        id : user._id,
    },  "secret") ;
    res.json({token, userID: user._id});

});

router.patch('/editProfile/:username', async (req, res) => {
    const {username} = req.params;

    let data = { ...req.body };    
    if(data.username != null){
        return res.status(400).json({ 
            message: 'Account username cant be changed'
         });
    }
    if(data.password != null){
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        
        data.password = hashedPassword;
    }

    const user = await UserModel.findOneAndUpdate({username: username},data)

    if ( !user) {
        return res.json({ message: 'Attempted user with username to edit is non-existent' });
    }

    const Newuser = await UserModel.findOne({ username: username });

    return res.status(200).json({ 
        message: 'User edited successfully',
        Newuser
     });
});


export { router as usersRouter };