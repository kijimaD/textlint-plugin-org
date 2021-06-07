import { test, isTxtAST } from '@textlint/ast-tester';
import { parse } from 'orga';

// recommenced: test much pattern test
const AST = parse('This is text');
test(AST);// if the AST is invalid, then throw Error
isTxtAST(AST);// true or false
