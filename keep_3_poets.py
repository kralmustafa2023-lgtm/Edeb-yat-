import re

file_path = r"c:\Users\pcx\Desktop\mstf (5)\New folder (5)\src\app\data\poetsData.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

keep_ids = {'orhan-veli', 'cahit-sitki', 'yahya-kemal'}

# Find POETS array
array_marker = "export const POETS: Poet[] = ["
array_start = content.find(array_marker)
if array_start == -1:
    print("ERROR: Cannot find POETS array"); exit(1)

bracket_pos = content.find("[", array_start + len(array_marker) - 1)
depth = 0
array_end = bracket_pos
for i in range(bracket_pos, len(content)):
    if content[i] == '[':
        depth += 1
    elif content[i] == ']':
        depth -= 1
        if depth == 0:
            array_end = i + 1
            break

array_content = content[bracket_pos:array_end]

# Find individual poet objects - they start with { after a newline and have id: '...'
# Strategy: split by finding each top-level { } block
kept = []
i = 1  # skip opening [
depth = 0
obj_start = None

for j in range(len(array_content)):
    c = array_content[j]
    if c == '{':
        if depth == 0:
            obj_start = j
        depth += 1
    elif c == '}':
        depth -= 1
        if depth == 0 and obj_start is not None:
            obj = array_content[obj_start:j+1]
            # Find the poet id inside this object (first id: '...' at top level)
            id_match = re.search(r"^\s*id:\s*'([^']+)'", obj, re.MULTILINE)
            if id_match:
                poet_id = id_match.group(1)
                if poet_id in keep_ids:
                    kept.append(obj)
                    print(f"  KEEPING: {poet_id}")
                else:
                    print(f"  REMOVING: {poet_id}")
            obj_start = None

new_array = "[\n  " + ",\n  ".join(kept) + "\n]"
new_content = content[:bracket_pos] + new_array + content[array_end:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Done.")
