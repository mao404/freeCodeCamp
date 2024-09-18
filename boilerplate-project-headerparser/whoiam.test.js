// Import the function that handles your GET request
const whoamiHandler = require("./index");

describe("GET /api/whoami", () => {
  let req, res;

  beforeEach(() => {
    // Mock request and response objects
    req = {
      headers: {
        "x-forwarded-for": "192.168.1.100", // Mocked dynamic IP address
        "accept-language": "es-CO,es;q=0.9,en;q=0.7", // Mocked language
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0.0.0 Safari/537.36", // Mocked user-agent
      },
    };

    res = {
      statusCode: 0,
      jsonData: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.jsonData = data;
      },
    };
  });

  // 1. Test: Returns a 200 status code
  it("should return 200 status code", () => {
    whoamiHandler(req, res);
    expect(res.statusCode).toBe(200);
  });

  // 2. Test: Returns a JSON response
  it("should return a JSON response", () => {
    whoamiHandler(req, res);
    expect(typeof res.jsonData).toBe("object"); // Check if the response is an object (JSON format)
  });

  // 3. Test: Returns JSON in the expected format (ipaddress, language, software)
  it("should return a JSON in the correct format", () => {
    whoamiHandler(req, res);

    // Check if the JSON response has the expected fields
    expect(res.jsonData).toHaveProperty("ipaddress");
    expect(res.jsonData).toHaveProperty("language");
    expect(res.jsonData).toHaveProperty("software");

    // Ensure the values are non-empty
    expect(res.jsonData.ipaddress).toBeTruthy();
    expect(res.jsonData.language).toBeTruthy();
    expect(res.jsonData.software).toBeTruthy();
  });
});
