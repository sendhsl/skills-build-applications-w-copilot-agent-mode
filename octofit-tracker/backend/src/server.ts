import express from 'express';
import cors from 'cors';
import './config/database.js';
import usersRouter from './routes/users.js';
import activitiesRouter from './routes/activities.js';

const apiPort = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${apiPort}`;
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';

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
