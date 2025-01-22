# PDF Extraction System

This project extracts specific details (e.g., Name, Phone Number, Address, Role) from a PDF and auto-fills a form in a frontend application.

## Features
- **PDF Upload**: Upload a PDF file through the frontend.
- **Data Extraction**: Extract Name, Phone, Address, and Role using Python and regex.
- **Auto-Fill Form**: Display the extracted data in a form on the frontend.

## Project Structure
- **frontend**: React app for uploading PDFs and displaying extracted data.
- **backend**: Node.js server for handling file uploads and processing.
- **ai-model**: Python script for extracting text and entities from PDFs.

## Setup

### Prerequisites
- Node.js (for frontend and backend)
- Python 3 (for AI model)
- Git

### Steps to Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rookieanvesh/pdf-extraction-system.git
   cd pdf-extraction-system
   ```

2. **Set Up the Backend**:
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     node server.js
     ```
   - The backend will run on `http://localhost:5001`.

3. **Set Up the Frontend**:
   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React app:
     ```bash
     npm start
     ```
   - The frontend will run on `http://localhost:3000`.

4. **Set Up the AI Model**:
   - Navigate to the `ai-model` directory:
     ```bash
     cd ../ai-model
     ```
   - Create a virtual environment (optional but recommended):
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```

5. **Run the System**:
   - Open the frontend in your browser (`http://localhost:3000`).
   - Upload a PDF file and see the extracted data auto-fill the form.

## Demo
[Add a link to your live demo or screenshots here]

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js, Express
- **AI Model**: Python, pdfplumber, regex

## Contributing
Feel free to open issues or submit pull requests for improvements.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.