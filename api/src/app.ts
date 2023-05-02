import dotenv from 'dotenv';
import express from 'express';
import { StatusCodes } from 'http-status-codes';

dotenv.config(); // use .env variables
const app = express(); // initialize the express 'app'

// basic get route
app.get('/', (req, res) => {
  res.status(StatusCodes.OK);
  res.json({
    message: 'Sample Get request!',
  });
});

export default app;
