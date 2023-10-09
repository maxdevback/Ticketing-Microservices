import request from "supertest";
import { App } from "../../App";

it("fails when a email that does not exist is supplied", async () => {
  await request(App)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(App)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(App)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "aslkdfjalskdfj",
    })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(App)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(App)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
