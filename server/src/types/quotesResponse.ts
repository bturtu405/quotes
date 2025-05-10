import { quote } from './quote';

export type quotesResponse = {
  page: number;
  last_page: boolean;
  quotes: quote[];
} 