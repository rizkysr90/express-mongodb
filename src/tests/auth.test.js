const app = require("../../server");
const request = require("supertest");
const User = require("../models/index").UserModel;
const mongoose = require("mongoose");
const bcrypt = require("../utility/bcrypt");
require("dotenv").config();

beforeAll(async () => {
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

describe("Use case login - POST /api/auth/login", () => {
  beforeAll(async () => {
    // Create user for testing
    const newUser = new User({
      first_name: "John",
      last_name: "Doe",
      username: "rizkysr90",
      password: await bcrypt.hash("randominternet"),
    });
    await newUser.save();
  });
  test("Succesfully login", async () => {
    const response = await request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({
        username: "rizkysr90",
        password: "randominternet",
      })
      .set("Accept", "application/json");
    const { code } = response.body;
    expect(code).toBe(200);
  }, 5000);
  test("Wrong password", async () => {
    const newUser = new User({
      first_name: "John",
      last_name: "Doe",
      username: "rizkysr901",
      password: await bcrypt.hash("randominternet"),
    });
    await newUser.save();
    const response = await request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({
        username: "rizkysr901",
        password: "notyourfavpassword",
      })
      .set("Accept", "application/json");
    const { code } = response.body;
    expect(code).toBe(400);
  });
  test("user not found", async () => {
    const response = await request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({
        username: "loremipsum",
        password: "randompassword",
      })
      .set("Accept", "application/json");
    const { code } = response.body;
    expect(code).toBe(404);
  });
});
