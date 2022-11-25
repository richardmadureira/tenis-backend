import express from 'express';
import TenistaController from './controllers/TenistaController';

const routes = express.Router();

routes.get('/', async (req, res) => {
    return res.json({ message: "Hello World" });
});

//TenistaController
routes.get('/tenistas/:id', TenistaController.findById);

export default routes;