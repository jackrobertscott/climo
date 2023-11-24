import { input } from "@inquirer/prompts"
import { Schema } from "./Schema"
import { promptSelect } from "./promptSelect"

export interface PersistentStoreValue {}

export class PersistentStore {
  name: string
  fields: Record<string, Schema<any>>

  constructor(name: string, fields: Record<string, Schema<any>>) {
    this.name = name
    this.fields = fields
  }

  public static async promptCreate() {
    const name = await PersistentStore.promptName()
    return new PersistentStore(name, {})
  }

  private static async promptName() {
    let name = await input({ message: "Persistent store name:" })
    name = name.trim()
    return name
  }

  public async promptUpdate() {
    let running = true
    while (running) {
      await promptSelect("Select an action:", [
        {
          name: "Go back",
          cb: async () => {
            running = false
          },
        },
        {
          name: "Update name",
          cb: async () => {
            this.name = await PersistentStore.promptName()
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
