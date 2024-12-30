import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import router from './app/routes';
const port = 3000;
// parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

// app.get('/', (req: Request, res: Response) => {
//   const a = 7;
//   res.send('this is running');
// });
export default app;
