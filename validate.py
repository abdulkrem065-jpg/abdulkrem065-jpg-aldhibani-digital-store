import os
import re

# Find all files
files = {}
for root, dirs, filenames in os.walk('/app/applet/app/applet'):
    for f in filenames:
        if f.endswith('.md') and f.startswith('QEOS_'):
            files[f] = os.path.join(root, f)

for f in files:
    print(f"Found {f}")
