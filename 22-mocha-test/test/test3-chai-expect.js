const chai = require('chai');
const { describe, it } = require('mocha');
const expect = chai.expect;

describe("chai.expect Demo", () => {
    it('use expect lib', () => {
        const value = 'hello';
        const number = 3;

        expect(number).to.be.at.most(5);
        expect(number).to.be.at.least(3);
        expect(number).to.be.within(1,4);

        expect(value).to.exist;
        expect(value).to.be.a('string');
        expect(value).to.have.length(5);
        expect(value).to.equal('hello');
        expect(value).to.not.equal('dddd');
        expect(value).to.be.length(5);
    })
})