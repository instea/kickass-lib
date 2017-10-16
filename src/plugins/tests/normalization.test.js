// @flow
import { makeUnlimitedNormalizator } from '../normalization'

describe('makeUnlimitedNormalizator', () => {
  const normalizator = makeUnlimitedNormalizator(30)

  it('returns 0 for 0', () => {
    const val = normalizator(0)
    expect(val).toBeCloseTo(0)
  })

  it('returns 50 for medium value', () => {
    const val = normalizator(30)
    expect(val).toBeCloseTo(50)
  })

  it('returns near 100 for very high value', () => {
    const val = normalizator(1000000)
    expect(val).toBeCloseTo(100)
  })
})
