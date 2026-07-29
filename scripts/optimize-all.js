import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const directories = ['./public', './src/assets'];

async function optimizeRecursive(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await optimizeRecursive(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      
      // Process ALL images and videos to ensure consistent naming/webp availability
      if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        console.log(`Optimizing: ${fullPath}`);
        const outputPath = fullPath.replace(ext, '.webp');
        try {
          if (ext === '.gif') {
            await sharp(fullPath, { animated: true })
              .webp({ quality: 75, effort: 4 })
              .toFile(outputPath);
          } else {
            await sharp(fullPath)
              .webp({ quality: 80 })
              .toFile(outputPath);
          }
          console.log(`  -> Created ${outputPath}`);
          
          // Delete original to ensure only webp remains
          if (outputPath !== fullPath) {
            fs.unlinkSync(fullPath);
          }
        } catch (err) {
          console.error(`  -> Failed:`, err.message);
        }
      } else if (ext === '.mp4') {
        // Videos stay as .mp4 but we compress them
        console.log(`Optimizing Video: ${fullPath}`);
        const outputPath = fullPath.replace('.mp4', '_opt.mp4');
        try {
          execSync(`ffmpeg -i "${fullPath}" -vcodec libx264 -crf 28 -an "${outputPath}" -y`, { stdio: 'ignore' });
          fs.renameSync(outputPath, fullPath);
          console.log(`  -> Compressed Video`);
        } catch (err) {
          console.error(`  -> Failed:`, err.message);
        }
      }
    }
  }
}

async function run() {
  for (const dir of directories) {
    if (fs.existsSync(dir)) {
      await optimizeRecursive(dir);
    }
  }
  console.log('Optimization complete!');
}

run();
