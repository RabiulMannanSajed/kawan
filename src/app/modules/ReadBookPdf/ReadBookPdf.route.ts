import express from 'express';
import { ReadBookPdfController } from './ReadBookPdf.controller';

const route = express.Router();
route.post('/create-ReadBookPdf', ReadBookPdfController.createReadBookPdf);

route.get('/', ReadBookPdfController.getAllReadBook);

route.patch('/:id', ReadBookPdfController.deleteReadBookPdf);

route.patch('/:id', ReadBookPdfController.favoriteReadBookPdf);

export const ReadBookPdfRouters = route;

/*

payment 
payment id 

Userid username useEmail
total price 
card name 
cvc  pin card   

item name 
*/
