import fs from "fs";
export default class ApiCarrito {
  constructor(rutaBDCart) {
    this.rutaBDCart = __dirname + rutaBDCart;
  }
  // getNow = () => {
  //     const now = new Date();
  //     return `${now.getHours()}:${now.getMinutes()}`;
  //   };

  async leer() {
    const data = await fs.promises.readFile(this.rutaBDCart, "utf-8");
    // console.log("data:",data)
    const dataJson = JSON.parse(data);
    // console.log("dataJson:", dataJson)
    return dataJson;
  }
  async findAll() {
    try {
      let todos = await this.leer();
      return todos;
    } catch (error) {
      console.log("error :", error);
    }
  }
  async createCart() {
    try {
      let informacion = await this.leer();
      let idUltimo = informacion.map((carrito) => carrito.id);
      let idAsignado = Math.max(...idUltimo);
      idAsignado++;
      let objeto = {
        id: idAsignado,
        timestamp: 132,
        products: [],
      };
      informacion.push(objeto);
      await fs.promises.writeFile(
        this.rutaBDCart,
        `${JSON.stringify(informacion)}`
      );
      return `El id asignado a tu carrito es ${idAsignado}`;
    } catch (error) {
      console.log("error", error);
    }
  }
  async findbyId(id) {
    try {
      const todos = await this.findAll();
      const resultado = todos.find((e) => e.id == id);

      return resultado;
    } catch (error) {
      console.log("error", error);
    }
  }
  async deleteById(idEliminar) {
    try {
      let informacion = await this.leer();
      let objetoEliminar = informacion.filter(
        (informacion) => informacion.id != idEliminar
      );
      console.log(objetoEliminar);
      await fs.promises.writeFile(
        this.rutaBDCart,
        `${JSON.stringify(objetoEliminar)}`
      );
      return objetoEliminar;
    } catch (error) {
      console.log("error", error);
    }
  }
  async productsOfCart(id) {
    try {
      let carrito = await this.findbyId(id);
      let contiene = carrito.products.map((producto) => producto.title);
      return `contiene los productos: ${contiene}`;
    } catch (error) {
      console.log("error", error);
    }
  }
  async productAddToCart(obj, id) {
    try {
      let cartSearch = await this.findbyId(id);

      cartSearch.products.push(obj);

      await this.deleteById(id);
      let newCart = await this.findAll();
      newCart.push(cartSearch);

      await fs.promises.writeFile(
        this.rutaBDCart,
        `${JSON.stringify(newCart)}`
      );
      return `Productos agregados con exito`;
    } catch (error) {
      console.log("error", error);
    }
  }
  async delProductOfCart(id1, id2) {
    try {
      let cartSearch = await this.findbyId(id1);
      console.log(cartSearch);
      cartSearch.products = cartSearch.products.filter((e) => e.id != id2);
      await this.deleteById(id1);
      let newCart = await this.findAll();
      newCart.push(cartSearch);
      console.log(newCart);
      await fs.promises.writeFile(
        this.rutaBDCart,
        `${JSON.stringify(newCart)}`
      );
      return "eliminado con exito";
    } catch (error) {
      console.log("error", error);
    }
  }
}
