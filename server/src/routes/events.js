import express from 'express';
import { EventModel } from '../models/Events.js';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post('/createEvent', async (req, res) => {
    const { name, location, description, start_date, end_date, status} = req.body;

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
        end_date,
        status
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

router.get('/showPromotedEvents', async (req, res) => {

    const Events = await EventModel.find({promoted: true})  

    if(!Events){
        return res.status(404).json({ 
            message: 'Sorry, no events promoted currently'
         });
    }

    return res.status(200).json({ 
        message: 'Promoted Events returned successfully',
        Events
     });

});


router.patch('/promoteEvent/:_id', async (req, res) => {

     const _id = req.params
     let Event;

    try{
        Event = await EventModel.findById(_id)
    }
    catch(error) {
        return res.status(400).json({ 
         Error: "id provided is invalid"
         });
    }
     if(!Event){
         return res.status(400).json({ 
             message: 'Sorry, no event with that id'
          });
     }
 
     if(Event.promoted == true){
         return res.status(400).json({ 
             message: 'Event currently with active promotion'
          });
     }
     
     console.log(Event.promotion)
     let newpromotion = Event.promotion
     if (typeof newpromotion === 'undefined'){
        newpromotion = []
     }

     const current_date = new Date()
     const promotion_end = current_date.setDate(current_date.getDate() + 5);
     const addedpromotion = {
         promotion_end: promotion_end,
         promotion_cost_total: 0
     }
 
     newpromotion.push(addedpromotion)
     console.log(newpromotion)


     const update = await EventModel.findOneAndUpdate({ _id: _id }, 
         { promoted: true, promotion: newpromotion})  
 
 
     return res.status(200).json({ 
         message: 'Event Promoted successfully',
         Event
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

      
router.get('/viewEvent/:id', async (req, res) => {

    const {id} =req.params
    let Event
    try{
    Event = await EventModel.findById(id) // maybe add a check to see if event view field(yet to be added) is type public
    }
    catch(error) {
        return res.status(400).json({ 
            Error: "id provided is invalid"
         });
    }
    if(!Event){
        return res.status(400).json({ 
            Error: 'No Event with such ID'
         });
    }

    return res.status(200).json({ 
        message: 'Event returned successfully',
        Event
     });

});

      
      
router.delete('/deleteEvent/:id', async (req, res) => {

    const {id} =req.params
    let Event
    try{
    Event = await EventModel.findByIdAndDelete(id) // maybe add a check to see id person deleting is organizer of event or not
    }
    catch(error) {
        return res.status(400).json({ 
            Error: "id provided is invalid"
         });
    }
    if(!Event){
        return res.status(400).json({ 
            Error: 'No Event with such ID'
         });
    }

    return res.status(200).json({ 
        message: 'Event deleted successfully'
     });

});


export {router as eventsRouter};