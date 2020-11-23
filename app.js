/*-----Express-------*/
const express = require('express')
const app = express()


// ----Inclusion peticions Bodyparser-----

const bodyParser = require('body-parser')
// var app = express() esto no va
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//underscore
let under = require('underscore');


const mongoose = require('mongoose');

app.use(require('./controladoresReserva'))


// Establecemos la conexion con la DB

mongoose.connect('mongodb://localhost:27017/hotel-espacial', {
  
  useUnifiedTopology: true,
  useNewUrlParser: true       //Banderas

});

mongoose.connection
   .once('open', ()=> console.log("Estamos conectados a la BD"))
   .once('error', (error)=>console.log(error))



// Establecemos la conexion con el servidor que tiene los servicios

app.listen(3000, ()=>{
    console.log("El servidor del del hotel esta listo para hacer las reservas.")
})




/*
1. instalar: npm init al proyecto
2. instalar: express npm install express
3. agregar el codgio

const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.listen(3000)

3.1 crear un "endpoint": (/reservas)

  app.put('/reservas/:id', function (peticion, respuesta)

})
 
3.2 poner un mensaje de que esta funcionando el servidor:

    app.listen(3000, ()=>{
    console.log("El servidor del del hotel esta listo para hacer las reservas.")
    })

3.3 converir en formato JSON -> send por el JSON: 

  respuesta.json('Soy un put y voy a editar la reserva: ' + idenficador)
  })




4. ejecutar nodemon app.js
5. llamar get post put delete
6. variable con la peticion:  let idenficador = peticion.params.id;
7. instalar bodyparser npm {

    Inatalador: $ npm install body-parser
    Inclusion: var bodyParser = require('body-parser')
}


8. crear los avisos de error {
        let datos = peticion.body

    if(datos.nombre==undefined){
        
        respuesta.status(400).json({
            mensaje:"El parametro nombre es necesario"
        })
        
    }else{
        
        respuesta.json({jugador: datos})
    }
} 

9. crear la base de datos GESTOR DE BASE DE DATOS NO-REALCIONAL {

}

*/