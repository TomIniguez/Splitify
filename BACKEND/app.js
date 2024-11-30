// Importación de módulos
const express = require('express');
const cookieParser = require('cookie-parser');
const bluebird = require('bluebird');
const cors = require('cors');
const mongoose = require('mongoose');

// Importar rutas
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

// Instanciar el servidor
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Configuración de rutas
app.use('/api', apiRouter);
app.use('/', indexRouter);

// Configuración del entorno
if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}

//Database connection --
mongoose.Promise = bluebird;
let url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`
console.log("BD",url);
let opts = {
  useNewUrlParser : true, 
  connectTimeoutMS:20000, 
  useUnifiedTopology: true
  };

mongoose.connect(url,opts)
  .then(() => {
    console.log(`Succesfully Connected to theMongodb Database..`)
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database...`);
    console.log(e)
  })


// Setup server port
var port = process.env.PORT || 8080;
// Escuchar en el puerto
app.listen(port,()=>{
    console.log('Servidor de ABM Users iniciado en el puerto ',port);
});


module.exports = app;