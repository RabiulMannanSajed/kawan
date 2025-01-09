import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import router from './app/routes';

// parsers
app.use(express.json());
app.use(cors());

// Handle preflight requests for all routes
app.options('*', cors());
//* https://kawan.onrender.com/api/v1

app.use('/api/v1', router);

const getController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Kawan is running',
  });
};
app.get('/', getController);
export default app;
