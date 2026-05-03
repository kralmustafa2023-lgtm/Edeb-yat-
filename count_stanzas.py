import re

with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# simple regex to split poets
poets = text.split("export const POETS: Poet[] = [")[1].split("  id: '")
for p in poets:
    if not p.strip(): continue
    
    # get title
    title_match = re.search(r"title:\s*'([^']+)'", p)
    title = title_match.group(1) if title_match else "Unknown"
    
    # count stanzas
    stanzas_match = re.search(r"stanzas:\s*\[(.*?)\]\s*,\s*analysisDetails", p, flags=re.DOTALL)
    if stanzas_match:
        num_stanzas = stanzas_match.group(1).count("lines:")
        print(f"{title}: {num_stanzas} stanzas")
