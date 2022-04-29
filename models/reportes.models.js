const mongoose = require('mongoose');

//schema de usuarios
const reportes = new mongoose.Schema({

    nombres:{
        type:String,
        required:true
    },
    dato:{
        type:String,
        required:true
    },

    fecha:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Reportes', reportes)