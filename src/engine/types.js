// @flow

export type ContextKey = string
// number 0 - 100
export type Percentage = number
export interface EngineContext {
  get(ContextKey): any;
  set(ContextKey, any): any;
}

// TODO allow both stateless and standard component
export type ReactComponent = any

export interface Plugin {
  // array of information needed in context to execute this plugin
  requiredKeys?: Array<ContextKey>;
}
export interface FetcherPlugin extends Plugin {
  fetch: EngineContext => Promise<void> | void;
}
export interface CriteriaPlugin extends Plugin {
  // short plugin identification
  name: string;
  // return rating based on information in context
  evaluate: EngineContext => ?Percentage;
  // optional detail showing more information about the rating
  detailComponent?: ReactComponent;
  // (mandatory) description explaining rational behind this plugin
  description: string;
  // relative weight of this criterion
  weight: Percentage;
}

export type EvaluationResult = {
  rating: Percentage,
  plugin: CriteriaPlugin
}
