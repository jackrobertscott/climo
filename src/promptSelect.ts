import { select } from "@inquirer/prompts"

export async function promptSelect(
  message: string,
  choices: Array<{
    name: string
    cb: () => void
  }>
) {
  const _choices = choices.map((choice) => ({
    ...choice,
    value: Symbol(),
  }))
  const result = await select({
    message,
    choices: _choices,
  })
  const resultChoice = _choices.find((choice) => choice.value === result)
  if (!resultChoice) throw new Error()
  return resultChoice.cb()
}
