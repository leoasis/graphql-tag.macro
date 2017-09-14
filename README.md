# graphql-tag.macro

Babel Macro for the [graphql-tag](https://github.com/apollographql/graphql-tag) library.

# What it does

It inlines the result of parsing the GraphQL queries with `graphql-tag`.

Converts this:

```js
const query = gql`
  query {
    hello {
      world
    }
  }
`;
```

To this:

```js
const query = {
  'kind': 'Document',
  'definitions': [{
    'kind': 'OperationDefinition',
    'operation': 'query',
    'variableDefinitions': [],
    'directives': [],
    'selectionSet': {
      'kind': 'SelectionSet',
      'selections': [{
        'kind': 'Field',
        'alias': null,
        'name': {
          'kind': 'Name',
          'value': 'hello'
        },
        'arguments': [],
        'directives': [],
        'selectionSet': {
          'kind': 'SelectionSet',
          'selections': [{
            'kind': 'Field',
            'alias': null,
            'name': {
              'kind': 'Name',
              'value': 'world'
            },
            'arguments': [],
            'directives': [],
            'selectionSet': null
          }]
        }
      }]
    }
  }],
  'loc': {
    'start': 0,
    'end': 45,
    'source': {
      'body': '\\\\n  query {\\\\n    hello {\\\\n      world\\\\n    }\\\\n  }\\\\n',
      'name': 'GraphQL request',
      'locationOffset': {
        'line': 1,
        'column': 1
      }
    }
  }
};
```

It also supports adding interpolated fragments:

```js
const frag = gql`
  fragment Frag on Hello {
    world
  }
`;

const query = gql`
  query {
    hello {
      universe
      ...Frag
    }
  }

  ${frag}
`;
```

# Why

To avoid the runtime overhead of parsing a string into a GraphQL AST.

# Installation and setup

[Install](https://github.com/kentcdodds/babel-macros#installation) and [configure](https://github.com/kentcdodds/babel-macros/blob/master/other/docs/user.md) babel-macros if you haven't already.

Then install this package:

```
# with yarn
yarn add -D graphql-tag.macro

# with npm
npm install -D graphql-tag.macro
```

# Usage

The usage is the same as using [graphql-tag](https://github.com/apollographql/graphql-tag) directly, the only difference is that you have to import `gql` from the macro now:

```js
import gql from 'graphql-tag.macro';

const query = gql`
  query {
    hello {
      world
    }
  }
`;
```

