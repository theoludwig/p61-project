export interface EntityOptions {
  id: string
}

export abstract class Entity implements EntityOptions {
  public readonly id: string

  public constructor(options: EntityOptions) {
    const { id } = options
    this.id = id
  }

  // public equals(entity: Entity): boolean {
  //   return entity.id === this.id
  // }
}
