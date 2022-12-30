import express from 'express';
import morgan from 'morgan';
import { RegisterRoutes } from './routes';

export class Application {

  readonly expressInstance: express.Application;

  constructor() {
    this.expressInstance = express();
    this.expressInstance.use(
      express.json(),
      morgan('dev')
    );
    this.expressInstance.get('/ping', (req, res) => {
      return res.status(200).send('pong');
    })
    RegisterRoutes(this.expressInstance);
  }

  get instance() {
    return this.expressInstance;
  }
}
