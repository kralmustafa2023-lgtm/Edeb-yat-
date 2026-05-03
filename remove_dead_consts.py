file_path = r"c:\Users\pcx\Desktop\mstf (5)\New folder (5)\src\app\data\poetsData.ts"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find the line that starts the dead code consts block
# It starts with "const otuzBesYas" or the comment before it
start_line = None
end_line = None

for i, line in enumerate(lines):
    stripped = line.strip()
    # Find start: the comment line before const otuzBesYas
    if start_line is None and '// POEM 1:' in line:
        start_line = i
    # Find end: the line after the last dead const (fuzuliPoem closes with }; then blank)
    # The POETS array starts with "export const POETS"
    if 'export const POETS' in line:
        # End is the line just before this
        end_line = i
        break

if start_line is None or end_line is None:
    print(f"ERROR: Could not find boundaries. start={start_line}, end={end_line}")
    exit(1)

print(f"Removing lines {start_line+1} to {end_line} ({end_line - start_line} lines of dead code)")

# Keep everything before start_line and from end_line onwards
new_lines = lines[:start_line] + lines[end_line:]

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Done. Dead code removed.")
