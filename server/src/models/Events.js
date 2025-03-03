import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum:['finished', 'in progress', 'past'],
        required: true
    },
    resources: {
        type: Array,
        default: null
    },
    venues: {
        type: Array,
        default: null
    }
});

export const VenueModel = mongoose.model('venue', venueSchema);