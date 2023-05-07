import express from 'express'
import UserController from './app/controllers/UserController';

const routes = express.Router();

routes.post('/login', UserController.login);

routes.post('/register', UserController.store);

routes.post('/consulta', UserController.consulta);

module.exports = routes;