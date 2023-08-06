import { ObjectSchema } from "joi";

export const partialSchema = (schema: ObjectSchema) => {
  return schema.fork(Object.keys(schema.describe().keys), (schema) =>
    schema.optional()
  );
};
