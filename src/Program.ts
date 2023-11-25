import { App } from "./App"
import { Prompt } from "./Prompt"

export enum ProgramCommands {
  CreatePersistentStore,
  CreateRelationalService,
  CreateAccessGate,
}

export class Program {
  constructor(private app: App) {}

  public static async create() {
    return new Program(await App.create())
  }

  public async run() {
    while (true) {
      await Prompt.choice("Next action:", [
        {
          name: "Create Persistent Store",
          cb: (): Promise<void> => this.app.addStore(),
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
}
