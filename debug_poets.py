file_path = r"c:\Users\pcx\Desktop\mstf (5)\New folder (5)\src\app\data\poetsData.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find all poet IDs in the POETS array
import re
# Find start of POETS array
poets_start = content.find("export const POETS: Poet[] = [")
poets_section = content[poets_start:]

# Find all id: 'xxx' at the top level of poet objects
matches = re.findall(r"id: '([^']+)'", poets_section[:5000])
print("All IDs found in POETS section:", matches[:30])
