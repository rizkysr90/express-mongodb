const app = require("../../server");
const request = require("supertest");
const User = require("../models/index").UserModel;
const mongoose = require("mongoose");
const bcrypt = require("../utility/bcrypt");
require("dotenv").config();
async function makePostRequest(data) {
  const res = await request(app)
    .post("/users")
    .set("content-type", "application/json")
    .set("accept", "application/json")
    .send(data);

  return res;
}
beforeAll(() => {
  mongoose
    .connect("mongodb://localhost:27017/JestDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connect to the testing database");
    })
    .catch((err) => {
      console.log("Cannot connect to the testing database!", err);
      process.exit();
    });
});
afterAll(async () => {
  console.log("Reset database");
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
}, 100000);

describe("Usecase register", () => {
  beforeAll(async () => {
    // Create user for testing
    const newUser = new User({
      first_name: "John",
      last_name: "Doe",
      username: "johndoe99",
      password: await bcrypt.hash("randominternet"),
    });
    await newUser.save();
  });
  test("sucessfully register", async () => {
    const response = await makePostRequest({
      first_name: "Rizki",
      last_name: "Ramadhan",
      username: "rizkysr69",
      password: "adarizki69",
      confirm_password: "adarizki69",
    });
    const { code } = response.body;
    expect(code).toBe(201);
  });
  test("fail to register because invalid confirm password", async () => {
    const response = await makePostRequest({
      first_name: "Rizki",
      last_name: "Ramadhan",
      username: "rizkykece123",
      password: "adarizki69",
      confirm_password: "adarizki12369",
    });
    const { code } = response.body;
    expect(code).toBe(400);
  });
  test("fail to register because username was used", async () => {
    const response = await makePostRequest({
      first_name: "Rizki",
      last_name: "Ramadhan",
      username: "rizkysr69",
      password: "adarizki169",
      confirm_password: "adarizk169",
    });
    const { code } = response.body;
    expect(code).toBe(400);
  });
  test("fail to register because firstname empty", async () => {
    const response = await makePostRequest({
      first_name: "",
      last_name: "Ramadhan",
      username: "rizkysr669",
      password: "adarizki69",
      confirm_password: "adarizki69",
    });
    const { code } = response.body;
    expect(code).toBe(400);
  });
  test("fail to register because firstname contain whitespace", async () => {
    const response = await makePostRequest({
      first_name: "                             ",
      last_name: "Ramadhan",
      username: "rizkysr6693",
      password: "adarizki69",
      confirm_password: "adarizki69",
    });
    const { code } = response.body;
    expect(code).toBe(400);
  });
  test("fail to register because lastname contain whitespace", async () => {
    const response = await makePostRequest({
      first_name: "rizky",
      last_name: "  ",
      username: "rizkysr6693",
      password: "adarizki69",
      confirm_password: "adarizki69",
    });
    const { code } = response.body;
    expect(code).toBe(400);
  });
  test("fail to register because username contain whitespace", async () => {
    const response = await makePostRequest({
      first_name: "rizky",
      last_name: "Ramadhan",
      username: "           ",
      password: "adarizki69",
      confirm_password: "adarizki69",
    });
    const { code } = response.body;
    expect(code).toBe(400);
  });
  test("fail to register because username contain whitespace", async () => {
    const response = await makePostRequest({
      first_name: "rizky",
      last_name: "Ramadhan",
      username: "rizkykece",
      password: "adarizki12        ",
      confirm_password: "adarizki69",
    });
    const { code } = response.body;
    expect(code).toBe(400);
  });
});
