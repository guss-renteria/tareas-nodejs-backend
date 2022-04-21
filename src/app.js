import express from 'express';
import cors from 'cors';

// ? middlewares
import ErrorMiddleware from './middlewares/error.middleware';

// ? rutas
import { routes as product_routes } from './routes/task.routes';

// * cargar 'app'
const app = express();

// ? cargar middlewares en 'app'
app.use(express.json());
app.use(cors());

// ? agregar rutas
app.use(product_routes);

// ? middlewares de error
app.use(ErrorMiddleware);

export default app;
