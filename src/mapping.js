export const tagNameToType = {
  'p': 'Paragraph',
  'ui': 'ListItem',
  'li': 'List',
  'q': 'BlockQuote',
  'blockquote': 'BlockQuote',
  'code': 'CodeBlock',
  'hr': 'horizontalRule',
  'br': 'break',
  'em': 'Emphasis',
  'strong': 'Strong',
  'a': 'Link',
  'img': 'Image'
};

export const nodeTypes = {
  'document': 'Document',
  'paragraph': 'Paragraph',
  'block': 'BlockQuote',
  'listItem': 'ListItem',
  'list': 'List',
  'Bullet': 'Bullet', // no need?
  'heading': 'Header',
  'code': 'CodeBlock',
  'comment': 'Comment',
  'HtmlBlock': 'Html',
  'ReferenceDef': 'ReferenceDef',
  'horizontalRule': 'HorizontalRule',
  // inline block
  'text': 'Str',
  'break': 'Break',
  'emphasis': 'Emphasis',
  'strong': 'Strong',
  'html': 'Html',
  'link': 'Link',
  'image': 'Image',
  'inlineCode': 'Code',
  'yaml': 'Yaml'
};
