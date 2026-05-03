import re

with open('old_poetsData.ts', 'rb') as f:
    raw = f.read()
    if raw.startswith(b'\xff\xfe'):
        text = raw.decode('utf-16')
    else:
        text = raw.decode('utf-8', errors='ignore')

ids = re.findall(r"id:\s*'([^']+)'", text)
poet_ids = []
for i in ids:
    if not i.endswith('-poem') and not i.startswith('u9') and i not in poet_ids:
        poet_ids.append(i)
print(poet_ids)
