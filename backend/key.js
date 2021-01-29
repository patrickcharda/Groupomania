require('dotenv').config();

const db = {
    login: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD
}
const dbKey = { 
    login: db.login,
    password: db.password
};
exports.dbKey = dbKey;

