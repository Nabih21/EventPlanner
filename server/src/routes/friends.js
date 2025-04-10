
import express from 'express';
import { FriendsModel } from '../models/Friends.js';
import { getUserFromJwtToken } from '../middleware/auth.js';


const router = express.Router();

router.get('/viewIncoming', getUserFromJwtToken, async (req, res) => {
    
    let friendRequest = await FriendsModel.find({username2: req.user.username, accepted: false})
    
    if(friendRequest.length < 1){
        return res.status(400).json({ 
            Error: 'You have no incoming friend requests'
         });
    }
    return res.status(200).json({ 
        message: 'Incoming friend requests retrieved',
        Incoming_Friend_Requests : friendRequest
     });

});

router.get('/viewOutgoing', getUserFromJwtToken, async (req, res) => {
    
    let friendRequest = await FriendsModel.find({username1: req.user.username, accepted: false})
    
    if(friendRequest.length < 1){
        return res.status(400).json({ 
            Error: 'You have no Outgoing friend requests'
         });
    }
    return res.status(200).json({ 
        message: 'Outgoing friend requests retrieved',
        Outgoing_Friend_Requests : friendRequest
     });

});

router.get('/viewFriends', getUserFromJwtToken, async (req, res) => {
    
    let friends = await FriendsModel.find({ $or: [ { username1: req.user.username}, { username2: req.user.username } ] , accepted: true})
    
    if(friends.length < 1){
        return res.status(400).json({ 
            Error: 'You currently have no friends saved. Make Connections!'
         });
    }
    return res.status(200).json({ 
        message: 'Friends List retrieved',
        Friends : friends
     });

});
router.patch('/accept/:id', getUserFromJwtToken, async (req, res) => {
    const {id} = req.params
    let friendRequest;
    
    try{
        friendRequest = await FriendsModel.find({_id: id, username2: req.user.username, accepted: false})
    }
    catch(error) {
        return res.status(400).json({ 
            Error: "id provided is invalid"
         });
    }
    if(friendRequest.length < 1){
        return res.status(400).json({ 
            Error: 'You have no incoming friend request with that ID'
         });
    }
    await FriendsModel.findOneAndUpdate({ _id: id }, 
                {accepted: true, connectionAcceptDate: Date.now()})  

    return res.status(200).json({ 
        message: 'Friend Request Accepted'
     });

});


export { router as friendsRouter };
