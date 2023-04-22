const fs = require('fs')
const ListCarts = require('./ListCarts')

class CartManager {
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

   
    getCartById = async idCart => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const carts = new ListCarts()
        carts.setList(content)

        return carts.getElementById(idCart)
    }

  
    addCart = async () => {
        const content = await this.getContentFile()
        const carts = new ListCarts()

        if (content !== false) {
            carts.setList(content)
        }

        if (carts.addElement()) {
            return await this.setContentFile(carts.getList())
        }

        return false
    }

 
            
    addProductToCart = async (idCart, idProduct) => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const carts = new ListCarts()
        carts.setList(content)
        if (carts.addElementByIds(idCart, idProduct)) {
            return await this.setContentFile(carts.getList())
        }

        return false
    }
}

module.exports = CartManager