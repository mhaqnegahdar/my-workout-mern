import { application, ShutDown } from "../../src/server";
import request from "supertest";

describe("APPLICATION", () => {
  afterAll((done) => {
    ShutDown(done);
  });

  it(" Starts and has proper test environment", () => {
    expect(process.env.NODE_ENV).toBe("test");
    expect(application).toBeDefined();
  });

  it("Returns all options allowed when called from the HTTP method options", async () => {
    const response = await request(application).options("/");
    expect(response.status).toBe(200);
    expect(response.headers["access-control-allow-methods"]).toBe(
      "PUT, POST, PATCH, DELETE, GET"
    );
  }, 1000);

  it("404 on routes that don't exist",async () => {
    const response = await request(application).get("/this/route/dosnt/exist")

    expect(response.status).toBe(404)
  })


  it(" /healthcheck route is working", async () => {
    const response = await request(application).get("/healthcheck");

    expect(response.body.message).toBe("Application is working");
  }, 1000);
});
