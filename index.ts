import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();

//bodyParser = Toma lo que venga y lo convierte en un objeto de js

server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//permito que cualquier persona pueda usar los servicios (por ejemplo si el front está en un hosting distinto al back)
server.app.use(cors({origin: true, credentials: true }));

//Rutas de servicios
server.app.use('/', router);

server.start(()=>{console.log(`Servidor corriendo en el puerto ${server.port}`)});