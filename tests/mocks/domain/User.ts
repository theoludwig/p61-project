import type { UserData } from "@/domain/entities/User"
import { User } from "@/domain/entities/User"

const USER_MOCK_ID = "ab054ee9-fbb4-473e-942b-bbf4415f4bef"
const USER_MOCK_EMAIL = "test@test.com"
const USER_MOCK_DISPLAY_NAME = "Test"

interface UserMockCreateOptions {
  id?: UserData["id"]
  email?: UserData["email"]
  displayName?: UserData["displayName"]
}
const userMockCreate = (options: UserMockCreateOptions = {}): User => {
  const {
    id = USER_MOCK_ID,
    email = USER_MOCK_EMAIL,
    displayName = USER_MOCK_DISPLAY_NAME,
  } = options

  return new User({
    id,
    email,
    displayName,
  })
}

export const USER_MOCK = {
  create: userMockCreate,
  example: userMockCreate(),
}
