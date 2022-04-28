import path from 'path';
import express from 'express';
import cors from 'cors';

// ? middlewares
import ErrorMiddleware from './middlewares/error.middleware';

// ? rutas
import { routes as product_routes } from './routes/task.routes';

// * cargar 'app'
const app = express();

// ? cargar middlewares en 'app'
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(cors());

// ? agregar rutas
app.get('/', function(req, res){
    var options = {
        root: path.join(__dirname)
    };
     
    var fileName = 'public/index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});
//
app.use(product_routes);

// ? middlewares de error
app.use(ErrorMiddleware);

export default app;
