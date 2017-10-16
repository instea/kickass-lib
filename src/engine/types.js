// @flow

export type ContextKey = string
// number 0 - 100
export type Percentage = number
export interface EngineContext {
  get(ContextKey): any;
  set(ContextKey, any): any;
}

export interface Plugin {
  requiredKeys?: Array<ContextKey>;
}
export interface FetcherPlugin extends Plugin {
  fetch: EngineContext => Promise<void> | void;
}
export interface CriteriaPlugin extends Plugin {
  name: string;
  evaluate: EngineContext => ?Percentage;
  description: string;
  weight: Percentage;
}

export type EvaluationResult = {
  rating: Percentage,
  plugin: CriteriaPlugin
}
