// @flow

type ContextKey = string
// number 0 - 100
export type Percentage = number
export type EngineContext = {
  get: ContextKey => any,
  set: (ContextKey, any) => void
}

export interface Plugin {
  requiredKeys?: Array<ContextKey>;
}
export interface FetcherPlugin extends Plugin {
  fetch: EngineContext => Promise<void> | void;
}
export interface CriteriaPlugin extends Plugin {
  evaluate: EngineContext => ?Percentage;
  description: string;
  weight: Percentage;
}
