import { Router } from "express";
import ApiProductos from "../apiClassProductos";
// import { render } from "express/lib/response";
// import { render } from "ejs";
const router = Router();
const products = new ApiProductos("/dataBase/productos.json");
const isAdmin = true;

function adminOrClient(req, res, next) {
  if (!isAdmin) {
    res.send("No tienes acceso a esta ruta");
  } else {
    next();
  }
}

router.get("/", adminOrClient, async (req, res) => {
  let productsIndex = await products.findAll();

  // res.json(productsIndex)
  res.render("../views/index.ejs", { productsIndex });
});

router.get("/:id?", adminOrClient, async (req, res) => {
  const { id } = req.params;
  const mostrarProductos = await products.findbyId(id);
  if (mostrarProductos == undefined || id == undefined) {
    const allProducts = await products.findAll();
    res.json(allProducts);
  } else {
    res.json(mostrarProductos);
  }
});

router.put("/:id", adminOrClient, async (req, res) => {
  const id = req.params;
  const { price, title, description, code, thumbnail } = req.body;
  const product = await products.modById(
    price,
    title,
    description,
    code,
    thumbnail,
    id
  );
  res.json(product);
});

router.post("/", adminOrClient, async (req, res) => {
  const productAdd = req.body;
  const productNew = await products.createProduct(productAdd);
  res.json(productNew);
});

router.delete("/:id", adminOrClient, (req, res) => {
  const { id } = req.params;
  products.deleteById(id);
  res.json("Producto Eliminado");
});

export default router;
