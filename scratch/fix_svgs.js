const fs = require('fs');
const path = require('path');

const logoDir = "c:\\Users\\singh\\OneDrive\\Desktop\\gaurav new portfolio\\public\\logos";

try {
  const files = fs.readdirSync(logoDir);
  let count = 0;

  files.forEach(file => {
    if (path.extname(file).toLowerCase() === '.svg') {
      const filePath = path.join(logoDir, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // Check if width is already present
      if (!content.includes('width=')) {
        // Inject width and height properties into the root svg tag
        content = content.replace(/<svg/i, '<svg width="128" height="128"');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully fixed SVG structure: ${file}`);
        count++;
      } else {
        console.log(`SVG already compatible: ${file}`);
      }
    }
  });

  console.log(`Done. Updated ${count} SVG files for WebGL compatibility.`);
} catch (err) {
  console.error("Error updating SVG assets:", err);
}
