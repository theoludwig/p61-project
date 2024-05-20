import { version } from "@/package.json"

export const getVersion = (): string => {
  if (process.env["NODE_ENV"] === "development") {
    return "0.0.0-development"
  }
  return version
}
