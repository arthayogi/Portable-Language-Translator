const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");

let token;

beforeAll(async () => {
  try {
    const user = await User.create({
      username: "Anonymous",
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

describe("POST /translate-jp", () => {
  test("Translate to japan success", async () => {
    const dummy = {
      input: "Halo, selamat pagi",
    };

    let response = await request(app)
      .post("/translate-jp")
      .set("Authorization", `Bearer ${token}`)
      .send(dummy);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message")
  });

  test("Translate to japan fail - empty input", async () => {
    const dummy = {
      input: "",
    };

    let response = await request(app)
      .post("/translate-jp")
      .set("Authorization", `Bearer ${token}`)
      .send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message")
  });

});

describe("POST /translate-en", () => {
    test("Translate to english success", async () => {
      const dummy = {
        input: "Halo, selamat pagi",
      };
  
      let response = await request(app)
        .post("/translate-en")
        .set("Authorization", `Bearer ${token}`)
        .send(dummy);
  
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message")
    });
  
    test("Translate to english fail - empty input", async () => {
      const dummy = {
        input: "",
      };
  
      let response = await request(app)
        .post("/translate-en")
        .set("Authorization", `Bearer ${token}`)
        .send(dummy);
  
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message")
    });
    
  });

  describe("POST /translate-kr", () => {
    test("Translate to english success", async () => {
      const dummy = {
        input: "Halo, selamat pagi",
      };
  
      let response = await request(app)
        .post("/translate-kr")
        .set("Authorization", `Bearer ${token}`)
        .send(dummy);
  
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message")
    });
  
    test("Translate to english fail - empty input", async () => {
      const dummy = {
        input: "",
      };
  
      let response = await request(app)
        .post("/translate-kr")
        .set("Authorization", `Bearer ${token}`)
        .send(dummy);
  
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message")
    });
    
  });

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
