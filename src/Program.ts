import { input, select } from "@inquirer/prompts"
import path from "path"
import { toKebabCase } from "./changeCase"

export enum ProgramCommands {
  CreatePersistentStore,
  CreateRelationalService,
  CreateAccessGate,
}

export class Program {
  private _appName?: string
  private _appDir?: string

  public async run() {
    while (true) {
      const nextCommand = await select({
        message: "Next action:",
        choices: [
          {
            value: ProgramCommands.CreatePersistentStore,
            name: "Create Persistent Store",
          },
          {
            value: ProgramCommands.CreateRelationalService,
            name: "Create Relational Service",
          },
          {
            value: ProgramCommands.CreateAccessGate,
            name: "Create Access Gate",
          },
        ],
      })
      switch (nextCommand) {
        case ProgramCommands.CreatePersistentStore:
          console.log("Create store...")
          break
        case ProgramCommands.CreateRelationalService:
          console.log("Create service...")
          break
        case ProgramCommands.CreateAccessGate:
          console.log("Create gate...")
          break
      }
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
