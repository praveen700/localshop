const PORT = process.env.PORT || 3000

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'devuser'
const DB_PASSWORD = process.env.DB_PASSWORD || 'Praveen@6470'
const DB_NAME = process.env.DB_NAME || 'ecommerace'
const DB_PORT = process.env.DB_PORT || 3306

module.exports ={
    DB_HOST,
    DB_HOST,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    PORT,
    DB_USER
}