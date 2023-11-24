import { Schema } from "./Schema"

export interface PersistentStoreValue {
  name: string
  fields: Record<string, Schema<any>>
}

export class PersistentStore {
  private value: PersistentStoreValue

  constructor(value: PersistentStoreValue) {
    this.value = value
  }

  public addField(key: string, schema: Schema<any>) {
    this.value.fields[key] = schema
    return this
  }

  public getValue() {
    return this.value
  }
}
