import request from "supertest";
import { App } from "../../App";

const createTicket = () => {
  return request(App).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "asldkf",
    price: 20,
  });
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(App).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
