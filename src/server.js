// >>Consigna: deberias entregar el estado de avance de tu aplicacion eCormmerce Backend, 
// que implemente un servidor de aplicacion basado en la plataforma Node.js y el modulo Express.
// El servidor implementara dos conjuntos de rutas agrupadas en routers, uno con una url base 
// '/prroductos' y el otro con '/carrito'. El puerto de escucha sera el 8080 para desarrollo y 
// process.en.PORT para produccion en glitch.com 
// <<Aspectos a incluir en el entregable: 
// 1. El router base '/api/productos' implementara cuatro funcionalidades:
//     a. GET:'/:id?' - Me permite listar todos los productos disponibles o un producto por su id (disponible para usuarios y administradores)
//     b. POST : '/'- Para incorporar productos al listado (disponible para administradores)
//     c. PUT : '/:id'-Actualiza un producto por su id(disponible para administradores)
//     d. DELETE : '/:id'- Borra un producto por su id(disponible para administradores)

import express from 'express'
import morgan from 'morgan'
import routesPruducts from './routes/productos'
import routesCart from './routes/carrito'
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/productos', routesPruducts)
app.use('/carrito', routesCart)


const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`Server listen on port : ${PORT}`)
})