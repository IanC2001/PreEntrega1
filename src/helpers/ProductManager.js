const fs = require('fs')
const ListProducts = require('./ListProducts')

class ProductManager {
    constructor(path) {
        this.path = path
    }

    getContentFile = async () => {
        let content = ""
        try {
            content = await fs.promises.readFile(this.path, 'utf-8')
        } catch (error) {
            return false
        }

        if (content === '') {
            return false
        }

        return content
    }

   
    setContentFile = async content => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(content, null, 4))
        } catch (error) {
            return false
        }
        return true
    }


    getAllProducts = async () => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        return products.getList()
    }

   
    getProducts = async nProducts => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        return products.getElements(nProducts)
    }

    
    getProductById = async idProduct => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        return products.getElementById(idProduct)
    }

 
    addProduct = async data => {
        const content = await this.getContentFile()
        const products = new ListProducts()

        if (content !== false) {
            products.setList(content)
        }

        if (products.addElement(data)) {
            return await this.setContentFile(products.getList())
        }

        return false
    }

    
    updateProductById = async (idProduct, dataUpdate) => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        const isUpdated = products.updateElementById(idProduct, dataUpdate)
        const isRegistered = await this.setContentFile(products.getList())

        if (Array.isArray(isUpdated) && isRegistered) {
            return isUpdated
        }

        return false
    }

   
    deleteProductById = async idProduct => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        if (!(products.deleteElementById(idProduct) < 0)) {
            return await this.setContentFile(products.getList())
        }

        return false
    }

}

module.exports = ProductManager