FROM node:19 AS run

RUN npm install -g textlint textlint-plugin-org textlint-rule-preset-ja-technical-writing
