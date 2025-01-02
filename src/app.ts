import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import router from './app/routes';
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// https://localhost:5000 //local
//* https://kawan.onrender.com/    api/v1

app.use('/api/v1', router);

// app.get('/', (req: Request, res: Response) => {
//   const a = 7;
//   res.send('this is running');
// });

// basic arrow fnc
// const valueName = () =>{

// }

const getController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Kawan is running',
  });
};
app.get('/', getController);
export default app;
