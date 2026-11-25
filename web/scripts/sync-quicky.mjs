// Копирует дизайн Quicky (../design/quicky) в public/quicky — его открывают с телефона по /quicky.
// Источник правды — design/quicky (его же собирает mac/build.sh). Копия в public закоммичена,
// чтобы сборка на Vercel работала, даже если папка вне web/ недоступна.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const web = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(web, "..", "design", "quicky");
const dst = join(web, "public", "quicky");
const files = ["index.html", "manifest.webmanifest", "icon.svg", "icon-512.png", "logo.svg", "blize.ttf"];

// На Vercel папка вне web/ может быть неполной — тогда берём закоммиченную копию.
const have = files.filter((f) => existsSync(join(src, f)));
if (have.length < files.length) {
  console.log("sync-quicky: design/quicky недоступен целиком — оставляю public/quicky как есть");
} else {
  mkdirSync(dst, { recursive: true });
  for (const f of files) copyFileSync(join(src, f), join(dst, f));
  console.log(`sync-quicky: ${files.length} файлов → public/quicky`);
}
