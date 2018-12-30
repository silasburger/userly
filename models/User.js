const db = require("../db");
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');
const OPTIONS = { expiresIn: 60 * 60 };

class User {
  static async login({username, password}) {
    const res = await db.query(`
      SELECT password
      FROM users
      WHERE username=$1
    `, [username]);
    const user = res.rows[0];
    if(user) {
      if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({username}, SECRET, OPTIONS);
        return { token };
      }
    }
    return { message: 'Invalid Credential' };
  }

  static async create({username, password, first_name, last_name, email, photo_url}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await db.query(`
      INSERT INTO users 
      (username, password, first_name, last_name, email, photo_url)
      VALUES 
      ($1, $2, $3, $4, $5, $6)
      RETURNING username, first_name, last_name, email
    `, [username, hashedPassword, first_name, last_name, email, photo_url]);
    return res.rows;
  }

  static async getAll() {
    const res = await db.query(
      `SELECT username, first_name, last_name, email, photo_url 
      FROM users`
    );
    return res.rows;
  }

  static async get(username) {
    const res = await db.query(`
      SELECT username, first_name, last_name, email, photo_url 
      FROM users
      WHERE username=$1
      `, [username]);
    return res.rows[0];
  }
}

module.exports = User;