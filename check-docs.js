const { execSync } = require('child_process');
const { mkdtempSync } = require('fs');
const { tmpdir } = require('os');
const { join } = require('path');

const docsDir = mkdtempSync(join(tmpdir(), 'tsfunct-docs-check'));
execSync(`DOCS_OUT_DIR=${docsDir} yarn docs:raw`, { stdio: 'inherit' });

execSync(`diff --no-dereference ${docsDir} ${join(__dirname, './docs')}`, {
  stdio: 'inherit',
});
