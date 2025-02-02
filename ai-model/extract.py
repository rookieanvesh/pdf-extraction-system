import sys
import json
import pdfplumber
import re

def extract_text_from_pdf(pdf_path):
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            if not text.strip():  # If no text is extracted
                raise ValueError("The PDF contains no text or cannot be processed.")
            return text
    except Exception as e:
        raise ValueError(f"Error processing PDF: {str(e)}")

def extract_entities(text):
    entities = {
        "NAME": "",
        "PHONE": "",
        "ADDRESS": "",
        "ROLE": ""
    }

    # Extract NAME
    name_match = re.search(r"Name\s*:\s*(\w+\s*\w+)", text)
    if name_match:
        entities["NAME"] = name_match.group(1).strip()

    # Extract PHONE
    phone_match = re.search(r"Phone\s*:\s*([+\d\s().-]+)", text)
    if phone_match:
        entities["PHONE"] = phone_match.group(1).strip()

    # Extract ADDRESS
    address_match = re.search(r"Address\s*:\s*(.+)", text)
    if address_match:
        entities["ADDRESS"] = address_match.group(1).strip()

    # Extract ROLE
    role_match = re.search(r"Role\s*:\s*(\w+\s*\w*)", text)
    if role_match:
        entities["ROLE"] = role_match.group(1).strip()

    return entities

if __name__ == "__main__":
    try:
        if len(sys.argv) != 2:
            raise ValueError("Usage: python extract.py <pdf_path>")

        pdf_path = sys.argv[1]
        text = extract_text_from_pdf(pdf_path)
        entities = extract_entities(text)
        print(json.dumps(entities))
    except Exception as e:
        # Return an error message in JSON format
        error_response = {
            "error": str(e)
        }
        print(json.dumps(error_response))