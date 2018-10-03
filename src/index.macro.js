import { createMacro } from 'babel-plugin-macros';
import parse from "babel-literal-to-ast";
import gql from "graphql-tag";

module.exports = createMacro(graphqlTagMacro);

function graphqlTagMacro({ references, babel }) {
  references.default.forEach(path => {
    if (path.parentPath.type === "TaggedTemplateExpression") {
      compile(babel, path.parentPath);
    }
  });
};

function compile(babel, path) {
  const t = babel.types;
  const source = path.node.quasi.quasis.map(node => node.value.raw).join("");
  const expressions = path.get('quasi').get('expressions');

  expressions.forEach((expr) => {
    if (!t.isIdentifier(expr) && !t.isMemberExpression(expr)) {
      throw expr.buildCodeFrameError('Only identifiers or member expressions are allowed by this macro as an interpolation in a graphql template literal.');
    }
  });

  const compiled = parse(gql(source));

  if (expressions.length) {
    const definitionsProperty = compiled.properties.find(p => p.key.value === 'definitions');
    const definitionsArray = definitionsProperty.value;

    const extraDefinitions = expressions.map((expr) =>
      t.memberExpression(expr.node, t.identifier('definitions'))
    );

    definitionsProperty.value = t.callExpression(
      t.memberExpression(definitionsArray, t.identifier('concat')),
      extraDefinitions
    );
  }

  path.replaceWith(compiled);
}
