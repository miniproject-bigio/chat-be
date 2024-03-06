import { createDatabaseConnection } from "./db"

describe("Database Connection", () => {
  it("should successfully connect to the database", async () => {
    const connection = createDatabaseConnection()

    try {
      await connection.authenticate()
      expect(true).toBe(true)
    } catch (error) {
      expect(true).toBe(false)
    } finally {
      await connection.close()
    }
  })
})
