// @flow
import {
  makeUnlimitedNormalizator,
  makeRatioNormalizator,
} from '../normalization'

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

describe('makeRatioNormalizator:ascending', () => {
  const EDGE = 10
  const normalizator = makeRatioNormalizator(10, 80, EDGE)

  it('returns 0% for 0/1', () => {
    const val = normalizator(0, 1)
    expect(val).toBeCloseTo(0)
  })

  it('returns edge (%) for low Ratio', () => {
    const val = normalizator(10, 100)
    expect(val).toBeCloseTo(10)
  })

  it('returns 100-edge (%) for high ratio', () => {
    const val = normalizator(80, 100)
    expect(val).toBeCloseTo(90)
  })

  it('it is ascending', () => {
    const STEP = 5
    for (let i = 0; i < 100 / STEP - 1; i++) {
      const x = i * STEP
      const val1 = normalizator(x, 100)
      const val2 = normalizator(x + STEP, 100)
      expect(val1).toBeLessThan(val2)
    }
  })

  it('returns 100% for 2/2', () => {
    const val = normalizator(2, 2)
    expect(val).toBeCloseTo(100)
  })
})

describe('makeRatioNormalizator:descending', () => {
  const EDGE = 10
  const normalizator = makeRatioNormalizator(80, 10, EDGE)

  it('returns 100% for 0/1', () => {
    const val = normalizator(0, 1)
    expect(val).toBeCloseTo(100)
  })

  it('it is descending', () => {
    const STEP = 5
    for (let i = 0; i < 100 / STEP - 1; i++) {
      const x = i * STEP
      const val1 = normalizator(x, 100)
      const val2 = normalizator(x + STEP, 100)
      expect(val1).toBeGreaterThan(val2)
    }
  })

  it('returns 0% for 2/2', () => {
    const val = normalizator(2, 2)
    expect(val).toBeCloseTo(0)
  })
})
