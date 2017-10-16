/* @flow 
This files contains various reusable factory methods for input normalization
*/
import type { Percentage } from '../engine/types'

/**
 * Makes normalizator function for input ranges <0, inf)
 * @param {*} mediumValue input value that should return 50(%)
 */
export function makeUnlimitedNormalizator(
  mediumValue: number
): number => Percentage {
  return function unlimitedNormalizator(val) {
    return Math.atan(val / mediumValue) * 200 / Math.PI
  }
}
