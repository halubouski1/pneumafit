const fs = require('fs/promises');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const skippedNames = new Set([
  '.git',
  '.agents',
  '.codex',
  'dist',
  'node_modules',
  'scripts',
  'package.json',
  'package-lock.json',
]);

const obfuscatorOptions = {
  compact: true,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  selfDefending: false,
  debugProtection: false,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  sourceMap: false,
};

async function ensureParentDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function obfuscateJavaScript(srcPath, destPath) {
  const source = await fs.readFile(srcPath, 'utf8');
  const result = JavaScriptObfuscator.obfuscate(source, obfuscatorOptions);

  await ensureParentDir(destPath);
  await fs.writeFile(destPath, result.getObfuscatedCode(), 'utf8');
}

async function copyFile(srcPath, destPath) {
  await ensureParentDir(destPath);
  await fs.copyFile(srcPath, destPath);
}

async function copyTree(srcDir, destDir) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    if (skippedNames.has(entry.name)) {
      continue;
    }

    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      await copyTree(srcPath, destPath);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (path.extname(entry.name) === '.map') {
      continue;
    }

    if (path.extname(entry.name) === '.js') {
      await obfuscateJavaScript(srcPath, destPath);
      continue;
    }

    await copyFile(srcPath, destPath);
  }
}

async function build() {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });
  await copyTree(projectRoot, distDir);
  console.log(`Production build created at ${path.relative(projectRoot, distDir)}`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
