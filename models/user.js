const sql = require('../config/db')

class User {
    constructor(){
        console.log("User instance created")
       async function createTable(){
          try {
            await sql `
            CREATE TABLE IF NOT EXISTS users_demo (
            email VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            profile VARCHAR(500),
            PRIMARY KEY (email) 
            );`

          } catch (error) {
            console.log("Error in creation of Table", error)
          }
        }

        createTable();
    }

    async create(email, username, hashPassword) {
       try {
         await sql `INSERT INTO users_demo(EMAIL, USERNAME, PASSWORD) VALUES (${email}, ${username}, ${hashPassword})`;
         return 
       } catch (error) {
          console.log("User registration Error :", error)
          throw "User registration Error"
       }
    }

    async find(username){
        try {
           const result = await sql `SELECT * FROM users_demo WHERE USERNAME = ${username}`;
           return result
        } catch (error) {
            console.log("Failed to find user :", error)
            throw "Failed to find user"
        }
    }

    async profile(username){
        try {
            const result = await sql `SELECT profile FROM users_demo WHERE USERNAME = ${username}`;
            return result
        } catch (error) {
            console.log("Fetching profile error :", error)
            throw "fetching profile error"
        }
    }
}

module.exports = new User()