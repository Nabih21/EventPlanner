import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    amount: {
        type: number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    discount: {
        type: Boolean,
        required: true
    },
    eventID: {
        type: String,
        required: true
    },
    attendeeID: {
        type: String,
        required: true
    }
});

export const Paymentmodel = mongoose.model('payment', paymentSchema);