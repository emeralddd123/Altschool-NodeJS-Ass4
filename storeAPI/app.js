const express = require('express')
const bodyParser = require('body-parser')

const productRouter = require('./product/routes')
const userRouter = require('./user/routes')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/product', productRouter)
app.use('/user', userRouter)

app.get('/test', (req, res) => {
    res.json(req.headers)
})


app.listen(port, () => console.log(`Server listening on port ${port}!`))