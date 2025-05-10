import { Request, Response } from 'express';
import axios from 'axios';
import { quotesResponse } from '../types';
import axiosRetry from 'axios-retry';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.FAVQS_API_KEY;
const API_URL = 'https://favqs.com/api/quotes';
const quoteAxios = axios.create();
console.log(API_KEY);

axiosRetry(quoteAxios, {
  retries: 3,
  retryDelay: (retryCount) => {
    console.log(`Retry attempt: ${retryCount}`);
    return retryCount * 1000; 
  },
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response?.status === 429
    );
  },
  onRetry: (retryCount, error) => {
    console.log(`Retrying request (${retryCount}/3) due to:`, error.message);
  }
});

export const getQuotes = async (req: Request, res: Response) => {
  try {
    const tag = req.query.tag as string | undefined;
    const page = parseInt(req.query.page as string) || 1;
    const count = parseInt(req.query.count as string);
    
    let url = `${API_URL}?page=${page}`;
    if (tag) {
      url = `${API_URL}?filter=${tag}&type=tag&page=${page}`;
    }
    const response = await quoteAxios.get<quotesResponse>(url, {
      headers: {
        'Authorization': `Token token="${API_KEY}"`,
        'Content-Type': 'application/json'
      }
    }); 
    
    const numQuotes = response.data.quotes.length;
    const pageSize = Math.min(count - (page - 1) * 25, numQuotes);

    const quotes = response.data.quotes.slice(0, pageSize).map(quote => ({
      quote: quote.body,
      author: quote.author,
      tags: quote.tags,
    }));
    
    res.json({
      quotes,
      page: response.data.page,
      hasMore: !response.data.last_page && page * 25 < count
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Failed to fetch quotes from external API' });
  }
};