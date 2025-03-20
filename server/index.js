// const express = require("express");
import express from 'express'
// const cors = require("cors");
import cors from 'cors'
// require("dotenv").config();
import dotenv from 'dotenv'
dotenv.config()

import { getProjects } from './db.js';

const app = express();
const PORT = process.env.PORT || 5555;
console.log(PORT)

app.use(cors());
app.use(express.json()); // For JSON body parsing
app.use(express.static("build"))


app.get("/api/get-projects", async (req, res) => {
    try {
        const result = await getProjects()

        res.status(200).json(result)
    } catch (error) {
        console.error(error)
    }
})

// Sample API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
