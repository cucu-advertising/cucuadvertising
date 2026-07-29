import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directory = './public/workbranding';

async function optimizeImages() {
  if (!fs.existsSync(directory)) {
    console.error(`Directory ${directory} not found.`);
    return;
  }

  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const ext = path.extname(file).toLowerCase();

    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const outputName = file.replace(ext, '.webp');
      const outputPath = path.join(directory, outputName);

      console.log(`Optimizing ${file} -> ${outputName}...`);

      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        // Optional: delete original if you want, but safer to keep for now
        // fs.unlinkSync(filePath);
        console.log(`Successfully optimized ${file}`);
      } catch (err) {
        console.error(`Failed to optimize ${file}:`, err);
      }
    }
  }
}

optimizeImages();
