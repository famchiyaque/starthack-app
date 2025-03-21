import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { getProjects, signIn, createProject, getCompanyId, getProject, makeDatabase } from "./db.js";

dotenv.config();

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define upload directory
const uploadDirectory = path.join(__dirname, "public/uploads");

// Ensure the directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Database setup function
// async function setupDatabase() {
//     try {
//         // Define SQLite database path
//         const dbPath = path.join(__dirname, "../volty.db");
        
//         // Delete existing database file if it exists
//         if (fs.existsSync(dbPath)) {
//             fs.unlinkSync(dbPath);
//             console.log("Removed existing database file");
//         }
        
//         // Read the SQL script
//         const dbScriptPath = path.join(__dirname, "../db_script.sql");
//         let sqlScript = fs.readFileSync(dbScriptPath, "utf8");
        
//         // Convert MySQL specific syntax to SQLite
//         sqlScript = sqlScript
//             // Replace MySQL CREATE DATABASE and USE statements
//             .replace(/CREATE DATABASE.*?;/gi, '')
//             .replace(/use.*?;/gi, '')
//             // Replace AUTO_INCREMENT with AUTOINCREMENT
//             .replace(/AUTO_INCREMENT/gi, 'AUTOINCREMENT')
//             // Replace ENUM type with TEXT
//             .replace(/ENUM\([^)]+\)/gi, 'TEXT')
//             // Replace TIMESTAMP type with DATETIME
//             .replace(/TIMESTAMP/gi, 'DATETIME')
//             // Replace CURRENT_TIMESTAMP with strftime
//             .replace(/CURRENT_TIMESTAMP/gi, "strftime('%Y-%m-%d %H:%M:%S', 'now')");
        
//         // Split script into individual statements
//         const statements = sqlScript
//             .split(';')
//             .filter(statement => statement.trim() !== '')
//             .map(statement => statement.trim());
        
//         // Open SQLite database connection
//         const db = await open({
//             filename: dbPath,
//             driver: sqlite3.Database
//         });
        
//         console.log("Setting up SQLite database...");
        
//         // Execute each statement
//         for (const statement of statements) {
//             try {
//                 if (statement.trim()) {
//                     await db.exec(statement);
//                 }
//             } catch (err) {
//                 console.warn(`Warning: Error executing statement: ${err.message}`);
//                 console.warn(`Statement: ${statement}`);
//                 // Continue with next statement even if current one fails
//             }
//         }
        
//         console.log("SQLite database setup complete!");
//         await db.close();
//     } catch (error) {
//         console.error("Database setup failed:", error);
//     }
// }

const app = express();
const PORT = process.env.PORT || 5555;
console.log(`Server running on port ${PORT}`);

app.use(cors());
app.use(express.json()); // JSON body parsing
app.use(express.static("build")); // Serve frontend
app.use("/uploads", express.static(uploadDirectory)); // Serve uploaded images

makeDatabase()

// Get projects
app.get("/api/get-projects", async (req, res) => {
    try {
        const name = req.query.name;
        // console.log("Fetching projects for:", name);
        const result = await getProjects(name);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get projects" });
    }
});

app.get("/api/get-project", async (req, res) => {
    try {
        const id = req.query.projectId;
        // console.log("Fetching project for:", id);
        const result = await getProject(id);
        // console.log("result of get proj: ", result)
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get projects" });
    }
});

// Sign-in
app.get("/api/sign-in", async (req, res) => {
    try {
        const name = req.query.name;
        // console.log("User signing in:", name);
        const result = await signIn(name);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sign-in failed" });
    }
});

// Create Project
app.post("/api/create-project", upload.single("image"), async (req, res) => {
    try {
        const { name, initiative, callToAction, category, endDate, benefits, tasks } = req.body;
        const image = req.file ? req.file.filename : null;

        // Parse benefits and tasks safely
        let parsedBenefits, parsedTasks;
        try {
            parsedBenefits = JSON.parse(benefits);
            parsedTasks = JSON.parse(tasks);
        } catch (error) {
            return res.status(400).json({ error: "Invalid JSON format for benefits or tasks" });
        }

        const company_id = await getCompanyId(name)
        // console.log("resulting company id: ", company_id)

        // console.log("Received project data:", {
        //     name,
        //     company_id,
        //     initiative,
        //     callToAction,
        //     category,
        //     endDate,
        //     benefits: parsedBenefits,
        //     tasks: parsedTasks,
        //     image,
        // });

        // Call the database function
        const result = await createProject(company_id, name, initiative, callToAction, image, category, endDate, parsedBenefits, parsedTasks);
        res.status(200).json({ message: "Project created successfully", result });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

// Sample API route
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

// Run database setup before starting server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// setupDatabase().then(() => {
//     // Start server
//     app.listen(PORT, () => {
//         console.log(`Server is running on http://localhost:${PORT}`);
//     });
// });
