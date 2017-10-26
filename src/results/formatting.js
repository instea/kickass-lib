//@flow

export function formatNumber(number: ?number) {
  if (typeof number !== 'number' || isNaN(number)) {
    return 'N/A'
  }
  return '' + Math.round(number * 100) / 100
}
