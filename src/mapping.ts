import { ASTNodeTypes } from "@textlint/ast-node-types";

export const nodeTypes = {
  document: ASTNodeTypes.Document,
  paragraph: ASTNodeTypes.Paragraph,
  list: ASTNodeTypes.List,
  'list.item': ASTNodeTypes.ListItem,
  headline: ASTNodeTypes.Header,
  block: ASTNodeTypes.CodeBlock,
  hr: ASTNodeTypes.HorizontalRule,
  // inline block
  plain: ASTNodeTypes.Str,
  code: ASTNodeTypes.Code,
  bold: ASTNodeTypes.Emphasis,
  link: ASTNodeTypes.Link,
  footnote: 'FootnoteReference',
};
