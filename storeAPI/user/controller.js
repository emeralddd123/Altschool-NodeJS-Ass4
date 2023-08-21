const fs = require('fs')
const path = require('path')

const utils = require('./utils')

const userDbPath = path.join(__dirname, ".", "users.json")
const userDb = JSON.parse(fs.readFileSync(userDbPath, "utf-8"))

const apiKeyDbPath = path.join(__dirname, ".", "apikeys.json")
const apiKeyDb = JSON.parse(fs.readFileSync(apiKeyDbPath, "utf-8"))


const updateuserDb = function () {
    fs.writeFile(userDbPath, JSON.stringify(userDb), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
}

const updateApiKeyDb = function () {
    fs.writeFile(apiKeyDbPath, JSON.stringify(apiKeyDb), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
}


const signUp = function (req, res) {
    const user = req.body
    const userExist = userDb.find((user) => {
        return user.username === user.username
    })
    if (userExist) {
        return res.status(409).json({ error: `Username is Already Taken` })
    }
    if (user.username === ('UsmanAbdulsalam' || 'DanielAdesoji')) {
        user.role = 'admin'
    } else {
        user.role = 'user'
    }

    userDb.push(user)
    updateuserDb()
    res.status(201).json('User created!')
}

const login = function (req, res) {
    const { error, value } = utils.userSchema.validate(req.body)
    if (error) {
        return res.status(400).json(error)
    } else {
        const username = value.username
        const password = value.password

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
        const loggedIn = apiKeyDb.find((apiKeyObj) => {
            return apiKeyObj.username === username
        })
        if (loggedIn) {
            return res.status(200).json({ message: `you've already been authenticated`, apikey: loggedIn.apikey })
        } else {
            let apikey = utils.generateKey(username)
            const apiKeyObj = { username: username, apikey: apikey }
            apiKeyDb.push(apiKeyObj)
            updateApiKeyDb()
            res.status(200).json({ message: 'Authentication succesful', apikey: apikey })
        }


    }
}

const getAllUser = function (req, res) {
    res.json(userDb)
}

const getMyInfo = function (req, res) {
    res.status(200).json({ data: req.user })
}

const logout = function (req, res) {
    const apikey = req.headers.apikey
    if (apikey) {
        const apiKeyIndex = apiKeyDb.findIndex((apiKeyObj) => {
            return apiKeyObj.apikey === apikey
        })
        console.log(apiKeyIndex)
        if (apiKeyIndex !== -1) {
            apiKeyDb.splice(apiKeyIndex, 1)
            updateApiKeyDb()

        }
    }
    res.status(200).json("logout sucesfully!!")
}


module.exports = { signUp, getAllUser, getMyInfo, login, logout, userDb, apiKeyDb }
