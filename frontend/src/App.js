import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("pdf", file);

        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const response = await axios.post("http://localhost:5001/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFormData(response.data);
            setSuccess(true); // Show success pop-up
            setTimeout(() => setSuccess(false), 3000); // Auto-close after 3 seconds
        } catch (error) {
            console.error("Error uploading file:", error);
            setError("Failed to process PDF. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>PDF Extraction System</h1>
            <div className="upload-section">
                <label htmlFor="file-upload" className="upload-label">
                    Choose PDF File
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={loading}
                />
                {loading && <p className="loading">Processing PDF...</p>}
            </div>
            <div className="form-section">
                <h2>Extracted Data</h2>
                <form>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" value={formData.NAME} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Phone:</label>
                        <input type="text" value={formData.PHONE} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input type="text" value={formData.ADDRESS} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <input type="text" value={formData.ROLE} readOnly />
                    </div>
                </form>
            </div>

            {/* Success Pop-up */}
            {success && (
                <div className="toast success">
                    <p>File uploaded and processed successfully!</p>
                </div>
            )}

            {/* Error Pop-up */}
            {error && (
                <div className="toast error">
                    <p>{error}</p>
                    <button onClick={() => setError("")}>Close</button>
                </div>
            )}
        </div>
    );
}

export default App;