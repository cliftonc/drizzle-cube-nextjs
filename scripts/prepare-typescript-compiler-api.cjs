const { mkdirSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const shimPath = join(process.cwd(), 'node_modules', 'typescript', 'lib', 'typescript.js');

mkdirSync(join(process.cwd(), 'node_modules', 'typescript', 'lib'), { recursive: true });
writeFileSync(
  shimPath,
  '// Placeholder for tools that probe the legacy TypeScript compiler API path.\n'
);
