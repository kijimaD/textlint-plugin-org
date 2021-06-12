import { parse as orga } from 'orga';
import traverse from 'traverse';
import StructuredSource from 'structured-source';
import { nodeTypes } from './mapping';
import { TxtNode } from '@textlint/ast-node-types';

function removeUnusedProperties(node: TxtNode) {
  if (typeof node !== 'object') {
    return;
  }
  delete node.position;
}

export function parse(org: string): nodeTypes {
  const ast = orga(org);
  const src = new StructuredSource(org);
  const tr = traverse(ast);
  tr.forEach(function (node) {
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
        const { position } = node;
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
      }

      // map `url` to Link node
      if (node.type === 'Link' && typeof node.value !== 'undefined') {
        node.url = node.value;
      }
    }
    removeUnusedProperties(node);
  });
    return ast;
}
