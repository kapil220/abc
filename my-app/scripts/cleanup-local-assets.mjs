import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cloudinaryMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'cloudinary-map.json'), 'utf8'));
const imagesDir = path.join(__dirname, '../public/images');
const videosDir = path.join(__dirname, '../public/video');

const deleteFiles = (dir, filesToDelete) => {
  const allFiles = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  let deletedCount = 0;

  allFiles.forEach(file => {
    if (filesToDelete.includes(file)) {
      const filePath = path.join(dir, file);
      fs.unlinkSync(filePath);
      console.log(`[🗑️] Deleted: ${filePath}`);
      deletedCount++;
    }
  });

  return deletedCount;
};

const deletedImages = deleteFiles(imagesDir, Object.keys(cloudinaryMap.images));
const deletedVideos = deleteFiles(videosDir, Object.keys(cloudinaryMap.videos));

console.log(`\n✅ Cleanup complete: ${deletedImages} images, ${deletedVideos} videos deleted.`);
