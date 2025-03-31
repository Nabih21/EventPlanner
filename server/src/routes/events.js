import express from 'express';
import { EventModel } from '../models/Events.js';

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

router.get('/showPromotedEvents', async (req, res) => {

    const Events = await EventModel.find({"promoted": true})  

    if(!Events.rows){
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

export {router as eventsRouter};