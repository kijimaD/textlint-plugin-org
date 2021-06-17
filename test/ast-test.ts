import assert from 'power-assert';
import { test, isTxtAST } from '@textlint/ast-tester';
import { parse } from '../src/org-to-ast';

describe('Compliance tests', function () {
  describe('compatible for Unist', function () {
    it('should have position', function () {
      const AST = parse('text');
      test(AST); // if the AST is invalid, then throw Error
      assert(isTxtAST(AST) === true)
      assert(typeof AST.position === 'object');
      assert(typeof AST.position.start === 'object');
      assert(typeof AST.position.start.line === 'number');
      assert(typeof AST.position.start.column === 'number');
      assert(typeof AST.position.end === 'object');
      assert(typeof AST.position.end.line === 'number');
      assert(typeof AST.position.end.column === 'number');
    });
  });
});
