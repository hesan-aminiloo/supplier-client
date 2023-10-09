type CallbackParams = {
  code: string;
  key: string;
};

export type UseKeyPressParams = {
  callback: ({ code, key }: CallbackParams) => unknown;
  keys: string[];
  disable?: boolean;
};

export type UseKeyPress = (
  callback: ({ code, key }: CallbackParams) => unknown,
  keys: string[],
  disable?: boolean
) => void;
