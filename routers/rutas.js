const express = require('express');
const ruta = express.Router();
const validartoken = require('../middlewares/auth');
const Datos = require('../models/datos.models')

ruta.post('/datos',(req, res)=>{

    // res.json(req.body)    

    adddato(req.body)
    .then(dato=>{
        res.json(dato)
    })
    .catch(error=>{
        res.json({
            mensaje:error
        })
    })

});

ruta.get('/datos',(req, res)=>{

    getdatos()
    .then(dato=>{
        res.json(dato)
    })
    .catch(error=>{
        res.json({
            error:error,
            mensaje:'Error al Obtener datos de sensores'
        })
    })


})



///////functions///////
//agregar new datos
async function adddato(body){
    // return body
    let datos = new Datos({
        nombres:body.nombres,
        codigo:body.codigo,
        fecha:body.fecha

    });
    
    // return await sensor;
    return await datos.save();
}

//consultar datos
async function getdatos(){
    let datos = await Datos.find()
    return datos;
}


module.exports = ruta; 