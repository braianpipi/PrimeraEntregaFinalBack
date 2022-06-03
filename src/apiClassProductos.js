import fs from 'fs'

export default class ApiProductos{
    constructor(rutaBDProducts){
        this.rutaBDProducts = __dirname + rutaBDProducts
    }
    async findAll(){
        try{
           const todos = await fs.promises.readFile(this.rutaBDProducts, 'utf-8')
            return JSON.parse(todos)
        }catch(error){
            throw new Error(`Error: ${error}`)
        }
    }
}