with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix Baki Kanuni'nin
text = text.replace("Şair, Kanuni'nin", "Şair, Kanuni\\'nin")

# Fix Köroğlu'nun
text = text.replace("Köroğlu'nun", "Köroğlu\\'nun")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed apostrophes 4")
