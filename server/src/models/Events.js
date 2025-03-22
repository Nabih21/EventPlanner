import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
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
        enum:['planned', 'in progress', 'finished', 'past'],
        required: true,
        default: 'planned'
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

export const EventModel = mongoose.model('event', eventSchema);