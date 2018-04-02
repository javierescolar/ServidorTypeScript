import * as express from 'express';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import ClientController from './controllers/ClientController';
import LicenseController from './controllers/LicenseController';
import * as auth from './middlewares/AuthenticateMiddleware';
import * as admin from './middlewares/AdminMiddleware';

export const routes = express.Router();

//rutas de pruebas
routes.get('/dos',[auth.authenticate,admin.isAdmin], (req, res) => {
  res.json({
    message: 'Hello World dosssss!'
  });
});

//MIDDLEWARES PARA LAS RUTAS
//routes.all('/users',auth.authenticate);

//URLs DE LA APLICACION
routes.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  })
});
//rutas de login
routes.post('/login',AuthController.login);
//rutas usuarios
routes.route('/users')
  .get(UserController.all)
  .post(UserController.store);
routes.route('/users/:id')
  .get(UserController.find)
  .put(UserController.update)
  .delete(UserController.delete);
//rutas clientes
routes.route('/clients')
  .get(ClientController.all)
  .post(ClientController.store);
routes.route('/clients/:id')
  .get(ClientController.find)
  .put(ClientController.update)
  //rutas usuarios
routes.route('/licenses')
  .get(LicenseController.all)
  .post(LicenseController.store);
routes.route('/licenses/:id')
  .get(LicenseController.find)
  .put(LicenseController.update);
