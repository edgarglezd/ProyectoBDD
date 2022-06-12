const express = require('express');
const path = require('path');
const app = express();
const initDB = require('./db')
const path_ = require('path');
const morgan = require('morgan');
//const fileUpload = require('express-fileupload'); //para subir archivos al servidor;

//Configuraciones -Settings
app.set('port',4000); //Definiendo la variable para asignar el puerto
app.set('../views', path_.join(__dirname,'../views')); //Toma las rutas de las vistas para mostrarlas
//app.engine('html', require('ejs').renderFile); //indica que las vistas html seran tomadas y procesadas por ejs
app.set('view engine', 'ejs'); //indica que motor de vistas se usaran en el proyecto

//middlewares - funciones antes de que las rutas procesen algo
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));//Traduccion de formularios JSON
//app.use(fileUpload());

//routes - ruta
app.use(require('../routes/index'));

//static files - archivos estaticos
app.use('/css', express.static(path.join(__dirname,'../public/css'))); //indica los elementos como css, imagenes que se utilizaran en el sitio
app.use('/img', express.static(path.join(__dirname,'../public/img')));
app.use('/js', express.static(path.join(__dirname,'../js')));

//listening the server - escuchando el servidor
app.listen(app.get('port'), () => { //Configura eñ puerto en el que se alojara la pagina
    console.log("Server on port ", app.get('port'));
});

/*//404 handler
app.use( (req, res, next) => {
    res.status(404).send("Recurso no enontrado");
});
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://abcdefgh:abcdefgh@cluster0.tciwr.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("NETFLIX");
  dbo.collection("BDD").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
*/
//initDB();
module.exports = app;