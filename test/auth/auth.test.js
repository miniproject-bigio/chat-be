import supertest from "supertest"
import serverTest from "../serverTest"
import bcryptjs from "bcryptjs"
import { access_token } from "../db"

const app = serverTest()

describe("Authentication Controller", () => {
  describe("Create User", () => {
    it("should create a new user with a successful response", async () => {
      const hashedUser = await bcryptjs.hash("user", 10)
      const hashedPassword = await bcryptjs.hash("password", 10)

      const randomUser = {
        username: hashedUser,
        password: hashedPassword,
        isAdmin: false,
      }

      const response = await supertest(app).post("/v1/api/register").send(randomUser).expect(201)

      expect(response.status).toBe(201)
    })

    it("should return a 400 Bad Request if username or password is missing", async () => {
      const newUser = {
        username: "testuser",
      }

      const response = await supertest(app).post("/v1/api/register").send(newUser).expect(400)

      expect(response.status).toBe(400)
    })
  })

  describe("Login User", () => {
    it("should log in a user with a successful response", async () => {
      const credentials = {
        username: "testuser",
        password: "testpassword",
      }

      const response = await supertest(app).post("/v1/api/login").send(credentials).expect(200)

      expect(response.status).toBe(200)
      expect(response.body.data).toHaveProperty("accessToken")
    })

    it("should return a 400 Bad Request if username or password is missing", async () => {
      const credentials = {
        username: "testuser",
      }

      const response = await supertest(app).post("/v1/api/login").send(credentials).expect(400)

      expect(response.status).toBe(400)
    })
  })

  describe("Sign Out User", () => {
    it("should sign out a user with a successful response", async () => {
      const userId = "fc017e81-2556-459c-bae3-802b44b87c92"

      const response = await supertest(app).post("/v1/api/signout").send({ userId }).expect(200)

      expect(response.status).toBe(200)
    })

    it("should return a 400 Bad Request if userId is missing", async () => {
      const response = await supertest(app).post("/v1/api/signout").expect(400)

      expect(response.status).toBe(400)
    })
  })

  // describe("Refresh Token", () => {
  //   it("should refresh the access token with a successful response", async () => {
  //     const refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNzYwYzI1Ni03MGQ0LTQ2OWUtYTFhYy04NDAxNTg4MjViYTEiLCJpYXQiOjE3MDk3MzExMTQsImV4cCI6MTcwOTk5MDMxNH0.9T2Y0pwRZVJHmNvlKLk09ahF2qJhAQRpRD_Are2JNQA"

  //     const response = await supertest(app).post("/v1/api/refresh_token").set("refresh_token", refresh_token).expect(200)

  //     expect(response.status).toBe(200)
  //     expect(response.body.data).toHaveProperty("accessToken")
  //   })

  //   it("should return a 401 Unauthorized if refresh token is missing", async () => {
  //     const response = await supertest(app).post("/v1/api/refresh_token").expect(401)

  //     expect(response.status).toBe(401)
  //   })
  // })
})
