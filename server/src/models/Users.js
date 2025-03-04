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
    }

    // maybe users should have name, email, role, and type as required variables and other variables such as organization (For attendees) and rating (For speaker) as not required.
    //  When it comes to registration, we intorduce that depending on the user type inputted, specific other variables will be required.
    // So one database table holding all types of users 
});

export const UserModel = mongoose.model('users', userSchema);