import assert from "assert";
import { describe, it } from "node:test";
import { BirlClient } from "../BirlClient";
const birlClient = new BirlClient();

describe('convertToC method', ()=>{
    const imports = '#include <stdio.h>\n#include <math.h>\n\n';

    it('should return a string value', ()=>{
        const code = birlClient['convertToC']('HORA DO SHOW\nBIRL');
        assert.equal(typeof code, 'string');
    });

    it(`should replace "HORA DO SHOW" for "int main(void){" `, ()=>{
        const code = birlClient['convertToC']('HORA DO SHOW');
        assert.equal(imports + 'int main (void) {', code);
    });

    it(`should replace "BIRL" for "}" `, ()=>{
        const code = birlClient['convertToC']('BIRL');
        assert.equal(imports + '}', code);
    });

    it(`should replace "BORA CUMPADE" for "return" `, ()=>{
        const code = birlClient['convertToC']('BORA CUMPADE');
        assert.equal(imports + 'return', code);
    });

    it(`should replace "CE QUER VER ESSA PORRA?" for "printf" `, ()=>{
        const code = birlClient['convertToC']('CE QUER VER ESSA PORRA?');
        assert.equal(imports + 'printf', code);
    });

    it(`should replace "QUE QUE CE QUER MONSTRAO?" for "scanf" `, ()=>{
        const code = birlClient['convertToC']('QUE QUE CE QUER MONSTRAO?');
        assert.equal(imports + 'scanf', code);
    });

    it(`should replace "SAI FILHO DA PUTA" for "break" `, ()=>{
        const code = birlClient['convertToC']('SAI FILHO DA PUTA');
        assert.equal(imports + 'break', code);
    });

    it(`should replace "VAMO MONSTRO" for "continue" `, ()=>{
        const code = birlClient['convertToC']('VAMO MONSTRO');
        assert.equal(imports + 'continue', code);
    });

    it(`should replace "ELE QUE A GENTE QUER?" for "if" `, ()=>{
        const code = birlClient['convertToC']('ELE QUE A GENTE QUER?');
        assert.equal(imports + 'if  {', code);
    });

    it(`should replace "NAO VAI DAR NAO" for "else" `, ()=>{
        const code = birlClient['convertToC']('NAO VAI DAR NAO');
        assert.equal(imports + '} else {', code);
    });
})