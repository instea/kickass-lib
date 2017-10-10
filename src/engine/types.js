// @flow

export type EngineContext = {
  get: string => any,
  set: (string, any) => void
}

export interface FetcherPlugin {
  fetch: EngineContext => Promise<void> | void;
}
