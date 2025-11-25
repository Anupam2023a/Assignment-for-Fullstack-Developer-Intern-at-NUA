const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', //your mysql  password 
    database: 'user_management'
};

const createConnection = () => mysql.createConnection(dbConfig);

const initializeDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
        });

        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        console.log('Database created or already exists');
        await connection.end();

        //  users table
        const dbConnection = await createConnection();
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                uuid VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;

        await dbConnection.execute(createTableQuery);
        console.log('Users table created or already exists');
        await dbConnection.end();
        
    } catch (error) {
        console.error('Database initialization error:', error);
    }
};

module.exports = { createConnection, initializeDatabase };