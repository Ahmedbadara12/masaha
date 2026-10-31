import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const baseHref = process.argv[2] ?? '/masaha/';
if (!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(baseHref)) {
  throw new Error('Use a base path with leading and trailing slashes, e.g. /masaha/ or /.');
}
const result = spawnSync(
  process.execPath,
  ['node_modules/@angular/cli/bin/ng.js', 'build', '--base-href', baseHref],
  { stdio: 'inherit' },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

// GitHub Pages cannot interpret _redirects. Emit entry pages for clean deep links.
const moduleUrl = (source) =>
  `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const compile = (file) =>
  ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
const modelsUrl = moduleUrl(compile('src/app/core/models.ts'));
const { projects } = await import(
  moduleUrl(compile('src/app/core/data.ts').replace("'./models'", JSON.stringify(modelsUrl)))
);
const slugs = projects.map((project) => project.slug);
if (slugs.length !== 6)
  throw new Error('Expected six project slugs for GitHub Pages route entry points.');
const html = readFileSync('dist/index.html', 'utf8');
for (const route of ['services', 'projects', 'quote', ...slugs.map((slug) => `projects/${slug}`)]) {
  const directory = path.join('dist', route);
  mkdirSync(directory, { recursive: true });
  writeFileSync(path.join(directory, 'index.html'), html);
}
writeFileSync('dist/404.html', html);
writeFileSync('dist/.nojekyll', '');
console.log(`GitHub Pages build ready in dist (base: ${baseHref}).`);
