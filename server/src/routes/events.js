import express from 'express';
import { EventModel } from '../models/Events.js';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post('/createEvent', async (req, res) => {
    const { name, location, description, start_date, end_date} = req.body;

    /* Maybe create code that checks for event time conflict in exact same location?
  

    */
    if(!name || !description || !location || !start_date || !end_date){
        return res.status(400).json({ Error: 'Bad Input, missing data' });
    }

    const newEvent = new EventModel({
        name,
        location,
        description,
        start_date,
        end_date
    })
    await newEvent.save();

    return res.status(200).json({ message: 'Event Created successfully' });

});


router.get('/viewEvents', async (req, res) => {

    /* Maybe create code that checks if event is public or private view (after adding that field in db)
    */

    const Events = await EventModel.find()  // maybe add a check to see if event view field(yet to be added) is type public

    return res.status(200).json({ 
        message: 'Event returned successfully',
        Events
     });

});


router.patch('/getTicket/:id', async (req, res) => {

    const {id} =req.params
    const Event = await EventModel.findById(id) 

    if(!Event){
        return res.status(400).json({ Error: 'Event Not found' });
    }

    const {username, role} = req.body;

    if(!username || !role){
        return res.status(400).json({ Error: 'Bad Input, missing data' });
    }

    if(role != "attendee"){
        return res.status(400).json({ Error: 'Bad Input, choose proper role for event. Only Attendee allowed, ' +
            'organiazers will have to assign other roles' });
    }
    
    const user = await UserModel.findOne({ username: username });

    if(!user){
        return res.status(400).json({ Error: 'User Not found' });
    }

    const attendeeObj = {
        username: username,
        role: role
      }
    const newAttendees = Event.attendees
    

    for(let i = 0; i < newAttendees.length; i++){

        if(username == newAttendees[i].username){
            return res.status(400).json({ 
                message: 'User already registered to event'
             });
        }
    }

    newAttendees.push(attendeeObj)

    await EventModel.findOneAndUpdate({_id: id}, {"attendees": newAttendees})

    return res.status(200).json({ 
        message: 'User registered to event successfully'
     });

});


export {router as eventsRouter};