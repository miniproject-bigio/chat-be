import supertest from "supertest"
import serverTest from "../serverTest"
import { access_token } from "../db"

const app = serverTest()

describe("Message Controller", () => {
  describe("Create Message", () => {
    it("should create a new message with a successful response", async () => {
      const newMessage = {
        content: "Halo message test",
        senderId: "fc017e81-2556-459c-bae3-802b44b87c92",
        receiverId: "eae744c4-c79b-4a7d-9e97-7ea6541c2c12",
      }

      const response = await supertest(app).post("/v1/api/message").set("Authorization", `${access_token}`).send(newMessage).expect(201)

      expect(response.status).toBe(201)
    })

    it("should return a 500 Internal Server Error if the server encounters an error", async () => {
      const newMessage = {
        content: null,
        senderId: "fc017e81-2556-459c-bae3-802b44b87c92",
        receiverId: "eae744c4-c79b-4a7d-9e97-7ea6541c2c12",
      }

      const response = await supertest(app).post("/v1/api/message").set("Authorization", `Bearer ${access_token}`).send(newMessage).expect(500)

      expect(response.status).toBe(500)
    })

    it("should return a 404 Not Found if the endpoint is not correct", async () => {
      const response = await supertest(app).post("/v1/api/nonexistentEndpoint").set("Authorization", `Bearer ${access_token}`).expect(404)

      expect(response.status).toBe(404)
    })
  })
})
