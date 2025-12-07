// Simple build script to assemble index.html from section partials
// No external dependencies required
const fs = require("fs");
const path = require("path");

const root = __dirname;
const sectionsDir = path.join(root, "sections");
const outputFile = path.join(root, "index.html");

const parts = [
  "layout-head",
  "hero",
  "intro",
  "why",
  "promise",
  "process",
  "services-carousel",
  "gallery",
  "services-grid",
  "partner",
  "reviews",
  "consultation",
  "layout-foot",
];

try {
  const content = parts
    .map((name) => fs.readFileSync(path.join(sectionsDir, `${name}.html`), "utf8"))
    .join("\n");

  fs.writeFileSync(outputFile, content, "utf8");
  console.log("✅ index.html built from partials.");
} catch (err) {
  console.error("❌ Build failed:", err.message);
  process.exit(1);
}

