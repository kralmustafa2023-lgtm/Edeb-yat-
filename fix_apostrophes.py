with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix unescaped apostrophes inside single-quoted strings
text = text.replace("8'li hece ölçüsü (4+4)", "8\\'li hece ölçüsü (4+4)")
text = text.replace("11'li hece ölçüsü (6+5)", "11\\'li hece ölçüsü (6+5)")
text = text.replace("11'li Hece ölçüsü", "11\\'li Hece ölçüsü")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed apostrophes in descriptions")
