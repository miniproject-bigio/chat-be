import { header } from "express-validator"

export const tokenValidation = (isRefresh = false) => {
  let refreshText = isRefresh ? "Refresh" : "Authorization"

  return [
    header("Authorization", `Please provide your ${refreshText} token`)
      .exists()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (!value.startsWith("Bearer") || !value.split(" ")[1]) {
          throw new Error(`Invalid ${refreshText} token`)
        }
        if (isRefresh) {
          req.headers.refresh_token = value.split(" ")[1]
          return true
        }
        req.headers.access_token = value.split(" ")[1]
        return true
      }),
  ]
}
