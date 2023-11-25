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

  public async run() {
    let running = true
    while (running) {
      await Prompt.choice("Select:", [
        {
          name: "Go back",
          cb: async () => {
            running = false
          },
        },
        {
          name: "Update name",
          cb: async () => {
            this.name = await Prompt.input("Store name:")
            console.log("Name updated!")
          },
        },
        {
          name: "Add field",
          cb: async () => {
            console.log("Todo")
          },
        },
      ])
    }
  }

  public addField(key: string, schema: Schema<any>) {
    this.fields[key] = schema
    return this
  }
}
