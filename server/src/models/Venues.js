import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
    capacity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
        unique: true
    }
});

export const VenueModel = mongoose.model('venue', venueSchema);