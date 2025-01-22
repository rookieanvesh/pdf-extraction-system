import sys
import json
import pdfplumber
import re

def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    return text

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
    pdf_path = sys.argv[1]
    text = extract_text_from_pdf(pdf_path)
    entities = extract_entities(text)
    print(json.dumps(entities))