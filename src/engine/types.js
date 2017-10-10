// @flow

type ContextKey = string
export type EngineContext = {
  get: ContextKey => any,
  set: (ContextKey, any) => void
}

export interface FetcherPlugin {
  fetch: EngineContext => Promise<void> | void;
  requiredKeys?: Array<ContextKey>;
}
