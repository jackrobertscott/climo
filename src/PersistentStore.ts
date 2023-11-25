import { Prompt } from "./Prompt"
import { Schema } from "./Schema"

export interface PersistentStoreValue {}

export class PersistentStore {
  name: string
  fields: Record<string, Schema<any>>

  constructor(name: string, fields: Record<string, Schema<any>>) {
    this.name = name
    this.fields = fields
  }

  public static async create() {
    const name = await Prompt.input("Store name:")
    return new PersistentStore(name, {})
  }

  public async promptSetName() {
    this.name = await Prompt.input("Store name:")
  }

  public addField(key: string, schema: Schema<any>) {
    this.fields[key] = schema
    return this
  }
}
