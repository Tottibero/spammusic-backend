//Utilizamos dotenv para las variables de entorno que llamaremos con el process.env y que estan almacenadas en el .env de la raíz.
require('dotenv').config();

const express = require('express');
const cors = require('cors');


//Base de datos que cogemos del archivo config.js de la carpeta database
const { dbConnection } = require('./database/config');

//Crear el servidor express
const app = express();

//Configruar CORS
app.use(cors());

//Lectura y parseo del Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Llamamos a la función para conectarnos a la base de datos
dbConnection();

//Rutas

const userRoutes = require('./routes/users');
app.use('/api/user', userRoutes);

const loginRoutes = require('./routes/auth');
app.use('/api/login', loginRoutes);

const genreRoutes = require('./routes/genres');
app.use('/api/genre', genreRoutes);

const artistRoutes = require('./routes/artists');
app.use('/api/artist', artistRoutes);

const discRoutes = require('./routes/discs');
app.use('/api/disc', discRoutes);

const searchRoutes = require('./routes/search');
app.use('/api/search', searchRoutes);

const uploadRoutes = require('./routes/uploads');
app.use('/api/upload', uploadRoutes);



//Abrimos la conexión con el puerto de .ENV
app.listen(process.env.PORT, () =>{
    console.log('Server running in ' + process.env.PORT);
});