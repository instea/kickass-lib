// @flow

export type AppState = {
  libraryPath: string
}

export type ResultsState = {
  ctx: Map<string, any>,
  inProgress: boolean,
  selectedPlugin: ?string
}
