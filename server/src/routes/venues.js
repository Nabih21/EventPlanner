import express from 'express';
import { VenueModel } from '../models/Venues.js';

const router = express.Router();

// Root route that returns all venues
router.get('/', async (req, res) => {
    try {
        const venues = await VenueModel.find();
        return res.status(200).json(venues);
    } catch (error) {
        console.error('Error fetching venues:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/createVenue', async (req, res) => {
    const { name, capacity, location, type, available_at } = req.body;

    /* Maybe create code that checks for event time conflict in exact same location?
  

    */
    if(!name || !capacity || !location){
        return res.status(400).json({ Error: 'Bad Input, missing data' });
    }

    const newVenue = new VenueModel({
        name,
        capacity,
        location,
        type,
        available_at
    })
    try{
    await newVenue.save();
    }
    catch(error) {
        return res.status(400).json({ 
         Error: "Unique constraint for some fields not fullfilled (or maybe another error)"
         });
    }

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

// Route to update a specific venue by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, capacity, location, type, available_at } = req.body;

    try {
        const venue = await VenueModel.findById(id);
        if (!venue) {
            return res.status(404).json({ Error: 'No Venue with such ID' });
        }

        // Update fields if provided
        venue.name = name || venue.name;
        venue.capacity = capacity || venue.capacity;
        venue.location = location || venue.location;
        venue.type = type || venue.type;
        venue.available_at = available_at || venue.available_at;

        await venue.save();
        return res.status(200).json({ message: 'Venue updated successfully', Venue: venue });

    } catch (error) {
        console.error("Error updating venue:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ Error: 'Invalid venue ID format' });
        }
        // Handle potential unique constraint errors if location is updated
        if (error.code === 11000 && error.keyPattern && error.keyPattern.location) {
             return res.status(400).json({ Error: 'Location must be unique' });
        }
        return res.status(500).json({ Error: 'Server error while updating venue' });
    }
});

// Route to delete a specific venue by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const venue = await VenueModel.findByIdAndDelete(id);
        if (!venue) {
            return res.status(404).json({ Error: 'No Venue with such ID' });
        }
        return res.status(200).json({ message: 'Venue deleted successfully' });

    } catch (error) {
        console.error("Error deleting venue:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ Error: 'Invalid venue ID format' });
        }
        return res.status(500).json({ Error: 'Server error while deleting venue' });
    }
});

export {router as venuesRouter};