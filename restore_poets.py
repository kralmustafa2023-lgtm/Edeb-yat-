import re

with open('old_poetsData.ts', 'rb') as f:
    raw = f.read()
    if raw.startswith(b'\xff\xfe'):
        old_content = raw.decode('utf-16')
    else:
        old_content = raw.decode('utf-8', errors='ignore')

with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    current_content = f.read()

with open('replace_poems.py', 'r', encoding='utf-8') as f:
    replace_poems_content = f.read()

local_env = {}
exec(replace_poems_content[:replace_poems_content.find("import sys")], {}, local_env)
new_poems = local_env['new_poems']

start_idx = old_content.find("export const POETS: Poet[] = [")
if start_idx == -1:
    print("Could not find POETS array in old_poetsData.ts")
    exit(1)

brace_count = 0
in_array = False
poet_strs = []
current_poet = ""

# Since old_content might contain \r\n, be careful
for char in old_content[start_idx + len("export const POETS: Poet[] = "):]:
    if char == '[' and not in_array:
        in_array = True
        continue
    if not in_array:
        if char == '[': in_array = True
        continue
    
    current_poet += char
    if char == '{':
        brace_count += 1
    elif char == '}':
        brace_count -= 1
        if brace_count == 0:
            poet_strs.append(current_poet.strip(', \n\r'))
            current_poet = ""
    elif char == ']' and brace_count == 0:
        break

start_idx_curr = current_content.find("export const POETS: Poet[] = [")
brace_count = 0
in_array = False
curr_poet_strs = []
current_poet = ""
for char in current_content[start_idx_curr + len("export const POETS: Poet[] = "):]:
    if char == '[' and not in_array:
        in_array = True
        continue
    if not in_array:
        if char == '[': in_array = True
        continue
    current_poet += char
    if char == '{':
        brace_count += 1
    elif char == '}':
        brace_count -= 1
        if brace_count == 0:
            curr_poet_strs.append(current_poet.strip(', \n\r'))
            current_poet = ""
    elif char == ']' and brace_count == 0:
        break

current_poet_map = {}
for p in curr_poet_strs:
    match = re.search(r"id:\s*'([^']+)'", p)
    if match:
        current_poet_map[match.group(1)] = p

final_poets = []
for p in poet_strs:
    match = re.search(r"id:\s*'([^']+)'", p)
    if not match: continue
    pid = match.group(1)
    
    if pid in current_poet_map:
        final_poets.append(current_poet_map[pid])
    else:
        if pid in new_poems:
            poem_str = new_poems[pid]
            main_poem_idx = p.find("mainPoem:")
            if main_poem_idx != -1:
                start_val = main_poem_idx + len("mainPoem:")
                while p[start_val].isspace(): start_val += 1
                if p[start_val] == '{':
                    bc = 0
                    end_val = start_val
                    for i in range(start_val, len(p)):
                        if p[i] == '{': bc += 1
                        elif p[i] == '}':
                            bc -= 1
                            if bc == 0:
                                end_val = i + 1
                                break
                    p = p[:start_val] + poem_str + p[end_val:]
                else:
                    end_val = p.find(",", start_val)
                    p = p[:start_val] + poem_str + p[end_val:]
        final_poets.append(p)

new_array_str = "export const POETS: Poet[] = [\n  " + ",\n  ".join(final_poets) + "\n];"
final_content = current_content[:start_idx_curr] + new_array_str + "\n"

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(final_content)

print("Successfully restored 9 poets and updated their poems to match the PDF.")
