
import mysql from 'mysql2/promise';


export async function connectToDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'my_user',
        password: process.env.MYSQL_PASSWORD || 'my_password',
        database: process.env.MYSQL_DATABASE || 'escala_database',
    });
    return connection;
}