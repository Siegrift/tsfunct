from os import listdir
from re import match

with open('src/index.ts') as f:
  exports = [x.strip() for x in f.readlines()]

# verify exports structure (and create the export names)
exportNames = set()
for e in exports:
  m = match("^export { default as (.*) } from '(.*)';$", e)
  if not m:
    # allow export * for modules that have multiple exports
    if match("^export \* from '(.*)';$", e): continue
    print(f'Line "{e}" is not a valid export!')
    exit(1)

  g = m.groups()
  if len(g) != 2 or f'./{g[0]}' != g[1]:
    print(f'Export "{e}" doesn\'t match the library folder name!')
    exit(1)

  exportNames.add(g[0])

# verify that all helpers are exported (except the ignored ones)
ignored = set(['common', 'go', 'index.ts', 'tsconfig.json'])
srcFolders = set(listdir('src'))
diff = srcFolders.difference(ignored.union(exportNames))
if len(diff) != 0:
  print(f'Found non-exported folder names {diff}!')
  exit(1)

print('All helpers are correctly exported by "index.ts"!')
