import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'pdf'
    },
    format: {
        type: String,
        required: true,
        default: 'pdf'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

export const ResourceModel = mongoose.model('resource', resourceSchema);