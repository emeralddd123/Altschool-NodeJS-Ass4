const fs = require('fs')
const path = require('path')

const utils = require('./utils')

const productDbPath = path.join(__dirname, ".", "products.json")
const productDb = JSON.parse(fs.readFileSync(productDbPath, "utf-8"))


const updateProductDb = () => {
    fs.writeFile(productDbPath, JSON.stringify(productDb), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
}

const getAllProduct = (req, res) => {
    res.json({ data: productDb })
}

const getProduct = (req, res) => {
    const id = req.params.id
    const productIndex = productDb.findIndex((product) => {
        return product.id == id
    })
    if (productIndex === -1) {
        res.status(404).send('Product with given id is not found on the server')
    } else {
        const product = productDb[productIndex]
        res.status(200).send(product)
    }

}

const createProduct = (req, res) => {

    const newProduct = req.body
    const lastProduct = productDb[productDb.length - 1]
    const lastProductId = lastProduct.id
    newProduct.sku = utils.generateSKU(newProduct.name)
    newProduct.id = lastProductId + 1;
    //save to db
    productDb.push(newProduct);
    updateProductDb()
    res.status(201).send(newProduct);

}

const editProduct = (req, res) => {
    const id = req.params.id
    const productIndex = productDb.findIndex((product) => {
        return product.id == id
    })
    if (productIndex === -1) {
        res.status(404).send('product with given id is not found on the server')
    } else {
        const editedProduct = req.body
        // update the product in the database
        productDb[productIndex] = { ...productDb[productIndex], ...editedProduct }
        updateProductDb()
        const product = productDb[productIndex]
        res.json(product)

    }
}

const deleteProduct = (req, res) => {
    const id = req.params.id
    const productIndex = productDb.findIndex((product) => {
        return product.id == id
    })
    if (productIndex === -1) {
        res.status(404).send('Product with given id is not found on the server')
    } else {
        productDb.splice(productIndex, 1)
        updateProductDb()
        res.status(200).send('Product has been deleted succesfully')
    }
}


module.exports = { getAllProduct, getProduct, createProduct, editProduct, deleteProduct }
