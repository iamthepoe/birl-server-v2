import assert from 'assert';
import { describe, it } from 'node:test';
import { BirlClient } from '../BirlClient';
const birlClient = new BirlClient();

describe('convertToC method', () => {
  const imports = '#include <stdio.h>\n#include <math.h>\n\n';

  it('should return a string value', () => {
    const code = birlClient['convertToC']('HORA DO SHOW\nBIRL');
    assert.equal(typeof code, 'string');
  });

  it(`should replace "HORA DO SHOW" for "int main(void){" `, () => {
    const code = birlClient['convertToC']('HORA DO SHOW');
    assert.strictEqual(code, imports + 'int main (void) {');
  });

  it(`should replace "BIRL" for "}" `, () => {
    const code = birlClient['convertToC']('BIRL');
    assert.strictEqual(code, imports + '}');
  });

  it(`should replace "BORA CUMPADE" for "return" `, () => {
    const code = birlClient['convertToC']('BORA CUMPADE');
    assert.strictEqual(code, imports + 'return');
  });

  it(`should replace "CE QUER VER ESSA PORRA?" for "printf" `, () => {
    const code = birlClient['convertToC']('CE QUER VER ESSA PORRA?');
    assert.strictEqual(code, imports + 'printf');
  });

  it(`should replace "QUE QUE CE QUER MONSTRAO?" for "scanf" `, () => {
    const code = birlClient['convertToC']('QUE QUE CE QUER MONSTRAO?');
    assert.strictEqual(code, imports + 'scanf');
  });

  it(`should replace "SAI FILHO DA PUTA" for "break" `, () => {
    const code = birlClient['convertToC']('SAI FILHO DA PUTA');
    assert.strictEqual(code, imports + 'break');
  });

  it(`should replace "VAMO MONSTRO" for "continue" `, () => {
    const code = birlClient['convertToC']('VAMO MONSTRO');
    assert.strictEqual(code, imports + 'continue');
  });

  it(`should replace "ELE QUE A GENTE QUER?" for "if" `, () => {
    const code = birlClient['convertToC']('ELE QUE A GENTE QUER?');
    assert.strictEqual(code, imports + 'if  {');
  });

  it(`should replace "NAO VAI DAR NAO" for "else" `, () => {
    const code = birlClient['convertToC']('NAO VAI DAR NAO');
    assert.strictEqual(code, imports + '} else {');
  });

  it(`should replace "QUE NUM VAI DAR O QUE?" for "else if" `, () => {
    const code = birlClient['convertToC']('QUE NUM VAI DAR O QUE?');
    assert.strictEqual(code, imports + '} else if  {');
  });

  it(`should replace "QUE NAO VAI DAR O QUE?" for "else if" `, () => {
    const code = birlClient['convertToC']('QUE NAO VAI DAR O QUE?');
    assert.strictEqual(code, imports + '} else if  {');
  });

  it(`should replace "NEGATIVA BAMBAM" for "while" `, () => {
    const code = birlClient['convertToC']('NEGATIVA BAMBAM');
    assert.strictEqual(code, imports + 'while  {');
  });

  it(`should replace "MAIS QUERO MAIS" for "for" `, () => {
    const code = birlClient['convertToC']('MAIS QUERO MAIS');
    assert.strictEqual(code, imports + 'for  {');
  });

  it(`should replace "OH O HOME AI PO" for " {" `, () => {
    const code = birlClient['convertToC']('OH O HOME AI PO ()');
    assert.strictEqual(code, imports + ' {');
  });

  it(`should replace "AJUDA O MALUCO TA DOENTE" for "" `, () => {
    const code = birlClient['convertToC']('AJUDA O MALUCO TA DOENTE');
    assert.equal(code, imports + ' ');
  });

  it(`should replace "AJUDA O MALUCO QUE TA DOENTE" for "" `, () => {
    const code = birlClient['convertToC']('AJUDA O MALUCO TA DOENTE');
    assert.equal(code, imports + ' ');
  });
  
});
