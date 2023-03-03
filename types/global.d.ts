type PrefixProps<T, Prefix extends string> = {
  [K in keyof T as K extends `${Prefix}${string}` ? K : never]: Exclude<
    T[K],
    undefined
  >;
};
