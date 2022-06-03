import { Router } from "express";
import ApiProductos from "../apiClassProductos";
const router = Router();
const products = new ApiProductos('/dataBase/productos.json')






export default router;