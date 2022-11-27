import express from 'express';
import DesafioController from './controllers/DesafioController';
import AvatarController from './controllers/AvatarController';
import TemporadaController from './controllers/TemporadaController';
import TenistaController from './controllers/TenistaController';
import TorneioController from './controllers/TorneioController';
import { multerUpload } from './utils/multer';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('<h1>Torneio API</h1>');
});

routes.post('/temporadas', TemporadaController.save);
routes.post('/temporadas/pesquisa', TemporadaController.findAll);
routes.get('/temporadas/:id', TemporadaController.findById);
routes.put('/temporadas/:id', TemporadaController.update);
routes.delete('/temporadas/:id', TemporadaController.deleteById);

routes.post('/tenistas', multerUpload.single('avatar'), TenistaController.save);
routes.post('/tenistas/pesquisa', TenistaController.findAll);
routes.get('/tenistas/:id', TenistaController.findById);
routes.put('/tenistas/:id', multerUpload.single('avatar'), TenistaController.update);
routes.delete('/tenistas/:id', TenistaController.deleteById);

routes.get('/avatars/:filename', AvatarController.obterAvatar);

routes.post('/desafios', DesafioController.save);
routes.post('/desafios/pesquisa', DesafioController.findAll);
routes.get('/desafios/:id', DesafioController.findById);
routes.put('/desafios/:id', DesafioController.update);
routes.delete('/desafios/:id', DesafioController.deleteById);

routes.post('/torneios', TorneioController.save);
routes.post('/torneios/pesquisa', TorneioController.findAll);
routes.get('/torneios/:id', TorneioController.findById);
routes.put('/torneios/:id', TorneioController.update);
routes.delete('/torneios/:id', TorneioController.deleteById);

export default routes;
