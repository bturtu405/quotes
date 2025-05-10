import express from 'express';
import { getQuotes } from '../service/quoteService';

const router = express.Router();

router.get('/quotes', getQuotes);

export default router; 