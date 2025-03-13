import express from 'express';
import { app } from './app.js';
import https from 'https';
import dotenv from 'dotenv';
import connectDB from './DB/db.js';

dotenv.config();

connectDB()
.then(() => {
    // Ensure the server only listens after DB connection is successful
    console.log('Connected to database');
})
.catch((err) => {
    console.error('Database connection failed', err);
    server.close(() => {
        process.exit(1); // Exit with failure code
    });
});

// const server = https.createServer(app) ; 

const server = app.listen(process.env.PORT|| 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
}
); 
