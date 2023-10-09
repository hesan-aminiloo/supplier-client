export type ObjectType = {
  [x: string]: unknown;
};

export type Schema = {
  [x: string]: ObjectType;
};

export type Dictionary<T> = {
  [x: string]: T;
};

export type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Uppercase<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}`
  : S;

export type CamelToSnake<T> = {
  [K in keyof T as SnakeCase<K & string>]: T[K] extends Record<string, any> ? CamelToSnake<T[K]> : T[K];
};

export * from './configs';
export * from './dto';
export * from './http.types';
