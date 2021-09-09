import assert from 'power-assert';
import path from 'path';
import { TextlintKernel } from '@textlint/kernel';
import fs from 'fs';
import { parse } from '../src/org-to-ast';
import OrgPlugin from '../src/index';

const Syntax = require("../src/mapping").nodeTypes

describe('OrgProcessor-test', () => {
  describe('#parse', () => {
    it('should return AST', () => {
      const result = parse(`
This is text.
      `);
      assert(result.type === Syntax.document);
    });

    it('text should Paragraph', () => {
      const result = parse(`
This is text.
      `);
      const target = result.children[0];
      assert.equal(target.type, Syntax.paragraph);
    });

    it('list item should List', () => {
      const result = parse(`
- List item
      `);
      const list = result.children[0];
      const listItem = list.children[0];
      assert.equal(list.type, 'List');
      assert.equal(listItem.type, Syntax['list.item']);
    });

    it('heading should Header', () => {
      const result = parse(`
** Heading
      `);
      const section = result.children[0];
      const header = section.children[0];
      assert.equal(header.type, Syntax.headline);
    });

    it('begin_src should CodeBlock', () => {
      const result = parse(`
#+begin_src
const a = 1;
#+end_src
      `);
      const target = result.children[0];
      assert.equal(target.type, Syntax.block);
    });

    it('begin_comment should Codeblock', () => {
      const result = parse(`
#+begin_comment
This is comment.
#+end_comment
      `);
      const target = result.children[0];
      assert.equal(target.type, Syntax.block);
    });

    it('begin_quote should Codeblock', () => {
      const result = parse(`
#+begin_quote
This is quote.
#+end_quote
      `);
      const target = result.children[0];
      assert.equal(target.type, Syntax.block);
    });

    it('horizontal should HorizontalDef', () => {
      const result = parse(`
-----
      `);
      const target = result.children[0];
      assert.equal(target.type, Syntax.hr);
    });

    // inline ================

    it('inline text should Str', () => {
      const result = parse(`
This is text.
      `);
      const paragraph = result.children[0];
      const text = paragraph.children[0];
      assert.equal(text.type, Syntax['text.plain']);
    });

    it('inline code should Code', () => {
      const result = parse(`
~const a = 1;~
      `);
      const paragraph = result.children[0];
      const code = paragraph.children[0];
      assert.equal(code.type, Syntax['text.code']);
    });

    it('emphasis text should Emphasis', () => {
      const result = parse(`
*This is text.*
      `);
      const paragraph = result.children[0];
      const emphasis = paragraph.children[0];
      assert.equal(emphasis.type, Syntax['text.bold']);
    });

    it('link should Link', () => {
      const result = parse(`
[[http://example.com/][Example Domain]]
      `);
      const paragraph = result.children[0];
      const link = paragraph.children[0];
      assert.equal(link.type, Syntax.link);
      assert.equal(link.url, 'http://example.com/');
    });

    it('footnote should FootnoteReference', () => {
      const result = parse(`
[fn:1] This is a footnote
      `);
      const target = result.children[0];
      assert.equal(target.type, Syntax.footnote);
    });
  });

  const lintFile = (filePath: string, options = true) => {
    const kernel = new TextlintKernel();
    const text = fs.readFileSync(filePath, 'utf-8');
    return kernel.lintText(text, {
      filePath,
      ext: '.org',
      plugins: [
        {
          pluginId: 'org',
          plugin: OrgPlugin,
          options,
        },
      ],
      rules: [{ ruleId: 'textlint-rule-max-comma', rule: require('textlint-rule-max-comma').default }], // eslint-disable-line
    });
  };

  describe('OrgPlugin', () => {
    describe('when target file is a Org', () => {
      it('should report lint error', () => {
        const fixturePath = path.join(__dirname, '/fixtures/lint-error.org'); // eslint-disable-line
        return lintFile(fixturePath).then((results) => {
          assert(results.messages.length === 1);
          assert(results.filePath === fixturePath);
        });
      });

      it('should not comma check inside the code block', () => {
        const fixturePath = path.join(__dirname, '/fixtures/codeblock-test.org'); // eslint-disable-line
        return lintFile(fixturePath).then((results) => {
          assert(results.messages.length === 0);
        });
      });
    });
  });
});
