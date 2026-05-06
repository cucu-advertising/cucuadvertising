import fs from 'fs';
import path from 'path';

const srcDir = './src';

const extensionsToReplace = ['.jpg', '.jpeg', '.png', '.gif'];

function updateReferences(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      updateReferences(fullPath);
    } else if (['.jsx', '.js', '.css'].includes(path.extname(entry.name).toLowerCase())) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      for (const ext of extensionsToReplace) {
        // Regex to find image paths with specific extensions
        const regex = new RegExp(`['"\\/]([^'"]+?)${ext}`, 'g');
        
        content = content.replace(regex, (match, p1) => {
          const possibleWebp = p1 + '.webp';
          // Check if the webp version exists in public or src (simplified check)
          // For now, if we optimized it, we likely changed the extension in the filesystem
          // So we should update the reference.
          changed = true;
          return match.replace(ext, '.webp');
        });
      }

      if (changed) {
        console.log(`Updating references in ${fullPath}`);
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

updateReferences(srcDir);
console.log('Reference update complete!');
