import supertest from "supertest"
import serverTest from "../serverTest"
import User from "../../src/schemes/user.model"

const app = serverTest()

describe("User Controller", () => {
  describe("Get All Users", () => {
    it("should get all users with a successful response", async () => {
      const response = await supertest(app).get("/v1/api/users").expect(200)

      expect(response.status).toBe(200)
      expect(response.body.data).toBeInstanceOf(Array)
    })

    it("should handle internal server error", async () => {
      jest.spyOn(User, "findAll").mockImplementation(() => {
        throw new Error("Mocked internal server error")
      })

      const response = await supertest(app).get("/v1/api/users").expect(500)

      expect(response.status).toBe(500)
    })
  })

  describe("Get User By UUID", () => {
    it("should get a user by UUID with a successful response", async () => {
      const userId = "fc017e81-2556-459c-bae3-802b44b87c92"

      jest.spyOn(User, "findOne").mockResolvedValue({
        id: userId,
        username: "testuser",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const response = await supertest(app).get(`/v1/api/user/${userId}`).expect(200)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("id")
      expect(response.body).toHaveProperty("username")
      expect(response.body).toHaveProperty("isAdmin")
    })

    it("should return a 404 Not Found if user is not found", async () => {
      const nonExistingUserId = "non_existing_user_id"

      jest.spyOn(User, "findOne").mockResolvedValue(null)

      const response = await supertest(app).get(`/v1/api/user/${nonExistingUserId}`).expect(404)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty("error", "User not found")
    })

    it("should handle internal server error", async () => {
      const userId = "fc017e81-2556-459c-bae3-802b44b87c92"
      jest.spyOn(User, "findOne").mockImplementation(() => {
        throw new Error("Mocked internal server error")
      })

      const response = await supertest(app).get(`/v1/api/user/${userId}`).expect(500)

      expect(response.status).toBe(500)
    })
  })
})
