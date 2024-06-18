const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");

let token;

beforeAll(async () => {
  try {
    const user = await User.create({
      email: "tes@mail.com",
      password: "12345",
    });

    token = signToken({
      id: user.id,
    });
  } catch (error) {
    console.log(error);
  }
});

describe("POST /login", () => {
  test("Login success", async () => {
    const dummy = {
      email: "tes@mail.com",
      password: "12345",
    };

    let response = await request(app).post("/login").send(dummy);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
  });

  test("Login fail - email empty", async () => {
    const dummy = {
      email: "",
      password: "12345",
    };

    let response = await request(app).post("/login").send(dummy);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
  });

  test("Login fail - password empty", async () => {
    const dummy = {
      email: "tes@mail.com",
      password: "",
    };

    let response = await request(app).post("/login").send(dummy);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
  });

  test("Login fail - wrong email", async () => {
    const dummy = {
      email: "tes01@mail.com",
      password: "12345",
    };

    let response = await request(app).post("/login").send(dummy);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
  });

  test("Login fail - wrong password", async () => {
    const dummy = {
      email: "tes@mail.com",
      password: "12",
    };

    let response = await request(app).post("/login").send(dummy);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
  });


});

describe("POST /register", () => {
    test("Register success", async () => {
      const dummy = {
        email: "budi@mail.com",
        password: "12345",
      };
  
      let response = await request(app).post("/register").send(dummy);
  
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message");
    });
  
    test("Register fail - email empty", async () => {
      const dummy = {
        email: "",
        password: "12345",
      };
  
      let response = await request(app).post("/register").send(dummy);
  
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message");
    });
  
    test("Register fail - password empty", async () => {
      const dummy = {
        email: "budi@mail.com",
        password: "",
      };
  
      let response = await request(app).post("/register").send(dummy);
  
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message");
    });
  
    test("Register fail - duplicate email", async () => {
      const dummy = {
        email: "tes@mail.com",
        password: "12345",
      };
  
      let response = await request(app).post("/register").send(dummy);
  
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message");
    });
  
  });

  afterAll(async ()=>{
    await User.destroy({truncate: true, cascade: true, restartIdentity: true})
})

