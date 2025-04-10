// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import http from 'http';
// import { Server as SocketIO } from 'socket.io';
// import { mongoPass } from '../secrets.js';
// import { config } from 'dotenv';
// config();

// import { usersRouter } from './routes/users.js';
// import { eventsRouter } from './routes/events.js';
// import { venuesRouter } from './routes/venues.js';



// const app = express();
// const server = http.createServer(app); 

// const io = new SocketIO(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//   },
// });

// // Handle real-time connections
// io.on('connection', (socket) => {
//   console.log('🟢 User connected:', socket.id);

//   socket.on('sendMessage', (data) => {
//     console.log('📨 Message from client:', data.message);
//     io.emit('receiveMessage', data); 
//   });

//   socket.on('disconnect', () => {
//     console.log('🔴 User disconnected:', socket.id);
//   });
// });

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use('/auth', usersRouter);
// app.use('/manage', eventsRouter);
// app.use('/venues', venuesRouter);

// // DB
// mongoose.connect(`mongodb+srv://eventPlannerTeam:${mongoPass}@eventplanner.eujck.mongodb.net/eventplanner?retryWrites=true&w=majority&appName=eventplanner`);

// server.listen(3001, () => {
//   console.log('🚀 Server + WebSocket running on http://localhost:3001');
// });

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import { mongoPass } from '../secrets.js';
import { config } from 'dotenv';
config();

// Routes
import { usersRouter } from './routes/users.js';
import { eventsRouter } from './routes/events.js';
import { venuesRouter } from './routes/venues.js';
import { ticketsRouter } from './routes/tickets.js';
//import { friendsRouter } from './routes/friends.js';

const app = express();
const server = http.createServer(app);

const io = new SocketIO(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.on('sendMessage', (data) => {
    const { message, sender } = data;

    console.log(`📨 Message from ${sender} (${socket.id}): ${message}`);

    // Include senderId to let frontend show "You" if matched
    io.emit('receiveMessage', {
      message,
      sender,
      senderId: socket.id,
    });
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// REST API Routes
app.use('/auth', usersRouter);
app.use('/manage', eventsRouter);
app.use('/venues', venuesRouter);
app.use('/tickets', ticketsRouter);
//app.use('/friends', friendsRouter);

// MongoDB
mongoose.connect(
  `mongodb+srv://eventPlannerTeam:${mongoPass}@eventplanner.eujck.mongodb.net/eventplanner?retryWrites=true&w=majority&appName=eventplanner`
);

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Start the server
server.listen(3001, () => {
  console.log('🚀 Server + WebSocket running on http://localhost:3001');
});
