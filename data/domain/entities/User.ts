import type { EntityOptions } from "./_Entity"
import { Entity } from "./_Entity"

export interface UserOptions extends EntityOptions {
  email: string
  displayName: string
}

export class User extends Entity implements UserOptions {
  public email: UserOptions["email"]
  public displayName: UserOptions["displayName"]

  public constructor(options: UserOptions) {
    const { id, email, displayName } = options
    super({ id })
    this.email = email
    this.displayName = displayName
  }
}
