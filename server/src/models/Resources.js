import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    }
});

export const ResourceModel = mongoose.model('resource', resourceSchema);