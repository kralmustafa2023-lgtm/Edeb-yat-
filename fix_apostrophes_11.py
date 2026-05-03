with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("İstanbul'a", "İstanbul\\'a")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed apostrophes 11')
