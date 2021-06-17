/* eslint-disable */
import { parse } from "./org-to-ast";
import type { TextlintPluginOptions } from "@textlint/types";

export class OrgProcessor {
  config: TextlintPluginOptions;
  extensions: Array<string>;
  constructor(config = {}) {
    this.config = config;
    this.extensions = this.config.extensions ? this.config.extensions : [];
  }

  availableExtensions() {
    return [
      '.org',
    ];
  }

  processor(_ext: string) {
    return {
      preProcess(text: string, _filePath?: string) {
        return parse(text);
      },
      postProcess(messages: any[], filePath?: string) {
        return {
          messages,
          filePath: filePath ? filePath : '<org>',
        };
      },
    };
  }
}
