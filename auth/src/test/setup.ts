// const generateRandomEmail = () => {
//   const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
//   let email = "";
//   const nameLength = Math.floor(Math.random() * 6) + 5;

//   for (let i = 0; i < nameLength; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     email += characters[randomIndex];
//   }

//   return email + "@gmail.com";
// };

// global.signin = async () => {
//   const email = generateRandomEmail();
//   const password = "password";
//   const response = await request(App)
//     .post("/api/users/signup")
//     .send({
//       email,
//       password,
//     })
//     .expect(201);

//   const cookie = response.get("Set-Cookie");
//   console.log(cookie);
//   return {
//     cookie,
//     email,
//   };
// };

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { App } from "../App";

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(App)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
