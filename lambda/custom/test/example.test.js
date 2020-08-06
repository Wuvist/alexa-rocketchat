const { replaceWhitespacesDots, getRoomId } = require('../helperFunctions');

const assert = require('assert');
var MockAdapter = require("axios-mock-adapter");
var axios = require("axios");
var mock = new MockAdapter(axios);
var hostname = "undefined"

describe('replaceWhitespacesDots Test', () => {
    it('should replace white space', () => {
        assert.equal(replaceWhitespacesDots(" "), ".");
    });

    it('should keep dot', () => {
        assert.equal(replaceWhitespacesDots("."), ".");
    });
});


describe('getRoomId Test', () => {
    it('should get room id', async () => {
        var roomName = "anime";
        var roomId = 99;

        mock.onGet(hostname + "/api/v1/channels.info?roomName=" + roomName).reply(200, {
            channel: { _id: roomId },
        });

        const result = await getRoomId(roomName, {});
        console.log(mock.history.get[0].url);
        assert.equal(result, roomId);
    });
});
