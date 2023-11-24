import { input } from "@inquirer/prompts"
import { toKebabCase } from "./changeCase"

export class Program {
  public async start() {
    const appName = await this.promptAppName()
    const appNameKebab = toKebabCase(appName)
    console.log("Kebab case:", appNameKebab)
  }

  private async promptAppName() {
    return input({ message: "Your app's name:" })
  }
}
