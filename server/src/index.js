import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
import { usersRouter } from './routes/users.js';
import { ticketsRouter } from './routes/tickets.js';
import { eventsRouter } from './routes/events.js';
import { venuesRouter } from './routes/venues.js';
import { friendsRouter } from './routes/friends.js';
import resourcesRouter from './routes/resources.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/tickets', ticketsRouter);
console.log("✅ Registering /auth routes");
app.use('/auth', usersRouter);
app.use('/manage', eventsRouter);
app.use('/venues', venuesRouter);
app.use('/friends', friendsRouter);
app.use('/resources', resourcesRouter);

// Use the MongoDB URI from environment variables
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/test', (req, res) => {
    console.log("✅ /test route hit");
    res.send("Test route works");
  });
  
app.listen(3001, () => console.log('Server started on port 3001'));


