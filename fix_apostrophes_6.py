with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix Kanuni Mersiyesi'nde
text = text.replace("Kanuni Mersiyesi'nde", "Kanuni Mersiyesi\\'nde")
text = text.replace("description: 'İstanbul'u dinliyorum\"", "description: 'İstanbul\\'u dinliyorum\"")
text = text.replace("İstanbul'u dinliyorum", "İstanbul\\'u dinliyorum")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed apostrophes 6")
