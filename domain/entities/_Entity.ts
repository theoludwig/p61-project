import { z } from "zod"

export const EntitySchema = z.object({
  id: z.string(),
})

export type EntityData = z.infer<typeof EntitySchema>

export abstract class Entity implements EntityData {
  public readonly id: string

  public constructor(options: EntityData) {
    const { id } = options
    this.id = id
  }

  public equals(entity: Entity): boolean {
    return entity.id === this.id
  }

  public abstract toJSON(): EntityData
}
