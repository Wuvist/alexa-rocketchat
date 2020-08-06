const { replaceWhitespacesDots } = require('../helperFunctions');

const assert = require('assert');

describe('replaceWhitespacesDots Test', () => {
    it('should replace white space', () => {
        assert.equal(replaceWhitespacesDots(" "), ".");
    });

    it('should keep dot', () => {
        assert.equal(replaceWhitespacesDots("."), ".");
    });
});
