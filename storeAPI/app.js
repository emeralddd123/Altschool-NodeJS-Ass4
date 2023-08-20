const express = require('express')
const bodyParser = require('body-parser')

const productRouter = require('./product/routes')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use('/product', productRouter)


app.listen(port, () => console.log(`Server listening on port ${port}!`))