/* eslint-disable */
import { parse } from "./org-to-ast";

export default class OrgProcessor {
  constructor(config) {
    this.config = config;
    this.extensions = this.config.extensions ? this.config.extensions : [];
  }

  static availableExtensions() {
    return [
      '.org',
    ];
  }

  processor(ext) {
    return {
      preProcess(text, filePath) {
        return parse(text);
      },
      postProcess(messages, filePath) {
        return {
          messages,
          filePath: filePath ? filePath : '<org>',
        };
      },
    };
  }
}
