import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsControlle from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';

const routes=express.Router();
const upload=multer(multerConfig);
const pointsController=new PointsController();
const itemsController=new ItemsControlle();

routes.get('/items',itemsController.index);

routes.post('/points',upload.single('image'),pointsController.create);
routes.get('/points/',pointsController.index);
routes.get('/points/:id',pointsController.show);

export default routes;