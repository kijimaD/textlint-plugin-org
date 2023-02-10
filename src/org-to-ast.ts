import { parse as orga } from 'orga';
import traverse from 'traverse';
import { StructuredSource } from 'structured-source';
import { nodeTypes, Loc } from './mapping';
import { TxtNode } from "@textlint/ast-node-types";

export function parse(org: string): any { // eslint-disable-line
  // TODO: Define return value type.
  const ast = orga(org);
  const src = new StructuredSource(org);
  traverse(ast).forEach(function (node: TxtNode) {
    if (this.notLeaf) {
      delete node.parent;

      // AST node has type and position
      if (node.type && node.position) {
        node.type = nodeTypes[node.type as keyof typeof nodeTypes];
      }

      if (typeof node.type === 'undefined') {
        node.type = 'UNKNOWN';
      }

      // map `range`, `loc` and `raw` to node
      if (typeof node.position === 'object') {
        const position = node.position as Loc;
        // Maybe prefer `const { position } = node;`, pure functional. But can't resolve eslint caution...

        // TxtNode's line start with 1
        // TxtNode's column start with 0
        const positionCompensated = {
          start: { line: position.start.line, column: position.start.column - 1 },
          end: { line: position.end.line, column: position.end.column - 1 },
        };
        const range = src.locationToRange(positionCompensated);
        node.loc = positionCompensated;
        node.range = range;
        node.raw = org.slice(range[0], range[1]);
        Object.defineProperty(node, "position", {
          enumerable: false,
          configurable: false,
          writable: false,
          value: position
        });
      }

      // map `url` to Link node
      if (node.type === 'Link' && typeof node.value !== 'undefined') {
        node.url = node.value as string;
      }
    }
  });
  return ast;
}
