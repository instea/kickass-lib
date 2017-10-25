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

/**
 * Makes normalizator funtion for ratio (given in form of `a/b`)
 * @param lowRatio - threshold for too low values
 * @param highRatio - threshold for too high values
 * @param edge - edge < 50; lowRatio => edge, highRatio => 100 - edge
 */
export function makeRatioNormalizator(
  lowRatio: Percentage,
  highRatio: Percentage,
  edge: Percentage = 10
): (number, number) => Percentage {
  // TODO more smooth function
  let reverse = false
  if (lowRatio > highRatio) {
    const tmp = highRatio
    highRatio = lowRatio
    lowRatio = tmp
    reverse = true
  }
  return function ratioNormalizator(a, b) {
    if (!b) {
      // no ratio at all -> return average
      return 50
    }
    let ratio = a / b * 100
    ratio = Math.max(0, Math.min(100, ratio))
    let result
    if (ratio < lowRatio) {
      result = ratio / lowRatio * edge
    } else if (ratio > highRatio) {
      result = 100 - (100 - ratio) / (100 - highRatio) * edge
    } else {
      // we are in the midle
      result =
        (ratio - lowRatio) / (highRatio - lowRatio) * (100 - 2 * edge) + edge
    }
    return reverse ? 100 - result : result
  }
}
