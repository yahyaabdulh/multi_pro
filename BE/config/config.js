const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_DEVELOPMENT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            multipleStatements: true
        },
        timezone: "Asia/Jakarta",
        pool: {
            max: 5,
            min: 0,
            acquire: 20000,
            idle: 10000
        }
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_DEVELOPMENT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            multipleStatements: true
        },
        timezone: "Asia/Jakarta",
        pool: {
            max: 5,
            min: 0,
            acquire: 20000,
            idle: 10000
        }
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_DEVELOPMENT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            multipleStatements: true
        },
        timezone: "Asia/Jakarta",
        pool: {
            max: 5,
            min: 0,
            acquire: 20000,
            idle: 10000
        }
    }
}