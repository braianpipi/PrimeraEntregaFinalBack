import fs from "fs";

export default class ApiProductos {
  constructor(rutaBDProducts) {
    this.rutaBDProducts = __dirname + rutaBDProducts;
  }
  async leer() {
    const data = await fs.promises.readFile(this.rutaBDProducts, "utf-8");
    // console.log("data:",data)
    const dataJson = JSON.parse(data);
    // console.log("dataJson:", dataJson)
    return dataJson;
  }

  async findAll() {
    try {
        let todos = await this.leer();
        return (todos);
      } catch (error) {
        console.log('error :',error)
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
  async modById(id, price, title, description, code, thumbnail){
    try {
      const todos = await this.findAll();
      this.deleteById(id)
      objeto={
        id: id,
        title: title,
        description: description,
        price: price,
        timestamp: 132,
        code: code,
        stock: stock,
        thumbnail: thumbnail
      }
      todos.push(objeto);
      await fs.promises.writeFile(this.rutaBDProducts, `${JSON.stringify(todos)}`);
    } catch (error) {
      
    }
  }
  async createProduct(objeto) {
    try {
      let informacion = await this.leer();
      let idUltimo = informacion.map((producto) => producto.id);
      let idAsignado = Math.max(...idUltimo);
      idAsignado++;
      objeto = {
        id: idAsignado,
        title: objeto.title,
        price: objeto.price,
        timestamp: 123,
        description: objeto.description,
        code: objeto.code,
        stock: objeto.stock,
        thumbnail: objeto.thumbnail,
      };
      informacion.push(objeto);
      await fs.promises.writeFile(this.rutaBDProducts, `${JSON.stringify(informacion)}`);
      return `El id asignado a tu producto es ${idAsignado}`;
    } catch (error) {
      console.log("error", error);
    }
  }
  async deleteById(idEliminar) {
    try {
      let informacion = await this.leer();
      let objetoEliminar = informacion.filter(
        (informacion) => informacion.id !== idEliminar
      );
      await fs.promises.writeFile(
        this.rutaBDProducts,
        `${JSON.stringify(objetoEliminar)}`
      );
      console.log(objetoEliminar)
      return objetoEliminar;
    } catch (error) {
      console.log("error", error);
    }
  }
}
