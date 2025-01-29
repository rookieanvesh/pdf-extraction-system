const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// File upload setup
const upload = multer({ dest: "uploads/" });
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// File upload route
app.post("/upload", upload.single("pdf"), (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Path to the uploaded file
        const filePath = req.file.path;

        // Call the Python script to process the PDF
        exec(
            `/Users/anvesh/Desktop/pdf-extraction-system/ai-model/venv/bin/python3 ../ai-model/extract.py ${filePath}`,
            (error, stdout, stderr) => {
                // Delete the uploaded file after processing
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    }
                });

                // Handle Python script errors
                if (error) {
                    console.error(`Error executing Python script: ${stderr}`);
                    return res.status(500).json({ error: "Failed to process PDF" });
                }

                // Parse the output from the Python script
                let extractedData;
                try {
                    extractedData = JSON.parse(stdout);
                } catch (parseError) {
                    console.error("Error parsing Python script output:", parseError);
                    return res.status(500).json({ error: "Invalid output from PDF processing" });
                }

                // Check if the Python script returned an error
                if (extractedData.error) {
                    return res.status(400).json({ error: extractedData.error });
                }

                // Return the extracted data
                res.json(extractedData);
            }
        );
    } catch (err) {
        // Handle unexpected errors
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
