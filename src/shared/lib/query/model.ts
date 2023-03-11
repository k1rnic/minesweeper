export type ConditionFn<T> = (entry: T) => boolean;

export type ComposeFn = <T>(
  ...conditions: ConditionFn<T>[]
) => (entry: T) => boolean;
