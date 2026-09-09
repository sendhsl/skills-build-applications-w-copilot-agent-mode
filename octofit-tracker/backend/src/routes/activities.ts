import { Router } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  const activities = await Activity.find().populate('user').lean();
  response.json(activities);
});

export default router;
