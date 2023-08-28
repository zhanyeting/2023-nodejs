const chai = require('chai');
const { describe, it } = require('mocha');
const sum = require('../sum');
const assert = chai.assert;

describe('chai.assert Demo', () => {
    it("use assert lib", () => {
        const value = 'hello';
        assert.typeOf(value, 'string')
        assert.lengthOf(value, 5);
        assert.equal(value, 'hello');
    })
})