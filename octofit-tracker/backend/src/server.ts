import express from 'express';
import cors from 'cors';
import './config/database.js';
import { apiBaseUrl, apiPort, frontendOrigin } from './config/urls.js';
import usersRouter from './routes/users.js';
import activitiesRouter from './routes/activities.js';

const app = express();

app.use(
  cors({
    origin: [frontendOrigin, 'http://localhost:5173'],
  }),
);
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl: apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.listen(apiPort, () => {
  console.log(`OctoFit API listening on port ${apiPort}`);
  console.log(`OctoFit API base URL: ${apiBaseUrl}`);
});
