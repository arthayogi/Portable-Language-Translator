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

describe("PATCH /profiles", () => {
  test("Change username success", async () => {
    const dummy = {
      username: "Budi",
    };

    let response = await request(app)
      .patch("/profiles")
      .set("Authorization", `Bearer ${token}`)
      .send(dummy);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
  });

  test("Change username fail - login fail", async () => {
    const dummy = {
      username: "",
    };

    let response = await request(app)
      .patch("/profiles")
      .set("Authorization", `${token}`)
      .send(dummy);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
  });

  test("Change username fail - username empty", async () => {
    const dummy = {
      username: "",
    };

    let response = await request(app)
      .patch("/profiles")
      .set("Authorization", `Bearer ${token}`)
      .send(dummy);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
  });
});

describe("GET /profiles", () => {
  test("View username success", async () => {
    let response = await request(app)
      .get("/profiles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("username");
  });

  // test("View username fail", async () => {
  //   await User.destroy({
  //     where: {
  //       email: "tes@mail.com"
  //     }
  //   })

  //   let response = await request(app)
  //     .get("/profiles")
  //     .set("Authorization", `Bearer ${token}`);

  //   expect(response.status).toBe(404);
  //   expect(response.body).toBeInstanceOf(Object);
  // });
});

describe("DELETE /profiles", () => {
  test("Delete username success", async () => {
    let response = await request(app)
      .delete("/profiles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("Delete username fail - error", async () => {
    const dummy = {
      email: "haha@mail.com",
      password: "12345"
    }
    let response = await request(app)
      .delete("/profiles")
      .set("Authorization", `Bearer ${token}`)
      .send(dummy)

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
