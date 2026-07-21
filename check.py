import os
import re

files = {}
for root, dirs, filenames in os.walk('/app/applet/app/applet'):
    for f in filenames:
        if f.endswith('.md') and f.startswith('QEOS_'):
            files[f] = os.path.join(root, f)

all_docs = set(files.keys())

def get_mentions(filename):
    with open(files[filename], 'r') as f:
        content = f.read()
    return set(re.findall(r'QEOS_[A-Z0-9_]+\.md', content))

canonical = get_mentions('QEOS_CANONICAL_SOURCES.md')
print("Missing in CANONICAL_SOURCES:", all_docs - canonical - {'QEOS_CANONICAL_SOURCES.md'})

rel_map = get_mentions('QEOS_DOCUMENT_RELATIONSHIP_MAP.md')
print("Missing in RELATIONSHIP_MAP:", all_docs - rel_map - {'QEOS_DOCUMENT_RELATIONSHIP_MAP.md'})

know_index = get_mentions('QEOS_KNOWLEDGE_INDEX.md')
print("Missing in KNOWLEDGE_INDEX:", all_docs - know_index - {'QEOS_KNOWLEDGE_INDEX.md'})

# broken links across all files
bad_refs = 0
good_refs = 0
for name, path in files.items():
    mentions = get_mentions(name)
    for m in mentions:
        if m not in all_docs:
            print(f"Broken link in {name}: {m}")
            bad_refs += 1
        else:
            good_refs += 1
            
print(f"Good refs: {good_refs}, Bad refs: {bad_refs}")

