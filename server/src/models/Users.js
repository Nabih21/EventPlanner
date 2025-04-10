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
    profilePicture:{
        type: String,
        required: true,
        default: "https://marketplace.canva.com/EAE6rOHfH7g/1/0/1600w/canva-happy-birthday-IjsxyFDxkzA.jpg"
    },
    socialMediaLink:{
        type: String,
        required: false
    },
    contactInfo:{
        type: String,
        required: false
    },
    personalDescription:{
        type: String,
        required: false,
        default: "This is a test. I really enjoy getting to know people and connecting with others. My hobbies include coding and teaching others. Send me a friend Request!"
    },
    currentCity:{
        type: String,
        required: false,
        default: "testing"
    },
    birthDate:{
        type: Date,
        required: false,
        default: "2003-12-29"
    }

    // maybe users should have name, email, role, and type as required variables and other variables such as organization (For attendees) and rating (For speaker) as not required.
    //  When it comes to registration, we intorduce that depending on the user type inputted, specific other variables will be required.
    // So one database table holding all types of users 
});

export const UserModel = mongoose.model('users', userSchema);