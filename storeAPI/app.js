const express = require('express')
const bodyParser = require('body-parser')

const productRouter = require('./product/routes')
const userRouter = require('./user/routes')

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.json())


app.use('/product', productRouter)
app.use('/user', userRouter)

//for handling 404
app.use((req, res, next) => {
    res.status(404).send("<h1>Resource Not Found</h1>")  })

app.listen(port, () => console.log(`Server listening on port ${port}!`))