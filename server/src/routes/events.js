import express from 'express';
import { EventModel } from '../models/Events.js';
import { UserModel } from '../models/Users.js';
import { TicketModel } from '../models/Tickets.js';

import { getUserFromJwtToken } from '../middleware/auth.js';


const router = express.Router();

router.post('/createEvent', getUserFromJwtToken, async (req, res) => {
    const { name, location, description, start_date, end_date, status, resources, venues, picture} = req.body;

    /* Maybe create code that checks for event time conflict in exact same location?
  

    */
    if(!name || !description || !location || !start_date || !end_date){
        return res.status(400).json({ Error: 'Bad Input, missing data' });
    }
    let newEvent;
    try{
        newEvent = new EventModel({
            name,
            location,
            description,
            start_date,
            end_date,
            status,
            resources,
            venues,
            picture
        })
        newEvent = await newEvent.save()
    }
    catch(error){
        return res.status(400).json({ Error: error
         });
    }
    const userID = req.user.userID
    const newTicket = new TicketModel({
        EventID: newEvent._id,
        UserID: userID,
        role : "organizer"
    })
   await newTicket.save();

    return res.status(200).json({ message: 'Event Created successfully',
        Event: newEvent
     });

});

router.patch('/editEvent/:_id', getUserFromJwtToken, async (req, res) => {

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

     if(req.body.promoted != null){
        return res.status(400).json({ 
            message: "You must pay to promote event",
         });
     }

    const userEventCheck = await TicketModel.find({EventID: _id, UserID: req.user.userID, role: "organizer"}) 

    if(userEventCheck.length > 0){

        
        await EventModel.findOneAndUpdate({ _id: _id }, 
            req.body,)  

        return res.status(200).json({ 
            message: 'Event details successfully edited',
        });
    }
    return res.status(400).json({ 
        message: 'Only event organizer can edit Event details',
     });

});

router.get('/viewEvents', async (req, res) => {

    /* Maybe create code that checks if event is public or private view (after adding that field in db)
    */

    const Events = await EventModel.find().sort({promoted: -1})  // maybe add a check to see if event view field(yet to be added) is type public

    return res.status(200).json({ 
        message: 'Event returned successfully',
        Events
     });

});

router.patch('/promoteEvent/:_id', getUserFromJwtToken, async (req, res) => {

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
     


     const update = await EventModel.findOneAndUpdate({ _id: _id }, 
         { promoted: true})  
 
 
     return res.status(200).json({ 
         message: 'Event Promoted successfully'
      });

});

router.patch('/getTicket/:id', getUserFromJwtToken, async (req, res) => {

    const {id} =req.params
    const Event = await EventModel.findById(id) 

    if(!Event){
        return res.status(400).json({ Error: 'Event Not found' });
    }
    
    
    const userEventCheck = await TicketModel.find({EventID: id, UserID: req.user.userID}) 

    if(userEventCheck.length > 0){
            return res.status(400).json({ 
                message: 'User already registered to event'
             });
    }

    let newTicket = new TicketModel({
        EventID: id,
        UserID: req.user.userID,
        role : "attendee"
    })
    newTicket = await newTicket.save();

    return res.status(200).json({ 
        message: 'User registered to event successfully. Here is your ticket',
        Ticket: newTicket
     });

});

      
router.get('/viewEvent/:id', async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        return res.status(400).json({ 
            Error: "No event ID provided"
         });
    }
    
    let Event;
    try{
        Event = await EventModel.findById(id)
            .populate({
                path: 'resources',
                model: 'resource'  // Changed from 'Resource' to 'resource' to match model definition
            });
    }
    catch(error) {
        console.error("Error fetching event:", error);
        return res.status(400).json({ 
            Error: "Invalid event ID format"
         });
    }
    
    if(!Event){
        return res.status(400).json({ 
            Error: 'No Event found with the specified ID'
         });
    }

    return res.status(200).json({ 
        message: 'Event returned successfully',
        Event
     });

});

router.get('/viewEventAttendees/:id', getUserFromJwtToken, async (req, res) => {

    const {id} =req.params
    let Event
    try{
    Event = await EventModel.findById(id)
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

    const userEventCheck = await TicketModel.find({EventID: id, UserID: req.user.userID, role: "organizer"}) 

    if(userEventCheck.length > 0){
        const eventTickets =  await TicketModel.find({EventID: id})
        return res.status(200).json({ 
            message: 'Event attendees successfully returned',
            eventTickets
        });
    }
    return res.status(400).json({ 
        message: 'Only event organizer can view Event attendees',
     });

});
      
      
router.delete('/deleteEvent/:id', getUserFromJwtToken, async (req, res) => {

    const {id} =req.params
    let Event
    try{
    Event = await EventModel.findById(id) // maybe add a check to see id person deleting is organizer of event or not
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

    const userEventCheck = await TicketModel.find({EventID: id, UserID: req.user.userID, role: "organizer"}) 

    if(userEventCheck.length > 0){
        await EventModel.findByIdAndDelete(id)
        return res.status(200).json({ 
            message: 'Event deleted successfully'
        });
    }

    return res.status(400).json({ 
        message: 'Shouldnt even be able to see this option :C. You are not this events organizer. Only an organizer can delete the event'
     });

});


router.patch('/inviteToEvent/:id', getUserFromJwtToken, async (req, res) => {

    const {id} =req.params
    let Event
    try{
    Event = await EventModel.findById(id)
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

    const {username, role} = req.body

    if(!username || !role || (role != "organizer" && role != "stakeholder" && role != "speaker" && role != "attendee")){
        return res.status(400).json({ Error: 'Bad Input, missing / incorrect data' });
    }

    const user = await UserModel.findOne({ username: username });

    if ( !user) {
        return res.json({ message: 'Attempted user to invite is non-existent' });
    }



    const organizerEventCheck = await TicketModel.find({EventID: id, UserID: req.user.userID, role: "organizer"}) 

    if(organizerEventCheck.length > 0){
        const attendeeEventCheck = await TicketModel.find({EventID: id, UserID: user._id}) 
        if(attendeeEventCheck.length > 0){
            return res.status(400).json({ 
                message: 'User already registered to event'
             });
        }
        else{
            let newTicket = new TicketModel({
                EventID: id,
                UserID: user._id,
                role : role
            })
            newTicket = await newTicket.save();
        
            return res.status(200).json({ 
                message: 'User invited to event successfully. Here is their ticket',
                Ticket: newTicket
             });
        }
    
    }
    else{
        return res.status(400).json({ 
            message: 'You are not this events organizer. Only an organizer can invite others to the event'
        });
    }



});


export {router as eventsRouter};