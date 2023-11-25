import { input } from "@inquirer/prompts"
import path from "path"
import { PersistentStore } from "./PersistentStore"
import { toKebabCase } from "./changeCase"

export class App {
  constructor(
    private name: string,
    private dir: string,
    private stores: PersistentStore[] = []
  ) {}

  public static async create() {
    let name = await input({ message: "App name:" })
    name = name.trim()
    const dirName = toKebabCase(name)
    let inputDir = await input({ message: "App dir:", default: `./${dirName}` })
    let dir = path.resolve(process.cwd(), inputDir.trim())
    return new App(name, dir)
  }

  public async addStore() {
    const ps = await PersistentStore.create()
    this.stores.push(ps)
    await ps.run()
  }

  public async getName(): Promise<string> {
    return this.name
  }

  public async getDir(): Promise<string> {
    return this.dir
  }
}
