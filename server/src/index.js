import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { mongoPass } from '../secrets.js';

import { usersRouter } from './routes/users.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', usersRouter);

mongoose.connect(`mongodb+srv://eventPlannerTeam:${mongoPass}@eventplanner.eujck.mongodb.net/eventplanner?retryWrites=true&w=majority&appName=eventplanner`);

app.listen(3001, () => console.log('Server started on port 3001'));


