// @flow

export interface ApiAdapter {
  /**
   * Checks whether everything is initialized (authentication, ...) and ready to use
   */
  isReady(): boolean;

  /**
   * Tries to initialize everything needed to start using the service
   */
  tryToInit(): void;

  /**
   * Calls the specified API endpoint with all authentication properties added to the request
   * and returns a promise with the retrieved value
   */
  callAPI(url: String): Promise<Object>;
}
