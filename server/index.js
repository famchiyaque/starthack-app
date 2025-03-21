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
import { getProjects, signIn, createProject, getCompanyId, getProject } from "./db.js";

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
async function setupDatabase() {
    try {
        // Define SQLite database path
        const dbPath = path.join(__dirname, "../volty.db");
        
        // Delete existing database file if it exists
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
            console.log("Removed existing database file");
        }
        
        // Read the SQL script
        const dbScriptPath = path.join(__dirname, "../db_script.sql");
        let sqlScript = fs.readFileSync(dbScriptPath, "utf8");
        
        // Create a new database and enable foreign keys
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        
        // Enable foreign keys
        await db.exec('PRAGMA foreign_keys = ON;');
        
        console.log("Setting up SQLite database...");
        
        // Convert and execute table creation statements
        // Manually create tables with proper SQLite syntax
        await db.exec(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            rol TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now','localtime'))
        );
        
        CREATE TABLE projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_id INTEGER NOT NULL,
            company_name TEXT NOT NULL,
            initiative TEXT NOT NULL,
            challenge TEXT NOT NULL,
            progress TEXT NOT NULL,
            call_to_action TEXT NOT NULL,
            links TEXT NOT NULL,
            benefits TEXT DEFAULT '',
            tasks TEXT DEFAULT '',
            categories TEXT DEFAULT '',
            image TEXT DEFAULT '',
            qr_code TEXT,
            end_date TEXT,
            created_at TEXT DEFAULT (datetime('now','localtime')),
            FOREIGN KEY (company_id) REFERENCES users(id) ON DELETE CASCADE
        );
        
        CREATE TABLE community (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            project_id INTEGER NOT NULL,
            created_at TEXT DEFAULT (datetime('now','localtime')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        );
        
        CREATE TABLE chat (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            project_id INTEGER NOT NULL,
            message TEXT NOT NULL,
            sent_at TEXT DEFAULT (datetime('now','localtime')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        );
        
        CREATE TABLE benefits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            task TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now','localtime')),
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        );`);
        
        // Insert test data
        await db.exec(`
        INSERT INTO users (name, email, password, rol) VALUES
        ('Virgin Atlantic', 'contact@virginatlantic.com', 'password123', 'company'),
        ('Virgin Voyages', 'contact@virginvoyages.com', 'password123', 'company'),
        ('Virgin Media 02', 'contact@virginmedia02.com', 'password123', 'company'),
        ('Virgin Limited Edition (VLE) & Virgin Unite', 'contact@virginvle.com', 'password123', 'company'),
        ('Virgin Unite', 'contact@virginunite.com', 'password123', 'company');
        
        INSERT INTO users (name, email, password, rol) VALUES
        ('sammy johnson', 'sam@gmail.com', 'sam123', 'individual'),
        ('voyager user', 'voyageruser@gmail.com', 'voyager', 'individual'),
        ('media user', 'mediauser@gmail.com', 'media', 'individual');
        
        INSERT INTO projects (company_id, company_name, initiative, challenge, progress, call_to_action, links) VALUES
        (1, 'Virgin Atlantic', 'Youngest, Cleanest Fleet in the Sky', 'The time for action against climate change is now. Virgin Atlantic are on a mission to achieve net-zero by 2050.', 'Virgin Atlantic is working to accelerate the development of sustainable fuels. On November 28th, we made history with Flight100— becoming the first commercial airline to fly across the Atlantic on 100% SAF - marking a key milestone on the path to decarbonising aviation.', '- Stay informed - Sign up for updates on ways you can get involved in making a difference', 'https://corporate.virginatlantic.com/gb/en/business-for-good/planet.html https://corporate.virginatlantic.com/gb/en/business-for-good/planet/fuel/flight100.html https://corporate.virginatlantic.com/gb/en/business-for-good/planet/fuel.html'),
        (2, 'Virgin Voyages', 'Epic Sea Change For All', 'Wildlife havens, carbon stores, storm defences, ocean purifiers – mangrove swamps are one of the hardest-working habitats on Earth, but they're disappearing fast.', 'Virgin Voyages have teamed up with Virgin's Foundation, Virgin Unite, to support mangrove forest projects in the Caribbean. The aim is to accelerate nature-based solutions to climate change, and create a scalable model for other regions in the world.', '- Get involved in a Beach Clean onboard - Donate to Sea Change For All Fund (not currently available)', 'https://www.virginvoyages.com/sustainability'),
        (3, 'Virgin Media 02', 'Better Connections Plan', 'Old IT equipment can lead to electronic waste, or e-waste, polluting the environment. Recycling old IT equipment plays a vital role in preventing this.', 'Virgin Media O2 have a zero landfill policy and will be come a zero-waste business by the end of 2025, and are committed to achieving zero waste operations and products.', '- Sell your old device with O2 Recycle', 'https://www.virgin.com/about-virgin/latest/virgin-media-o2-launches-better-connections-plan https://www.o2recycle.co.uk/'),
        (3, 'Virgin Media 02', 'Better Connections Plan', 'The digital divide, or the split between those with and without reliable internet connectivity and related technologies, has profound implications on society. Lack of internet access affects the economy, social opportunities, and educational equity, and many other areas.', 'Community Calling is a pioneering initiative by Virgin Media O2 and environmental charity Hubbub to tackle digital exclusion. It has already rehomed more than 20,000 unused smartphones with people who need them across the country.', '- Donate devices via Community Calling', 'https://www.virgin.com/about-virgin/latest/virgin-media-o2-launches-better-connections-plan https://hubbub.org.uk/community-calling'),
        (3, 'Virgin Media 02', 'Better Connections Plan', 'Mobile phones can have a significant environmental impact in their production and disposal. The mass production of smartphones not only contributes to environmental pollution but also results in a substantial carbon footprint.', 'Virgin Media O2 is one of 5 of Europe's leading mobile operators to have joined forces to update and launch a new pan-industry Eco Rating labelling scheme that will help consumers identify and compare the most sustainable mobile phones and encourage suppliers to reduce the environmental impact of their devices.', '- Use the Eco Rating Scheme', 'https://news.virginmediao2.co.uk/archive/new-pan-industry-eco-rating-scheme-launched-for-mobile-phones/ https://www.o2.co.uk/inspiration/the-drop/eco-rating-for-mobile-phones'),
        (3, 'Virgin Media 02', 'Better Connections Plan', 'Mobile phones can have a significant environmental impact in their production and disposal. The mass production of smartphones not only contributes to environmental pollution but also results in a substantial carbon footprint.', 'Virgin Media O2 offer a range of like-new second hand smart phones and tablets to help reduce your carbon footprint.', '- Buy a like-new second hand smartphone or tablet', 'https://www.o2.co.uk/shop/like-new'),
        (4, 'Virgin Limited Edition (VLE) & Virgin Unite', 'Pride ''n Purpose', 'Many communities surrounding Ulusaba lack basic needs such as access to clean drinking water, basic healthcare, food, childcare, and job opportunities.', 'Pride ''n Purpose is a non-for-profit organisation, committed to helping disadvantaged communities living adjacent to the Sabi Sand Reserve. The Pride 'n Purpose philosophy is that people are most effectively helped if they are empowered to help themselves, with this in mind the organisation's work focuses primarily on sustainable initiatives and it is estimated that Pride 'n Purpose benefits over 35,000 people across six communities.', '- Volunteer during your visit to Ulusaba - Pack for a Purpose: Donate clothing and household supplies - Make a donation', 'https://www.virginlimitededition.com/ulusaba/the-reserve/our-commitment/ https://www.packforapurpose.org/destinations/africa/south-africa/ulusaba-private-game-reserve/'),
        (4, 'Virgin Limited Edition (VLE) & Virgin Unite', 'Mahali Mzuri: Inua Jamii', 'A key conservation goal around Mahali Mzuri is to aid conservation and preserve the under-threat route of the Great Wildebeest Migration. We also aim to support and enhance the standard of living in local communities.', 'Inua Jamii is Mahali Mzuri's charitable arm, committed to working with and supporting the local Maasai communities in the Olare Motorogi Conservancy to improve their standards of living. The name "Inua Jamii" means 'uplifting the local community' in Swahili. Our philosophy is that people are most effectively helped if they are empowered to help themselves. Our aim is to nurture communities that thrive through our involvement, simultaneously fostering self-reliance and establishing sustainable resources for generations to come.', '- Volunteer during your visit to Mahali Mzuri - Visit the community or the Maa Trust - Pack for a Purpose: Donate clothing and household supplies - Make a donation', 'https://www.virginlimitededition.com/mahali-mzuri/the-camp/our-commitment/ https://www.virginlimitededition.com/media/dvvi4c4q/mahali-mzuri-inua-jamii-brochure-oct-24.pdf'),
        (5, 'Virgin Unite', 'Planetary Guardians', 'The planetary boundaries framework is a key framework for grasping and addressing our footprint on Earth and identifies nine critical systems needed to regulate the health of the entire planet. From climate change to freshwater use, biodiversity loss to chemical pollution and the release of novel entities, these boundaries define the "safe operating space" for humanity. Veer too far beyond these limits and you risk causing irreversible damage to the very ecosystems that sustain life. We currently face an onslaught of environmental and social dilemmas.', 'The new assessment of the Planetary Boundaries was so stark it compelled Virgin Unite to work with the Potsdam Institute to convene a group of leaders and activists to become ''Planetary Guardians'', with an aim to "elevate the science, catalyse systems change to safeguard the global commons, and spark a movement to tackle the biggest crisis we have ever faced."', '- Watch the video to learn more about our nine planetary boundaries', 'https://www.youtube.com/watch?v=d4fdF8rq5h8 https://www.virgin.com/branson-family/richard-branson-blog/how-the-planetary-guardians-can-help-secure-earths-future');`);
        
        console.log("SQLite database setup complete!");
        await db.close();
    } catch (error) {
        console.error("Database setup failed:", error);
        console.error("Error details:", error.message);
    }
}

const app = express();
const PORT = process.env.PORT || 5555;
console.log(`Server running on port ${PORT}`);

app.use(cors());
app.use(express.json()); // JSON body parsing
app.use(express.static("build")); // Serve frontend
app.use("/uploads", express.static(uploadDirectory)); // Serve uploaded images

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
setupDatabase().then(() => {
    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
