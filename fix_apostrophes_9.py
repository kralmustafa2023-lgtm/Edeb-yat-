with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("7+7=14'lü hece", "7+7=14\\'lü hece")
text = text.replace("Dante'nin", "Dante\\'nin")
text = text.replace("Inferno'suna", "Inferno\\'suna")
text = text.replace("İstanbul'un", "İstanbul\\'un")
text = text.replace("Boğaz'da", "Boğaz\\'da")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed apostrophes 9')
