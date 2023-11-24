import { input } from "@inquirer/prompts"
import path from "path"
import { PersistentStore } from "./PersistentStore"
import { toKebabCase } from "./changeCase"
import { promptSelect } from "./promptSelect"

export enum ProgramCommands {
  CreatePersistentStore,
  CreateRelationalService,
  CreateAccessGate,
}

export class Program {
  private _appName?: string
  private _appDir?: string
  private persistentStores: PersistentStore[]

  constructor() {
    this.persistentStores = []
  }

  public async run() {
    while (true) {
      await promptSelect("Next action:", [
        {
          name: "Create Persistent Store",
          cb: async () => {
            const ps = await PersistentStore.promptCreate()
            this.persistentStores.push(ps)
            await ps.promptUpdate()
          },
        },
        {
          name: "Create Relational Service",
          cb: async () => {},
        },
        {
          name: "Create Access Gate",
          cb: async () => {},
        },
      ])
    }
  }

  private async getAppName(): Promise<string> {
    if (!this._appName) {
      const name = await input({ message: "App name:" })
      this._appName = name.trim()
    }
    return this._appName
  }

  private async getAppDir(): Promise<string> {
    if (!this._appDir) {
      const dirName = toKebabCase(await this.getAppName())
      const inputDir = await input({
        message: "App folder:",
        default: `./${dirName}`,
      })
      this._appDir = path.resolve(process.cwd(), inputDir.trim())
    }
    return this._appDir
  }
}
