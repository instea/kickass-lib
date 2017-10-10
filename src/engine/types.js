// @flow

export interface FetcherPlugin {
  fetch: () => Promise<any>;
}
