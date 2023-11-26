import mysql from mysql2

let dbHost = "127.0.0.1"
let dbUser = "root"
let dbPassword = ""
let dbName = ""

const pool = mysql.createPool({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName
}).promise()

