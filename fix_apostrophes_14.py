with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("'Nerde o günler?'", "\\'Nerde o günler?\\'")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed apostrophes 14')
