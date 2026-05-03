with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix Fuzuli bio
text = text.replace("bio: 'İstanbul'un eşsizliği", "bio: 'İstanbul\\'un eşsizliği")
# Fix Yahya Kemal bio
text = text.replace("bio: 'Ölümün bir gemi yolculuğuna", "bio: 'Ölümün bir gemi yolculuğuna")
text = text.replace("bio: 'Kanuni Sultan Süleyman'ın ölümü", "bio: 'Kanuni Sultan Süleyman\\'ın ölümü")
text = text.replace("bio: 'Köroğlu'nun Bolu Beyi'ne", "bio: 'Köroğlu\\'nun Bolu Beyi\\'ne")

# Fix analysisDetails descriptions
text = text.replace("description: '\"Gel gör beni aşk neyledi\" dizesi", "description: '\"Gel gör beni aşk neyledi\" dizesi")
text = text.replace("description: '8'li hece ölçüsü", "description: '8\\'li hece ölçüsü")
text = text.replace("description: '11'li hece ölçüsü", "description: '11\\'li hece ölçüsü")
text = text.replace("description: '7+7=14'lü hece ölçüsü", "description: '7+7=14\\'lü hece ölçüsü")

# Fix Fikret
text = text.replace("bio: 'Şair, sisli bir akşamda Boğaz'da", "bio: 'Şair, sisli bir akşamda Boğaz\\'da")

# Fix Cahit
text = text.replace("bio: 'Şair, otuz beş yaşında hayatın ortasında olduğunu, Dante'nin Inferno'suna", "bio: 'Şair, otuz beş yaşında hayatın ortasında olduğunu, Dante\\'nin Inferno\\'suna")
text = text.replace("description: 'Telmih (Dante'ye atıf),", "description: 'Telmih (Dante\\'ye atıf),")

# Fix Orhan Veli
text = text.replace("bio: 'Şair, gözleri kapalı bir şekilde İstanbul'un seslerini", "bio: 'Şair, gözleri kapalı bir şekilde İstanbul\\'un seslerini")
text = text.replace("title: 'İstanbul'u Dinliyorum'", "title: 'İstanbul\\'u Dinliyorum'")
text = text.replace("description: '\"İstanbul'u dinliyorum\"", "description: '\"İstanbul\\'u dinliyorum\"")
text = text.replace("description: 'Şair, gözleri kapalı bir şekilde İstanbul'un seslerini", "description: 'Şair, gözleri kapalı bir şekilde İstanbul\\'un seslerini")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed more apostrophes")
