with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("Süleyman'ın", "Süleyman\\'ın")
text = text.replace("Dante'nin", "Dante\\'nin")
text = text.replace("Inferno'suna", "Inferno\\'suna")
text = text.replace("İstanbul'un", "İstanbul\\'un")
text = text.replace("Boğaz'da", "Boğaz\\'da")
text = text.replace("Köroğlu'nun", "Köroğlu\\'nun")
text = text.replace("İstanbul'u", "İstanbul\\'u")
text = text.replace("Hakk'a", "Hakk\\'a")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed apostrophes 8')
