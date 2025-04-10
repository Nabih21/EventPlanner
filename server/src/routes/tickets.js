import express from 'express';
import { TicketModel } from '../models/Tickets.js';
import { getUserFromJwtToken } from '../middleware/auth.js';

const router = express.Router();

// Get all tickets for the logged-in user
router.get('/viewTickets', getUserFromJwtToken, async (req, res) => {
  try {
    const tickets = await TicketModel.find({ UserID: req.user.userID });
    return res.status(200).json({ 
      message: 'Tickets retrieved successfully',
      Tickets: tickets
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return res.status(500).json({ 
      Error: 'Failed to retrieve tickets' 
    });
  }
});

export {router as ticketsRouter};