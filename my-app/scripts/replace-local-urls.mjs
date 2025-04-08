import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..'); // Go back to project root
const cloudinaryMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'cloudinary-map.json'), 'utf8'));
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.html'];

const getAllFiles = (dir) => {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !['node_modules', '.next', '.git', 'scripts'].includes(file)) {
      results = results.concat(getAllFiles(fullPath));
    } else if (extensions.includes(path.extname(file))) {
      results.push(fullPath);
    }
  });
  return results;
};

const replaceUrlsInFile = (filePath, imageMap, videoMap) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace images
  for (const [file, url] of Object.entries(imageMap)) {
    const regex = new RegExp(`(["'\`])\\/images\\/${file}\\1`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `$1${url}$1`);
      changed = true;
    }
  }

  // Replace videos
  for (const [file, url] of Object.entries(videoMap)) {
    const regex = new RegExp(`(["'\`])\\/video\\/${file}\\1`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `$1${url}$1`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[✔] Updated: ${filePath}`);
  }
};

const allFiles = getAllFiles(projectRoot);
allFiles.forEach(file => replaceUrlsInFile(file, cloudinaryMap.images, cloudinaryMap.videos));

console.log('\n✅ All local image/video paths replaced with Cloudinary URLs!');
