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


export {router as eventsRouter};