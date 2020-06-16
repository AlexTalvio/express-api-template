import express from 'express';
import { indexPage, messagesPage, itemsPage, addItem, deleteItem, updateItem } from '../controllers';
import { modifyMessage, performAsyncAction, roundPrice } from '../middleware';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/messages', messagesPage);

indexRouter.get('/items', itemsPage);
indexRouter.get('/items/:id', itemsPage);
indexRouter.delete('/items/:id', deleteItem);

indexRouter.put('/items/:id', updateItem);

indexRouter.post('/items', roundPrice, addItem);


export default indexRouter;
