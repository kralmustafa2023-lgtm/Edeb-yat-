with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("Anadolu'ya", "Anadolu\\'ya")
text = text.replace("Dante'ye", "Dante\\'ye")
text = text.replace("Inferno'suna", "Inferno\\'suna")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed apostrophes 13')
