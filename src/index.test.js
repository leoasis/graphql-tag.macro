import path from 'path';
import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';

pluginTester({
  plugin,
  snapshot: true,
  tests: withFilename([
    `
      import gql from './index.macro'

      const query = gql\`
        query Foo {
          foo {
            bar
            baz
          }
        }
      \`;
    `,
    `
      import gql from './index.macro'

      const frag = gql\`
        fragment ChiFrag on Chi {
          var
          char
        }
      \`;

      const frag2 = gql\`
        fragment FooFrag on Foo {
          qux
          chi {
            ...ChiFrag
          }
        }
        \$\{frag\}
      \`;

      const query = gql\`
        query Foo {
          foo {
            bar
            baz
            ...FooFrag
          }
        }
        \$\{frag2\}
      \`;
    `,
  ]),
})

/*
 * This adds the filename to each test so you can do require/import relative
 * to this test file.
 */
function withFilename(tests) {
  return tests.map(t => {
    const test = {babelOptions: {filename: __filename}}
    if (typeof t === 'string') {
      test.code = t
    } else {
      Object.assign(test, t)
    }
    return test
  })
}
