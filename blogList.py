import glob
import json
import os

# Path to your blogs folder (adjust if needed)
blogs_dir = 'blogs'

# Find all .html files in blogs folder
blog_files = glob.glob(os.path.join(blogs_dir, '*.html'))

# Extract only the filenames (not full path)
blog_filenames = [os.path.basename(f) for f in blog_files]

# Save to blogs.json file
with open('blogs.json', 'w') as f:
    json.dump(blog_filenames, f, indent=2)

print(f'Saved {len(blog_filenames)} blog filenames to blogs.json')
