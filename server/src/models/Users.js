import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    DOB: {
        type: Date,
        required: false
    },
    SocialWebsiteLink: {
        type: String,
        required: false
    }

});

export const UserModel = mongoose.model('users', userSchema);