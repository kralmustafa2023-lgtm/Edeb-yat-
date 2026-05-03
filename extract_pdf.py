import sys
import PyPDF2

pdf_path = r"C:\Users\pcx\Desktop\siir_analiz_raporu.pdf"
out_path = r"C:\Users\pcx\Desktop\mstf (5)\New folder (5)\siir_analiz_raporu.txt"

try:
    with open(pdf_path, 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Success")
except Exception as e:
    print("Error:", e)
