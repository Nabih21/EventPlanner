import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    EventID: {
        type: String,
        required: true
    },
    UserID: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

export const TicketModel = mongoose.model('ticket', ticketSchema);