const CartManager = require('./../helpers/CartManager')


const getProductsCartFromServer = async (req, res) => {
    res.send('GET one /carts')
}


const addCartOnServer = async (req, res) => {
    res.send('POST one /carts')
}


const addProductCartOnServer = async (req, res) => {
    res.send('POST one product on cart /carts')
}

module.exports = {getProductsCartFromServer, addCartOnServer, addProductCartOnServer}