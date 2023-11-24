export interface SchemaValue {
  type: string
}

export class Schema<T extends SchemaValue> {
  private value: SchemaValue

  constructor(value: T) {
    this.value = value
  }

  public getValue() {
    return this.value
  }
}

export interface StringSchemaValue extends SchemaValue {
  type: "string"
  min?: number
  max?: number
  email?: boolean
  url?: boolean
  regex?: RegExp
}

export class StringSchema extends Schema<StringSchemaValue> {
  constructor(value: Omit<StringSchemaValue, "type">) {
    super({
      type: "string",
      ...value,
    })
  }
}

export interface NumberSchemaValue extends SchemaValue {
  type: "number"
  min?: number
  max?: number
  positive?: boolean
  negative?: boolean
}

export class NumberSchema extends Schema<NumberSchemaValue> {
  constructor(value: Omit<NumberSchemaValue, "type">) {
    super({
      type: "number",
      ...value,
    })
  }
}

export interface BooleanSchemaValue extends SchemaValue {
  type: "boolean"
  default?: boolean
}

export class BooleanSchema extends Schema<BooleanSchemaValue> {
  constructor(value: Omit<BooleanSchemaValue, "type">) {
    super({
      type: "boolean",
      ...value,
    })
  }
}

export interface ArraySchemaValue<T extends Schema<any>> extends SchemaValue {
  type: "array"
  ofSchema: T
  min?: number
  max?: number
}

export class ArraySchema<T extends Schema<any>> extends Schema<
  ArraySchemaValue<T>
> {
  constructor(value: Omit<ArraySchemaValue<T>, "type">) {
    super({
      type: "array",
      ...value,
    })
  }
}

export interface ObjectSchemaValue<T extends Record<string, Schema<any>>>
  extends SchemaValue {
  type: "object"
  shape: T
}

export class ObjectSchema<T extends Record<string, Schema<any>>> extends Schema<
  ObjectSchemaValue<T>
> {
  constructor(value: Omit<ObjectSchemaValue<T>, "type">) {
    super({
      type: "object",
      ...value,
    })
  }
}
