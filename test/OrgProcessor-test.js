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
This is text.
      `);
      assert(result.type === 'document');
    });

    it('begin_src should block', () => {
      const result = parse(`
#+begin_src
const a = 1;
#+end_src
      `);
      const script = result.children[0];
      assert.equal(script.type, 'block');
    });

    it('text should paragraph', () => {
      const result = parse(`
This is text.
      `);
      const text = result.children[0];
      assert.equal(text.type, 'paragraph');
    });

    it('begin_comment should block', () => {
      const result = parse(`
#+begin_comment
This is comment.
#+end_comment
      `);
      const comment = result.children[0];
      assert.equal(comment.type, 'block');
    });
  });
});
