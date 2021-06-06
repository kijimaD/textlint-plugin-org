import assert from 'power-assert';
import { parse } from 'orga';
// import OrgPlugin from '../src/index';
// import { TextLintCore } from 'textlint';
// const { orgToPlainText } = OrgPlugin.Processor;
// import path from 'path';

describe('OrgProcessor-test', () => {
  describe('#parse', () => {
    it('should return AST', () => {
      const result = parse(`
** heading
text
      `);
      assert(result.type === 'document');
    });

    it('script should block', () => {
      const result = parse(`
#+begin_src
const a = 1;
#+end_src
      `);
      const script = result.children[0];
      assert.equal(script.type, 'block');
    });
  });
});
