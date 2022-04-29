const  express = require('express')
const  mongoose  = require('mongoose')
const app = express()
const config = require('config');
const port = 3000
const cors = require('cors');



///rutas

const rutas = require('./routers/rutas');
const auth = require('./auth/auth');

// millwared para recibir datos json y por url
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors())


app.use('/api/rfc',rutas);
app.use('/api/auth',auth);
//conexion a base de datos

mongoose.connect(config.get('configDB.HOST'),{useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Api Conectado a la base de datos con éxito');})
    .catch(error=>{
        console.log('Error al conectarse a la base de datos', error);
    });

app.listen(port, () => console.log(`ejecutando api ${port}!`))