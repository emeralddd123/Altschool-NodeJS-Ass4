const controller = require('./controller')
const utils = require('./utils')

const userDb = controller.userDb



const validUserCreation = (req, res, next) => {
    const { error, value } = utils.userSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error)
    } else {
        req.body = value
    }

    next()
}

const authenticate = (req, res, next) => {
    let authHeader = req.headers.authorization
    let apikey = req.headers.apikey
    if (authHeader && authHeader.startsWith('Basic ')) {
        //Basic authentication stuffs
        const base64Credentials = authHeader.split(' ')[1]
        const decodedCredentials = atob(base64Credentials) // Decoding base64
        const [username, password] = decodedCredentials.split(':')
        const user = userDb.find((user) => {
            return user.username === username

        })
        if (!user) {
            console.log('Invalid Username')
            return res.status(401).json({ error: `Invalid Authentication Credentials` })
        }
        if (user.password !== password) {
            console.log('Password no match')
            return res.status(401).json({ error: `Invalid Authentication Credentials` })

        }
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;
        req.user = userWithoutPassword;    //will be useful to check for role

    } else if (apikey) {
        const apiKeyExists = controller.apiKeyDb.find((apiKeyObj) => {
            return apiKeyObj.apikey === apikey
        })
        if (apiKeyExists) {
            const user = userDb.find((user) => {
                return user.username === apiKeyExists.username
            })
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;
            req.user = userWithoutPassword;

        } else {
            return res.status(401).json("Invalid or expired apikey")
        }
    } else {
        res.status(401).json({ message: 'Authentication is not provided' })
        return
    }
    next()
}

const isRoleUser = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(403).json({ error: "Only user with Role=user is allowed to perform this action" })

    }

    next()
}

const isRoleAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Only admins are allowed to perform this action" })

    }

    next()
}


module.exports = { validUserCreation, isRoleUser, isRoleAdmin, authenticate }
