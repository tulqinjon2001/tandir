/**
 * Logo, hero va mahsulot rasmlarini optimallashtirish.
 * Build: npm run optimize-images. Sharp kerak: npm i -D sharp
 */
import { mkdir, readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, "..", "public", "images");

async function run() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.log("Rasmlar optimallashtirilmadi: sharp o'rnatilmagan (npm i -D sharp)");
    process.exit(0);
  }

  await mkdir(imagesDir, { recursive: true });

  try {
    await sharp(join(imagesDir, "logo.png"))
      .resize(100, 100)
      .png({ quality: 85 })
      .toFile(join(imagesDir, "logo-small.png"));
    console.log("✓ logo-small.png (100x100)");
  } catch (e) {
    console.warn("logo-small.png:", e.message);
  }

  try {
    await sharp(join(imagesDir, "hero-bg.jpg"))
      .webp({ quality: 80 })
      .toFile(join(imagesDir, "hero-bg.webp"));
    console.log("✓ hero-bg.webp");
  } catch (e) {
    console.warn("hero-bg.webp:", e.message);
  }

  const files = await readdir(imagesDir).catch(() => []);
  const tandirImages = files.filter(
    (f) =>
      (f.startsWith("tandir-mosaic-") || f.startsWith("tandir-simple-")) &&
      /\.(png|jpg|jpeg)$/i.test(f)
  );
  for (const file of tandirImages) {
    const base = file.replace(/\.(png|jpg|jpeg)$/i, "");
    const inputPath = join(imagesDir, file);
    try {
      await sharp(inputPath)
        .webp({ quality: 82 })
        .toFile(join(imagesDir, `${base}.webp`));
      await sharp(inputPath)
        .resize(320)
        .webp({ quality: 80 })
        .toFile(join(imagesDir, `${base}-320.webp`));
      console.log("  ✓", base + ".webp + " + base + "-320.webp");
    } catch (e) {
      console.warn("  ", base, e.message);
    }
  }
}

run().catch(() => process.exit(0));
