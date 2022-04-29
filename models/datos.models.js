const mongoose = require('mongoose');

//schema de usuarios
const datos = new mongoose.Schema({

    nombres:{
        type:String,
        required:true
    },
    codigo:{
        type:String,
        required:true
    },

    fecha:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Datos', datos)