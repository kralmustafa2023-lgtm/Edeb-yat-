import os

file_path = 'src/app/data/poetsData.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The corruption happens when UTF-8 bytes are read as Windows-1254 (or CP1252) and then saved as UTF-8 again.
# ├Â -> ö
# ├╝ -> ü
# ┼ş -> ş
# ─▒ -> ı
# ├ğ -> ç
# ─ş -> ğ
# ├ç -> Ç
# ├û -> Ö
# ┼Ş -> Ş
# ─░ -> İ
# ├£ -> Ü
# ─₧ -> Ğ

replacements = {
    '├Â': 'ö',
    '├╝': 'ü',
    '┼ş': 'ş',
    '─▒': 'ı',
    '├ğ': 'ç',
    '─ş': 'ğ',
    '├ç': 'Ç',
    '├û': 'Ö',
    '┼Ş': 'Ş',
    '─░': 'İ',
    '├£': 'Ü',
    '─₧': 'Ğ'
}

for bad, good in replacements.items():
    content = content.replace(bad, good)

# Fix possible leftover weird characters
content = content.replace('â€"', '—')
content = content.replace('â€™', "'")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed encoding corruptions in poetsData.ts")
