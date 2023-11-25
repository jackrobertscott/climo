import { input, select } from "@inquirer/prompts"

export class Prompt {
  public static async input(message: string) {
    const value = await input({ message })
    return value.trim()
  }

  public static async choice(
    message: string,
    choices: Array<{
      name: string
      cb: () => void
    }>
  ) {
    const options = choices.map((choice) => ({ ...choice, value: Symbol() }))
    const result = await select({ message, choices: options })
    const current = options.find((choice) => choice.value === result)
    if (!current) throw new Error()
    return current.cb()
  }
}
