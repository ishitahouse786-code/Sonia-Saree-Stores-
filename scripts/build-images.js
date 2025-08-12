import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputFolder = "./raw-images";  // আপনার আসল ইমেজ রাখবেন এখানে
const outputFolder = "./public/images"; // অ্যাপে ব্যবহারের জন্য

if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

if (!fs.existsSync(inputFolder)) {
  console.error(`Input folder not found: ${inputFolder}`);
  process.exit(0);
}

fs.readdirSync(inputFolder).forEach(file => {
  const fileName = path.parse(file).name;
  [400, 800, 1200].forEach(size => {
    sharp(path.join(inputFolder, file))
      .resize(size)
      .webp({ quality: 80 })
      .toFile(path.join(outputFolder, `${fileName}-${size}.webp`))
      .then(() => console.log(`✅ ${fileName}-${size}.webp তৈরি হয়েছে`))
      .catch(err => console.error(err));
  });
});