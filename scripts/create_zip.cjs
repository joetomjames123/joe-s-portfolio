const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = 'C:/Users/JOETOM/.gemini/antigravity/scratch/joe-tom-james-portfolio';
const videosDir = 'C:/Users/JOETOM/Videos';
if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });
const zipPath = path.join(videosDir, 'joe_tom_james_portfolio.zip');

const items = [
  path.join(sourceDir, 'src'),
  path.join(sourceDir, 'public'),
  path.join(sourceDir, 'scripts'),
  path.join(sourceDir, 'index.html'),
  path.join(sourceDir, 'package.json'),
  path.join(sourceDir, 'tsconfig.json'),
  path.join(sourceDir, 'tsconfig.node.json'),
  path.join(sourceDir, 'vite.config.ts'),
  path.join(sourceDir, 'tailwind.config.js'),
  path.join(sourceDir, 'postcss.config.js')
];

const pathsArg = items.map(p => `'${p}'`).join(', ');
const ps = `Compress-Archive -Path ${pathsArg} -DestinationPath '${zipPath}' -Force`;

console.log('Packaging project into:', zipPath);
execSync(`powershell -NoProfile -Command "${ps}"`, { stdio: 'inherit' });

if (fs.existsSync(zipPath)) {
  const stat = fs.statSync(zipPath);
  console.log('ZIP FILE CREATED SUCCESSFULLY!');
  console.log('Location:', zipPath);
  console.log('Size (bytes):', stat.size);
}

