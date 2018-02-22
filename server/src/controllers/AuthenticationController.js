const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, 'superSecret',{
    expiresIn: ONE_WEEK
  })
}
module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      console.log("no ")
      res.status(400).send({
        error: 'This Email account is already in use'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'cannot find this user'
        })
      }
      //here be aware why add await, it returns a promise
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'password incorrect'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        //jwtSignUser  gives me error!...no clue
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }
}