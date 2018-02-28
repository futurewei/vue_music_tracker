const path = require('path')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = {
  port: 8081,
  db: {
    database: process.env.DB_NAME || 'tabtracker',
    user: process.env.DB_USER || 'tabtracker',
    password: process.env.DB_PASS || 'tabtracker',
    options: {
        dialect: process.env.DIALECT || 'sqlite',
        host: process.env.HOST || 'localhost',
        storage: path.resolve(__dirname, '../../tabtracker.sqlite'),
        operatorsAliases: Op
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECREY || 'secret'
  }
}
