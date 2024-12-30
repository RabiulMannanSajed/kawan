import express from 'express';
import { EBookController } from './EBook.controller';

const route = express.Router();

route.post('/create-ebook', EBookController.createEbook);

route.get('/', EBookController.getAllEbook);

export const EBookRouters = route;
