const chai = require('chai');
const { describe, it } = require('mocha');
chai.should();

describe('chai.should Demo', () => {
    it('use should lib', () => {
        const value = 'hello';
        value.should.exist.and.equal('hello').and.have.length(5).and.be.a('string')
        // value.should.be.a('string')
        // value.should.equal('hello')
        // value.should.not.equal('hello2')
        // value.should.have.length(5);
    })
})