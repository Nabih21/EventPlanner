import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    username1: {
        type: String,
        required: true
    },
    username2: {
        type: String,
        required: true
    },
    connectionStartDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    connectionAcceptDate:{
        type: Date,
        required: false
    },
    accepted: {
        type: Boolean,
        default: false
    }
});

export const FriendsModel = mongoose.model('friend', friendSchema);