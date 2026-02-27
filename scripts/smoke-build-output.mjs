import { existsSync, statSync } from 'node:fs';

const outputPath = '.next';

if (!existsSync(outputPath)) {
  console.error(`Smoke check failed: ${outputPath} does not exist. Run \"yarn build\" first.`);
  process.exit(1);
}

const stats = statSync(outputPath);
if (!stats.isDirectory()) {
  console.error(`Smoke check failed: ${outputPath} exists but is not a directory.`);
  process.exit(1);
}

console.log(`Smoke check passed: ${outputPath} directory is present.`);
