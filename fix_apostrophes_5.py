with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix cür'a
text = text.replace("w('cür'a')", "w('cür\\'a')")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed apostrophes 5")
