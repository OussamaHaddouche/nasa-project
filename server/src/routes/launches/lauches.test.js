const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with status 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

describe("Test POST /launches", () => {
  const launchData = {
    mission: "e",
    rocket: "nizjz",
    target: "dzdokdz",
    launchDate: "January 4, 2023",
  };
  const launchDataWithoutDate = {
    mission: "e",
    rocket: "nizjz",
    target: "dzdokdz",
  };
  const launchDataWithInvalidDate = {
    mission: "e",
    rocket: "nizjz",
    target: "dzdokdz",
    launchDate: "herll",
  };
  test("It should respond with status 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchData)
      .expect(201)
      .expect("Content-Type", /json/);
    const requestDate = new Date(launchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });
  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toStrictEqual({
      error: "Missing required properties",
    });
  });
  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toStrictEqual({
      error: "invalid launch Date",
    });
  });
});
