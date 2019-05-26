/* Validates that all exported functions from lodash are also exported from tsfunct library.
 *
 * You can run the validator with the following command:
 * ./node_modules/typescript/bin/tsc --target "ES5" --outDir 'validator/build' ./validator/all-lodash-exports.ts && node ./validator/build/validator/all-lodash-exports.js
 */
import * as tsfunct from '../index'
import * as lodash from 'lodash'

const unexported = []
const ignored = [
  '_',
  'assign',
  'assignIn',
  'assignInWith',
  'assignWith',
  'defaults',
  'defaultsDeep',
  'pull',
  'pullAll',
  'pullAllBy',
  'pullAllWith',
  'pullAt',
  'remove',
]

for (const fn in lodash) {
  if (!lodash.hasOwnProperty(fn)) continue

  if (
    !ignored.includes(fn) &&
    !tsfunct.hasOwnProperty(fn) &&
    // https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
    {}.toString.call((lodash as any)[fn]) === '[object Function]'
  ) {
    unexported.push(fn)
  }
}

if (unexported.length) {
  console.log('--------------------------------------------------')
  console.log('   FOLLOWING LODASH FUNCTIONS ARE NOT EXPORTED:   ')
  console.log('--------------------------------------------------')

  unexported.sort((a, b) => (a < b ? -1 : 1))
  unexported.forEach((fn) => {
    console.log(fn)
  })

  console.log('--------------------------------------------------')
  console.log(`TOTAL ENTRIES: ${unexported.length}`)
  console.log('--------------------------------------------------')

  // exit with error code
  process.exit(1)
} else {
  console.log('--------------------------------------------------')
  console.log('        ALL LODASH FUNCTIONS ARE EXPORTED         ')
  console.log('--------------------------------------------------')
}
