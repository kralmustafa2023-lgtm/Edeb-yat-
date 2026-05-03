with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix Fuzuli edebiSanat, tema, konu apostrophes
text = text.replace("Teşbih (İstanbul'u sevgiliye benzetme)", "Teşbih (İstanbul\\'u sevgiliye benzetme)")
text = text.replace("description: 'İstanbul'un güzelliği", "description: 'İstanbul\\'un güzelliği")
text = text.replace("description: 'İstanbul'un eşsizliği", "description: 'İstanbul\\'un eşsizliği")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed apostrophes 3")
