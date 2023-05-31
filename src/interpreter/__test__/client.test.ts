import assert from "assert";
import { describe, it } from "node:test";
import { BirlClient } from "../BirlClient";
const birlClient = new BirlClient();

describe('convertToC method', ()=>{
    it('should return a string value', ()=>{
        const code = birlClient['convertToC']('HORA DO SHOW\nBIRL');
        assert.equal(typeof code, 'string');
    });
})