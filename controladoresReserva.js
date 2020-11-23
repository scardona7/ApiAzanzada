/*-----Express-------*/
const express = require('express')
const app = express()


// ----Inclusion peticions Bodyparser (pa enviar datos)-----

const bodyParser = require('body-parser')
// var app = express() esto no va
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Paquete del modelo reserva (importar el esquema desde el modelo)
const ReservaModelo = require('./modeloReserva')

//Paquete underscore

let under = require('underscore');
 



// ----Cuerpo---

app.get('/reservas/:id', function (peticion, respuesta) {

    //1. Recibir el id del documento a buscar en la coleccion
    let identificador = peticion.params.id

    //2. Ejecutar la operacion de mongoose para buscar un documento por id
    ReservaModelo.findById(identificador, (err, resultado)=>{

        if(err){

            respuesta.status(400).json({
                mensaje:err,
                estado:false
            })

        }else{

            respuesta.json({
                reserva:resultado
            })

        }
    })
})

app.post('/reservas', function(peticion, respuesta) {
  
    //1. se traen los datos desde un cliente
    let datos = peticion.body;

    //2. armar un objeto acorde a mi esquema
    let reservaGuardar= new ReservaModelo({

        nombre: datos.nombre,
        apellido:datos.apellido,
        telefono:datos.telefono,
        fechaInicioReserva:datos.fechaInicioReserva,
        fechaFinReserva:datos.fechaFinReserva,
        numeroPersonas:datos.numeroPersonas,
        tipoPaquete:datos.tipoPaquete

    })


    //3. Guarde los datos
    reservaGuardar.save((err, resultado)=> {

        if (err){
            respuesta.status(400).json({
                mensaje: err,
                estado: false
            })
        }else{
            
            respuesta.json({
                mensaje: 'La reserva fue Exitosa'

            })
        }
    }) 

});



app.put('/reservas/:id', function (peticion, respuesta) {
  
    //1.Recibir ls datos que voy a actualizar
  let datos = peticion.body
    //2. filtrar los datos con underScore(_)
  let datosActualizados = under.pick(datos, ['nombre', 'apellido', 'telefono', 'fechaInicioReserva', 'fechaFinReserva', 'numeroPersonas', 'tipoPaquete'])
    //3. Recibir el id o identificador del documentos a actualiar
  let identificador = peticion.params.id
    //4. ejecutar la operacion para actualizar datos (1. id a actualizar 2. datos a actualizar 3. callback para manejo error)
    ReservaModelo.findByIdAndUpdate(identificador, datosActualizados, (err, resultado)=>{

        if(err){

            respuesta.status(400).json({
                mensaje: err,
                estado: false
            })

        }else{
            respuesta.json({
                mensaje: 'Reserva editada con exito',
                respuesta: resultado
            })
        }
    })

})




app.delete('/reservas/:id', function (peticion, respuesta) {
  
    //1. Recibir el id del documento a eliminar
    let idenficador = peticion.params.id;

    //2. ejecuar la funcion de mongoos para eliminar un documento
    ReservaModelo.findByIdAndRemove(idenficador, (err, resultado)=> {

        if(err){

            respuesta.status(400).json({
                mensaje: err,
                estado: false
            })

        }else{

            respuesta.json({
                mensaje: "Reserva eliminada con Exito de la DB"
            })
        }
    })
})

module.exports=app;
 