//Paquete Mongoose
const mongoose = require('mongoose');

//Definir el esquema(estructura que tendra nuestra coleccion)

let esquemaReserva = new mongoose.Schema({

    nombre: {
        type: String,
        required:[true, 'El nombre es necesario para esta reserva']
    },
    apellido:{
        type: String,
        required:[true, 'El apellido es necesario para la reserva']
    },
    telefono:{
        type: Number,
        required: [true, 'El telefono es necesario para la reserva']
    },
    fechaInicioReserva:{
        type: String,
        required: [true, 'La Fecha se requiere']
    },
    fechaFinReserva:{
        type: String,
        required: [true, 'La Fecha se requiere']
    },
    numeroPersonas:{
        type: Number,
        required: [true, 'La Fecha se requiere']
    },
    tipoPaquete:{
        type: String,
        required: [true, 'Se requiere el tipo de paquete']
    }


});

module.exports=mongoose.model('modeloReserva', esquemaReserva )