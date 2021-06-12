import assert from 'power-assert';
import path from 'path';
import { TextlintKernel } from '@textlint/kernel';
import fs from 'fs';
import { parse } from '../src/org-to-ast.ts';
import OrgPlugin from '../src/index.ts';

describe('OrgProcessor-test', () => {
  describe('#parse', () => {
    it('should return AST', () => {
      const result = parse(`
This is text.
      `);
      assert(result.type === 'Document');
    });

    it('heading should Header', () => {
      const result = parse(`
** Heading
      `);
      const section = result.children[0];
      const header = section.children[0];
      assert.equal(header.type, 'Header');
    });

    it('list item should List', () => {
      const result = parse(`
- List item
      `);
      const list = result.children[0];
      const listItem = list.children[0];
      assert.equal(list.type, 'List');
      assert.equal(listItem.type, 'ListItem');
    });

    it('horizontal should HorizontalDef', () => {
      const result = parse(`
-----
      `);
      const target = result.children[0];
      assert.equal(target.type, 'HorizontalDef');
    });

    it('begin_src should CodeBlock', () => {
      const result = parse(`
#+begin_src
  const a = 1;
#+end_src
      `);
      const target = result.children[0];
      assert.equal(target.type, 'CodeBlock');
    });

    it('begin_comment should Codeblock', () => {
      const result = parse(`
#+begin_comment
  This is comment.
#+end_comment
      `);
      const target = result.children[0];
      assert.equal(target.type, 'CodeBlock');
    });

    it('begin_quote should Codeblock', () => {
      const result = parse(`
#+begin_quote
  This is quote.
#+end_quote
      `);
      const target = result.children[0];
      assert.equal(target.type, 'CodeBlock');
    });

    it('text should Paragraph', () => {
      const result = parse(`
This is text.
      `);
      const target = result.children[0];
      assert.equal(target.type, 'Paragraph');
    });

    // inline

    it('inline text should Str', () => {
      const result = parse(`
This is text.
      `);
      const paragraph = result.children[0];
      const text = paragraph.children[0];
      assert.equal(text.type, 'Str');
    });

    it('inline code should Code', () => {
      const result = parse(`
~const a = 1;~
      `);
      const paragraph = result.children[0];
      const code = paragraph.children[0];
      assert.equal(code.type, 'Code');
    });

    it('emphasis text should Emphasis', () => {
      const result = parse(`
*This is text.*
      `);
      const paragraph = result.children[0];
      const emphasis = paragraph.children[0];
      assert.equal(emphasis.type, 'Emphasis');
    });

    it('link should Link', () => {
      const result = parse(`
[[http://example.com/][Example Domain]]
      `);
      const paragraph = result.children[0];
      const link = paragraph.children[0];
      assert.equal(link.type, 'Link');
      assert.equal(link.url, 'http://example.com/');
    });

    it('footnote should FootnoteReference', () => {
      const result = parse(`
[fn:1] This is a footnote
      `);
      const target = result.children[0];
      assert.equal(target.type, 'FootnoteReference');
    });
  });

  const lintFile = (filePath, options = true) => {
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
      rules: [{ ruleId: 'textlint-rule-max-comma', rule: require('textlint-rule-max-comma').default }],
    });
  };

  describe('OrgPlugin', () => {
    context('when target file is a Org', () => {
      it('should report lint error', () => {
        const fixturePath = path.join(__dirname, '/fixtures/lint-error.org');
        return lintFile(fixturePath).then((results) => {
          assert(results.messages.length > 0);
          assert(results.filePath === fixturePath);
        });
      });

      it('should not comma check inside the code block.', () => {
        const fixturePath = path.join(__dirname, '/fixtures/codeblock-test.org');
        return lintFile(fixturePath).then((results) => {
          assert(results.messages.length === 0);
        });
      });
    });
  });
});
