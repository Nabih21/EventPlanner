import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ResourceModel } from '../models/Resources.js';
import { EventModel } from '../models/Events.js';
import { getUserFromJwtToken } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/resources';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create a unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow PDFs
const fileFilter = (req, file, cb) => {
  console.log("File being filtered:", file.originalname, "MIME type:", file.mimetype);
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Upload a resource for an event
router.post('/upload/:eventId', getUserFromJwtToken, upload.single('resource'), async (req, res) => {
  console.log("Resource upload request received for event:", req.params.eventId);
  console.log("Request body:", req.body);
  console.log("File:", req.file);
  
  try {
    const { eventId } = req.params;
    const { name } = req.body;
    
    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ Error: 'No file uploaded' });
    }
    
    // Check if event exists
    console.log("Checking if event exists:", eventId);
    const event = await EventModel.findById(eventId);
    if (!event) {
      console.error("Event not found:", eventId);
      // Delete the uploaded file if event doesn't exist
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ Error: 'Event not found' });
    }
    
    console.log("Event found:", event._id);
    
    // Create resource record
    const resource = new ResourceModel({
      name: name || req.file.originalname,
      fileUrl: `/uploads/resources/${req.file.filename}`,
      eventId: eventId,
      type: 'pdf',
      format: 'pdf'
    });
    
    console.log("Saving resource:", resource);
    await resource.save();
    
    // Update event with resource reference
    if (!event.resources) {
      event.resources = [];
    }
    event.resources.push(resource._id);
    await event.save();
    
    console.log("Resource uploaded successfully:", resource._id);
    res.status(201).json({ 
      message: 'Resource uploaded successfully',
      Resource: resource
    });
  } catch (error) {
    console.error('Error uploading resource:', error);
    // Delete the uploaded file if there's an error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }
    res.status(500).json({ Error: 'Failed to upload resource: ' + error.message });
  }
});

// Get all resources for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log("Fetching resources for event:", eventId);
    const resources = await ResourceModel.find({ eventId });
    console.log("Found resources:", resources.length);
    res.json({ Resources: resources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ Error: 'Failed to fetch resources' });
  }
});

// Delete a resource
router.delete('/:resourceId', getUserFromJwtToken, async (req, res) => {
  try {
    const { resourceId } = req.params;
    console.log("Deleting resource:", resourceId);
    
    const resource = await ResourceModel.findById(resourceId);
    if (!resource) {
      console.error("Resource not found:", resourceId);
      return res.status(404).json({ Error: 'Resource not found' });
    }
    
    // Delete the file from the filesystem
    const filePath = path.join(process.cwd(), resource.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Remove resource reference from event
    const event = await EventModel.findById(resource.eventId);
    if (event && event.resources) {
      event.resources = event.resources.filter(id => id.toString() !== resourceId);
      await event.save();
    }
    
    // Delete the resource record
    await ResourceModel.findByIdAndDelete(resourceId);
    
    console.log("Resource deleted successfully:", resourceId);
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error("Error deleting resource:", error);
    res.status(500).json({ Error: 'Failed to delete resource' });
  }
});

export default router; 