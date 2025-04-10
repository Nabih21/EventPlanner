import express from 'express';
import { EventModel } from '../models/Events.js';
import { UserModel } from '../models/Users.js';
import { getUserFromJwtToken } from '../middleware/auth.js';


const router = express.Router();

router.post('/createEvent', getUserFromJwtToken, async (req, res) => {
    const { name, location, description, start_date, end_date, status} = req.body;

    /* Maybe create code that checks for event time conflict in exact same location?
  

    */
    if(!name || !description || !location || !start_date || !end_date){
        return res.status(400).json({ Error: 'Bad Input, missing data' });
    }


    const attendeeObj = [{
        username: req.user.username,
        role: "organizer"
      }]

    console.log(attendeeObj)
    const newEvent = new EventModel({
        name,
        location,
        description,
        start_date,
        end_date,
        status,
        attendees: attendeeObj
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

router.patch('/getTicket/:id', getUserFromJwtToken, async (req, res) => {

    const {id} =req.params
    const Event = await EventModel.findById(id) 

    if(!Event){
        return res.status(400).json({ Error: 'Event Not found' });
    }

    const attendeeObj = {
        username: req.user.username,
        role: "attendee"
      }
    const newAttendees = Event.attendees
    

    for(let i = 0; i < newAttendees.length; i++){

        if(req.user.username == newAttendees[i].username){
            return res.status(400).json({ 
                message: 'User already registered to event'
             });
        }
    }

    newAttendees.push(attendeeObj)

    await EventModel.findOneAndUpdate({_id: id}, {attendees: newAttendees})

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

    for(let i = 0; i < Event.attendees.length; i++){

        if(req.user.username == Event.attendees[i].username){
            if(Event.attendees[i].role == "organizer"){
                await EventModel.findByIdAndDelete(id)
                return res.status(200).json({ 
                    message: 'Event deleted successfully'
                });
            }
            return res.status(400).json({ 
                    message: 'You are not this events organizer. Only an organizer can delete the event'
                });
        }
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



    for(let i = 0; i < Event.attendees.length; i++){
        if(username == Event.attendees[i].username){
            return res.status(400).json({ 
                message: 'User already registered to event'
             });
        }
    } 
    for(let i = 0; i < Event.attendees.length; i++){

        if(req.user.username == Event.attendees[i].username){
            
            if(Event.attendees[i].role == "organizer"){
                const newAttendees = Event.attendees

                const attendeeObj = {
                    username: username,
                    role: role
                  }

                newAttendees.push(attendeeObj)
                await EventModel.findOneAndUpdate({_id: id}, {attendees: newAttendees})
            
                return res.status(200).json({ 
                  message: 'User registered to event successfully'
               });
            }
            return res.status(400).json({ 
                    message: 'You are not this events organizer. Only an organizer can invite others to the event'
            });
        }
    }

    return res.status(400).json({ 
        message: 'You are not this events organizer. Only an organizer can invite others to the event'
     });

});

router.get('/my-events', getUserFromJwtToken, async (req, res) => {
    try {
        // Find events where the current user is an attendee
        const events = await EventModel.find({
            'attendees.username': req.user.username
        });
        
        return res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching user events:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.put('/events/:id', getUserFromJwtToken, async (req, res) => {
    const { id } = req.params;
    const { name, location, description, start_date, end_date, status, venues } = req.body;

    try {
        const event = await EventModel.findById(id);
        if (!event) {
            return res.status(404).json({ Error: 'No Event with such ID' });
        }

        // Check if the user is the organizer
        const isOrganizer = event.attendees.some(att => att.username === req.user.username && att.role === 'organizer');
        if (!isOrganizer) {
            return res.status(403).json({ Error: 'Only the organizer can update the event' });
        }

        // Update the event
        event.name = name || event.name;
        event.location = location || event.location;
        event.description = description || event.description;
        event.start_date = start_date || event.start_date;
        event.end_date = end_date || event.end_date;
        event.status = status || event.status;
        event.venues = venues || event.venues;

        await event.save();

        return res.status(200).json({ message: 'Event updated successfully', Event: event });

    } catch (error) {
        console.error("Error updating event:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ Error: 'Invalid event ID format' });
        }
        return res.status(500).json({ Error: 'Server error while updating event' });
    }
});


router.delete('/events/:id', getUserFromJwtToken, async (req, res) => {
    const { id } = req.params;

    try {
        const event = await EventModel.findById(id);
        if (!event) {
            return res.status(404).json({ Error: 'No Event with such ID' });
        }

        // Check if the user is the organizer
        const isOrganizer = event.attendees.some(att => att.username === req.user.username && att.role === 'organizer');
        if (!isOrganizer) {
            return res.status(403).json({ Error: 'Only the organizer can delete the event' });
        }

        await EventModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Event deleted successfully' });

    } catch (error) {
        console.error("Error deleting event:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ Error: 'Invalid event ID format' });
        }
        return res.status(500).json({ Error: 'Server error while deleting event' });
    }
});

export {router as eventsRouter};