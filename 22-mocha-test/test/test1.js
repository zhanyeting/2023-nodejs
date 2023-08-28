const { describe, it } = require('mocha');
const sum = require('../sum');
const assert = require('assert');
const chai = require('chai');
const assert2 = chai.assert;
const expect = chai.expect;
chai.should();


// // assert.strictEqual(sum(), 10);   // 会报错
// assert.strictEqual(sum(), 0);
// assert.strictEqual(sum(1), 1);
// assert.strictEqual(sum(1,2,3), 6);

describe('parent group test', () => {
    describe('child 001 group test', () => {
        it('sum() return 0', () => {
            assert.strictEqual(sum(), 0);
        })
        it('sum(1) must return 1', () => {
            assert2.equal(sum(1), 1);
        })
        it('sum(1) should exist and equal 1', () => {
            sum(1).should.exist.and.equal(1);
        })
    })

    describe('child 002 group test', () => {
        it('sum(1,2) return 3', () => {
            assert.strictEqual(sum(1,2), 3);
        })
        it('sum(1,2,3) return 6', () => {
            assert.strictEqual(sum(1,2,3), 6);
        })
        it('sum(1,2,3,4) expect to be 10', () => {
            expect(sum(1,2,3,4)).to.exist;
            expect(sum(1,2,3,4)).to.equal(10);
        })
    })
})
