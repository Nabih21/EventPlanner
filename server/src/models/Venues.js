import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
        unique: true
    },
    available_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    type: {
        type: String,
        required: true,
        enum:['stadium ', 'school lounge', 'theater ', 'park', 'office building'],
    }
});

export const VenueModel = mongoose.model('venue', venueSchema);