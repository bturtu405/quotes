import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import quoteRoutes from './routes/quoteRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', quoteRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app; 