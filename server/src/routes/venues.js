import express from 'express';
import { VenueModel } from '../models/Venues.js';

const router = express.Router();


router.post('/createVenue', async (req, res) => {
    const { capacity, location} = req.body;

    /* Maybe create code that checks for event time conflict in exact same location?
  

    */
    if(!capacity || !location){
        return res.status(400).json({ Error: 'Bad Input, missing data' });
    }

    const newVenue = new VenueModel({
        capacity,
        location
    })
    await newVenue.save();

    return res.status(200).json({ message: 'Venue Created successfully' });

});


router.get('/viewVenues', async (req, res) => {

    /* Maybe create code that checks if event is public or private view (after adding that field in db)
    */

    const Venues = await VenueModel.find()  // maybe add a check to see if event view field(yet to be added) is type public

    return res.status(200).json({ 
        message: 'Venues returned successfully',
        Venues
     });

});

router.get('/viewVenue/:id', async (req, res) => {

    const {id} =req.params
    let Venue
    try{
        Venue = await VenueModel.findById(id) 
    }
    catch(error) {
        return res.status(400).json({ 
            Error: "id provided is invalid"
         });
    }
    if(!Venue){
        return res.status(400).json({ 
            Error: 'No Venue with such ID'
         });
    }

    return res.status(200).json({ 
        message: 'Venue returned successfully',
        Venue
     });

});




export {router as venuesRouter};