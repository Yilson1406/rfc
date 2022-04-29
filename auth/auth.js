const express = require('express');
const jwt = require('jsonwebtoken');
const rutas = express.Router();
const config = require('config');
const Usuario = require('../models/usuario.model');
const Administrador = require('../models/admin.models')
const bcrypt = require('bcrypt');

rutas.post('/',(req, res)=>{

    Administrador.findOne({email:req.body.email}).then(user=>{
        if (user) {
            const validarpassword = bcrypt.compareSync(req.body.password, user.password);

            if (!validarpassword) res.status(400).json({Error:'OK',Mensaje:'El usuario o contraseña son incorrectas'});

            const jsontoken = jwt.sign({
                usuario:{
                    id: user._id,
                    Nombres: user.nombres,
                    Email:user.email,
                }}, config.get('configToken.SEED'), {expiresIn: config.get('configToken.expiration')});

                    res.json( 
                        {
                        Token:jsontoken
                        })

        }else {
              res.status(400).json({
                  Error: 'OK',
                  Mensaje: 'El usuario o contraseña son incorrectas'
              })  
        }
    }).catch(error =>{
        res.status(400).json(error)
    })

});

rutas.post('/register',(req, res)=>{

    Usuario.findOne({cedula:req.body.cedula}).then(user=>{
        if (!user) {
            adduser(req.body)
            .then(dato=>{
                res.status(200).json({
                    res:dato,
                    msg:'Usuario Agregado con Exito'
                });
            }).catch(error=>{
                res.status(400).json({
                    res:error,
                    msg:'Ubo un problema al agregar el nuevo Usuario'
                });
            })
        }else {

              res.status(400).json({
                  Error: 'OK',
                  Mensaje: 'El numero de cedula del usuario ya esta registrado'
              })  
        }
    }).catch(error =>{
        res.status(400).json(error)
    })

});

rutas.post('/register/admin',(req, res)=>{

    Administrador.findOne({cedula:req.body.cedula}).then(user=>{
        if (!user) {
            addadmin(req.body)
            .then(dato=>{
                res.status(200).json({
                    res:dato,
                    msg:'Usuario Agregado con Exito'
                });
            }).catch(error=>{
                res.status(400).json({
                    res:error,
                    msg:'Ubo un problema al agregar el nuevo Usuario'
                });
            })
        }else {

              res.status(400).json({
                  Error: 'OK',
                  Mensaje: 'El numero de cedula del usuario ya esta registrado'
              })  
        }
    }).catch(error =>{
        res.status(400).json(error)
    })

});

//registrar new user
async function adduser(body){
    // return body
    let user = new Usuario({
        nombres:body.nombres,
        cedula:body.cedula,
        email:body.email,
        codigo:body.codigo

    });
    
    // return await sensor;
    return await user.save();
}

//registrar new admin
async function addadmin(body){
    // return body
    let admin = new Administrador({
        nombres:body.nombres,
        cedula:body.cedula,
        email:body.email,
        password:bcrypt.hashSync(body.password, 10)

    });
    
    // return await sensor;
    return await admin.save();
}
module.exports = rutas;