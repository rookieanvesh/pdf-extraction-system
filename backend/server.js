const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// File upload setup
const upload = multer({ dest: "uploads/" });

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// File upload route
app.post("/upload", upload.single("pdf"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Path to the uploaded file
    const filePath = req.file.path;

    // Call the Python script to process the PDF
    exec(`/Users/anvesh/Desktop/pdf-extraction-system/ai-model/venv/bin/python3 ../ai-model/extract.py ${filePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${stderr}`);
            return res.status(500).json({ error: "Failed to process PDF" });
        }
        const extractedData = JSON.parse(stdout);
        res.json(extractedData);
    });
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});