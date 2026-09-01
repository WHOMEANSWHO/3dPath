import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

const BASE = "http://localhost:4173";
const OUT = "/mnt/user-data/outputs";

const FRAMES = [
  { file: "01-home-portrait-1080x1920.png", path: "/?scene=midway", w: 1080, h: 1920 },
  { file: "02-lesson-portrait-1080x1920.png", path: "/lessons/6?scene=clip", w: 1080, h: 1920 },
  { file: "03-home-landscape-1920x1080.png", path: "/?scene=midway", w: 1920, h: 1080 },
  { file: "04-lesson-landscape-1920x1080.png", path: "/lessons/6?scene=clip", w: 1920, h: 1080 },
  { file: "05-lesson-wide-2560x1440.png", path: "/lessons/6?scene=clip", w: 2560, h: 1440 },
  { file: "06-lesson-complete-1920x1080.png", path: "/lessons/6?scene=complete", w: 1920, h: 1080 },
  { file: "07-lesson-gatefailed-1080x1920.png", path: "/lessons/6?scene=failed", w: 1080, h: 1920 },
];

const executablePath = await chromium.executablePath();
const browser = await puppeteer.launch({
  args: [...chromium.args, "--hide-scrollbars", "--force-device-scale-factor=1"],
  executablePath,
  headless: "shell",
  defaultViewport: null,
});

const page = await browser.newPage();
for (const f of FRAMES) {
  await page.setViewport({ width: f.w, height: f.h, deviceScaleFactor: 1 });
  await page.goto(BASE + f.path, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 350));
  await page.screenshot({ path: `${OUT}/${f.file}` });
  console.log("shot", f.file);
}
await browser.close();
