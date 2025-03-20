import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { PowerOffIcon } from 'lucide-react';

dotenv.config(); // Load environment variables

// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_NAME:', process.env.DB_NAME);

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function getProjects(name) {
    try {
        const [projects] = await pool.execute(`
            SELECT * FROM Projects   
            WHERE company_name = ? 
        `, [name])

        // console.log("result of getprojects query: ", projects)
        return projects
    } catch (error) {
        console.error(error)
    }
}

async function signIn(name) {
  try {
    const [result] = await pool.execute(`
      SELECT * FROM Users
      WHERE name = ?
    `, [name])

    console.log("result of siging in ", result)
    return result
  } catch (e) {
    console.error(e)
  }
}

// Function to execute queries
async function get(sql, params) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// export default pool;

export { getProjects, signIn };