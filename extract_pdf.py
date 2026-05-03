import PyPDF2

pdf_path = r"C:\Users\pcx\Desktop\corrected_siir_analizi_with_poems.pdf"
out_path = r"C:\Users\pcx\Desktop\mstf (5)\New folder (5)\corrected_pdf.txt"

with open(pdf_path, 'rb') as f:
    reader = PyPDF2.PdfReader(f)
    text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n"

with open(out_path, 'w', encoding='utf-8', errors='replace') as f:
    f.write(text)

print("Success - Pages:", len(reader.pages))
