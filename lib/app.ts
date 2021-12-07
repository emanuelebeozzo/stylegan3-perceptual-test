import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import { CommonRoutes } from './common/routes/common.routes'
import { ImagesRoutes } from './routes/images.route';
import { UsersRoutes } from './routes/users.route';

dotenv.config();

//Get the port
/**Port on which the server will listen onto */
const port = process.env.PORT;

/**Express instance */
const app: Application = express();

/**Array containing all the routes */
const routes: CommonRoutes[] = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Exposing public folder
 */
app.use('/', express.static('frontend'));
app.use('/img', express.static('img')); //Nota: le immagini sono accessibili così http://localhost:8080/img/ffhq/0.png 

/**
 * Enabling CORS, respond to the OPTION HTTP verb
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, HEAD, POST, DELETE');
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  } else {
    return next();
  }
});

routes.push(new ImagesRoutes(app));
routes.push(new UsersRoutes(app));

/**
 * Configuring all the routes
 */
 app.listen(port, () => {
  console.log('Server running on port: ' + port)
  routes.forEach((route: CommonRoutes) => {
    console.log('Routes configured for ' + route.getName());
  });
});

/**
 * Default 404 handler
 */
 app.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: 'Not found' });
});

export default app;