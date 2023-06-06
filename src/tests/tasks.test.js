require("dotenv").config();
const mongoose = require("mongoose");
const app = require("../../server");
const Task = require("../models/index").TaskModel;
const User = require("../models/index").UserModel;
const bcrypt = require("../utility/bcrypt");

const request = require("supertest");
const randomJWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjFjMGM3YzA2YjJhYzE2NmU5ZDZiZCIsInVzZXJuYW1lIjoiYXNkYXNkYXNkYXMiLCJpYXQiOjE2ODUzNjc3NzEsImV4cCI6MTY4NTM2ODM3MX0.CDGuZPFvu0QsqIFVDLVjcv9BzqHZB-J58CvA5DdvpYg";
let jwtToken = "";
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

describe("use case kelola tugas (tasks)", () => {
  beforeAll(async () => {
    // register
    const newUser = new User({
      first_name: "John",
      last_name: "Doe",
      username: "johndoe99",
      password: await bcrypt.hash("randominternet"),
    });
    await newUser.save();
    // login
    const resLogin = await request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({
        username: "johndoe99",
        password: "randominternet",
      });
    jwtToken = resLogin.body?.data?.access_token;
  });
  test("fail to make a new tasks, because not login", async () => {
    const taskData = {
      title: "bermain game",
      details: "mobile legend",
    };
    const response = await request(app)
      .post("/tasks")
      .set("content-type", "application/json")
      .set("accept", "application/json")
      .set("Authorization", "Bearer " + "")
      .send(taskData);
    const { code } = response.body.meta;
    expect(code).toBe(401);
  });
  test("fail to make a new tasks, because invalid jwt token", async () => {
    const taskData = {
      title: "bermain game",
      details: "mobile legend",
    };
    const response = await request(app)
      .post("/tasks")
      .set("content-type", "application/json")
      .set("accept", "application/json")
      .set("Authorization", "Bearer " + randomJWT)
      .send(taskData);
    const { code } = response.body.meta;
    expect(code).toBe(403);
  });
  test("success to make a new tasks", async () => {
    const taskData = {
      title: "bermain game",
      details: "mobile legend",
    };
    const response = await request(app)
      .post("/tasks")
      .set("content-type", "application/json")
      .set("accept", "application/json")
      .set("Authorization", "Bearer " + jwtToken)
      .send(taskData);
    const { code } = response.body;
    expect(code).toBe(201);
  });
  test("fail to get my tasks, because i'm not logged in", async () => {
    const response = await request(app)
      .get("/tasks")
      .set("content-type", "application/json")
      .set("accept", "application/json")
      .set("Authorization", "Bearer " + "");
    const { code } = response.body.meta;
    expect(code).toBe(401);
  });
  test("fail to get my tasks, because invalid token", async () => {
    const response = await request(app)
      .get("/tasks")
      .set("content-type", "application/json")
      .set("accept", "application/json")
      .set("Authorization", "Bearer " + randomJWT);
    const { code } = response.body.meta;
    expect(code).toBe(403);
  });
  test("success to get my tasks", async () => {
    const response = await request(app)
      .get("/tasks")
      .set("content-type", "application/json")
      .set("accept", "application/json")
      .set("Authorization", "Bearer " + jwtToken);
    const { code } = response.body;
    expect(code).toBe(200);
  });
});
