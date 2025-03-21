import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// SQLite database path
const dbPath = path.join(__dirname, "../volty.db");

// Function to get database connection
async function getDbConnection() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

async function getProjects(name) {
    try {
        const db = await getDbConnection();
        const projects = await db.all(`
            SELECT * FROM projects   
            WHERE company_name = ? 
        `, [name]);
        
        await db.close();
        return projects;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getProject(id) {
  try {
      const db = await getDbConnection();
      const project = await db.get(`
          SELECT * FROM projects   
          WHERE id = ?
      `, [id]);
      
      await db.close();
      return project;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

async function signIn(name) {
  try {
    const db = await getDbConnection();
    const result = await db.all(`
      SELECT * FROM users
      WHERE name = ?
    `, [name]);
    
    await db.close();
    console.log("result of signing in ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCompanyId(name) {
  try { 
    const db = await getDbConnection();
    const result = await db.get(`
      SELECT id FROM users
      WHERE name = ?  
    `, [name]);
    
    await db.close();
    return result ? result.id : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createProject(company_id, name, initiative, callToAction, image, category, endDate, benefits, tasks) {
  try {
    const db = await getDbConnection();
    
    const query = `
      INSERT INTO projects 
        (company_id, company_name, initiative, call_to_action, image, categories, end_date, benefits, tasks, challenge, progress, links, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now','localtime'))
    `;

    const formattedEndDate = endDate ? new Date(endDate).toISOString().slice(0, 19).replace('T', ' ') : null;

    const values = [
      company_id, 
      name,
      initiative,
      callToAction,
      image || '',
      JSON.stringify(category), // Convert category array to JSON string
      formattedEndDate,
      JSON.stringify(benefits), // Convert benefits array to JSON string
      JSON.stringify(tasks), // Convert tasks array to JSON string
      "", // challenge
      "0", // progress
      "" // links
    ];

    // Execute the query
    const result = await db.run(query, values);
    await db.close();
    
    return { success: true, projectId: result.lastID };
  } catch (error) {
    console.error("Error inserting project:", error);
    throw error;
  }
}

// Function to execute queries (utility function)
async function get(sql, params = []) {
  try {
    const db = await getDbConnection();
    const rows = await db.all(sql, params);
    await db.close();
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export { getProjects, signIn, createProject, getCompanyId, getProject };