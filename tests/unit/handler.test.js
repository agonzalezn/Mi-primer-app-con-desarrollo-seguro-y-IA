// Use Node's built-in assert module to avoid dependencies on external assertion libraries like Chai
const assert = require('assert');

// Import the handler we want to test
const weatherHandler = require('../../src/api/weather');

describe('Weather Handler', () => {

    // Helper factory to create mock Express response objects
    const createMockRes = () => {
        const res = {};
        // Mock res.status() to store the code and return 'res' for chaining
        res.status = function(code) {
            this.statusCode = code;
            return this; 
        };
        // Mock res.json() to capture the payload sent back to the client
        res.json = function(data) {
            this.body = data;
            return this;
        };
        return res;
    };

    it('should return mock weather data for a valid city (Happy Path)', async () => {
        // Arrange: Prepare valid request parameters
        const req = { params: { city: 'Madrid' } };
        const res = createMockRes();

        // Act: Execute the handler
        await weatherHandler(req, res);

        // Assert: Verify the response matches expected HTTP status and formatting
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.error, null);
        assert.strictEqual(res.body.data.city, 'Madrid');
        assert.strictEqual(res.body.data.temperature, 22); // Mocked temperature is 22
    });

    it('should return a 400 error when city is empty spaces (Error Case)', async () => {
        // Arrange: Prepare invalid request (only spaces)
        const req = { params: { city: '   ' } };
        const res = createMockRes();

        // Act: Execute the handler
        await weatherHandler(req, res);

        // Assert: Verify validation properly rejects it with a 400
        assert.strictEqual(res.statusCode, 400);
        assert.strictEqual(res.body.success, false);
        assert.strictEqual(res.body.data, null);
        assert.strictEqual(res.body.error, 'Invalid or missing city parameter');
    });
});
