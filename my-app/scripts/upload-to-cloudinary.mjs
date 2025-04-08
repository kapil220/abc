import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
    cloud_name: 'dmqkf89ib',
    api_key: '691942541491222',
    api_secret: 'kGPgNwl__rQceEwWigdiNPypOg0'
  });

const uploadFolder = async (folderPath, cloudFolder, resourceType) => {
  const files = fs.readdirSync(folderPath);
  const uploadedMap = {};

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: cloudFolder,
        resource_type: resourceType
      });
      uploadedMap[file] = result.secure_url;
      console.log(`[✔] ${file} uploaded → ${result.secure_url}`);
    } catch (err) {
      console.error(`[✖] Error uploading ${file}:`, err.message);
    }
  }

  return uploadedMap;
};

const run = async () => {
  const imageMap = await uploadFolder('./public/images', 'landing/images', 'image');
  const videoMap = await uploadFolder('./public/video', 'landing/videos', 'video');

  fs.writeFileSync(
    './scripts/cloudinary-map.json',
    JSON.stringify({ images: imageMap, videos: videoMap }, null, 2)
  );

  console.log('\n✅ All uploads complete. URLs saved to cloudinary-map.json');
};

run();



