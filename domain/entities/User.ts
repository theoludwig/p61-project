import { z } from "zod"

import { Entity, EntitySchema } from "./_Entity"

export const UserSchema = EntitySchema.extend({
  email: z.string().min(1).email(),
  displayName: z.string().min(1),
})

export const UserRegisterSchema = UserSchema.extend({
  password: z.string().min(6),
}).omit({ id: true })
export type UserRegisterData = z.infer<typeof UserRegisterSchema>

export const UserLoginSchema = UserRegisterSchema.omit({ displayName: true })
export type UserLoginData = z.infer<typeof UserLoginSchema>

export type UserData = z.infer<typeof UserSchema>

export class User extends Entity implements UserData {
  public email: UserData["email"]
  public displayName: UserData["displayName"]

  public constructor(options: UserData) {
    const { id, email, displayName } = options
    super({ id })
    this.email = email
    this.displayName = displayName
  }

  public override toJSON(): UserData {
    return {
      id: this.id,
      email: this.email,
      displayName: this.displayName,
    }
  }
}
