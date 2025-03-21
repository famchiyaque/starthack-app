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

async function getProject(id) {
  try {
      const [projects] = await pool.execute(`
          SELECT * FROM Projects   
          WHERE id = ?
      `, [id])

      // console.log("result of getproject query: ", projects)
      return projects[0]
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

async function getCompanyId(name) {
  // console.log("name being passed to getCompanyId: ", name)

  try { 
    const [result] = await pool.execute(`
      SELECT id FROM Users
      WHERE name = ?  
    `, [name])

    return result[0].id
  } catch (error) {
    console.error(error)
  }
}

async function createProject(company_id, name, initiative, callToAction, image, category, endDate, benefits, tasks) {
  try {
    const query = `
      INSERT INTO projects 
        (company_id, company_name, initiative, call_to_action, image, categories, end_date, benefits, tasks, challenge, progress, links, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "", "0", "", NOW())
    `;

    const formattedEndDate = new Date(endDate).toISOString().slice(0, 19).replace('T', ' ');

    const values = [
      company_id, 
      name,
      initiative,
      callToAction,
      image,
      JSON.stringify(category), // Convert category array to JSON string
      formattedEndDate,
      JSON.stringify(benefits), // Convert benefits array to JSON string
      JSON.stringify(tasks) // Convert tasks array to JSON string
    ];

    // Execute the query
    const [result] = await pool.execute(query, values);
    
    // console.log("Project created successfully, ID:", result.insertId);
    return { success: true, projectId: result.insertId };
  } catch (error) {
    console.error("Error inserting project:", error);
    throw error;
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

export { getProjects, signIn, createProject, getCompanyId, getProject };