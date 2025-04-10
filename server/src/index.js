import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { mongoPass } from '../secrets.js';
import { config } from 'dotenv';
config();
import { usersRouter } from './routes/users.js';
import { eventsRouter } from './routes/events.js';
import { venuesRouter } from './routes/venues.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', usersRouter);
app.use('/manage', eventsRouter);
app.use('/venues', venuesRouter);

mongoose.connect(`mongodb+srv://eventPlannerTeam:${mongoPass}@eventplanner.eujck.mongodb.net/eventplanner?retryWrites=true&w=majority&appName=eventplanner`);

app.listen(3001, () => console.log('Server started on port 3001'));


