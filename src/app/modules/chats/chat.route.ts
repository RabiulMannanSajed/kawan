import express from 'express';
import { ChatController } from './chat.controller';

const route = express.Router();

route.post('/create-chat', ChatController.createChat);

route.get('/', ChatController.getAllChat);

route.patch('/:id', ChatController.deleteChat);

export const ChatRoutes = route;
