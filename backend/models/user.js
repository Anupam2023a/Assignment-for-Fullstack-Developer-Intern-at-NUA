 const { createConnection } = require('../config/database');
 class User {
 static async createTable() {
 
 }
 static async create(userData) {
 const connection = await createConnection();
 const query = `
 INSERT INTO users (uuid, name, email, city) 
VALUES (?, ?, ?, ?)
 `;
 const values = [userData.uuid, userData.name, userData.email, userData.city];
 try {
 const [result] = await connection.execute(query, values);
 return result;
 } finally {
 await connection.end();
 }
 }
 static async findAll() {
 const connection = await createConnection();
 const query = 'SELECT * FROM users ORDER BY name';
 try {
 const [rows] = await connection.execute(query);
 return rows;
 } finally {
 await connection.end();
}
 }
 static async findByUuid(uuid) {
 const connection = await createConnection();
 const query = 'SELECT * FROM users WHERE uuid = ?';
 try {
 const [rows] = await connection.execute(query, [uuid]);
 return rows[0];
 } finally {
 await connection.end();
 }
 }
 static async update(uuid, userData) {
 const connection = await createConnection();
 const query = 'UPDATE users SET name = ?, email = ?, city = ? WHERE uuid = ?';
 const values = [userData.name, userData.email, userData.city, uuid];
 try {
 const [result] = await connection.execute(query, values);
 return result;
 } finally {
 await connection.end();
 }
 }
 static async count() {
 const connection = await createConnection();
 const query = 'SELECT COUNT(*) as count FROM users';
 try {
 const [rows] = await connection.execute(query);
 return rows[0].count;
 } finally {
 await connection.end();
 }
 }
 }
 module.exports = User;