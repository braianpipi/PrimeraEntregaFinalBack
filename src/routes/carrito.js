import { Router } from "express";
import ApiCarrito from "../apiClassCarritos";
const cart = new ApiCarrito("/dataBase/carrito.json");

const router = Router();
const isAdmin = true

function adminOrClient(req,res,next){
    if(!isAdmin){
        res.send("No tienes acceso a esta ruta")
    } else {
        next()
    }
}

router.post('/', adminOrClient, async (req, res)=>{
    const newCart =  await cart.createCart()
    res.json(newCart)
})

router.delete('/:id', adminOrClient, async (req, res)=>{
    const {id}= req.params
    console.log(id)
    // console.log(id)
    const eliminado = await cart.deleteById(id)
    // console.log(eliminado, id )
    res.json(`Carrito eliminado con exito con el id: ${id} `)
})

router.get('/:id/productos', adminOrClient, async (req, res)=>{
    const {id}= req.params;
    const contenedor = await cart.findbyId(id)
    let contiene = contenedor.products.map((producto)=>producto.title);
    res.json(`Productos : ${contiene}`)
})

router.post('/:id/productos', adminOrClient, async (req, res)=>{
    const {products}= req.body;
    const {id}= req.params;
    const addProductsCart = await cart.productAddToCart(products, id)
    res.json(addProductsCart)
})

router.delete('/:id/productos/:id_prod', adminOrClient, async (req, res)=>{
    const {id1, id2}= req.params;
    const xCart = await cart.delProductOfCart(id1, id2)
    res.json(xCart)
})


export default router;