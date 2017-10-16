// @flow

import type { CriteriaPlugin } from '../../engine/types'
import { CK_GH_NUM_STARS } from '../ContextKeys'
import { makeUnlimitedNormalizator } from '../normalization'

const NUM_STARS_FOR_VALUE_50 = 100
const normalizator = makeUnlimitedNormalizator(NUM_STARS_FOR_VALUE_50)

function evaluate(ctx) {
  const numStars = ctx.get(CK_GH_NUM_STARS)
  const value = normalizator(numStars)
  console.log('Number of stars value', value)
  return value
}

const plugin: CriteriaPlugin = {
  evaluate,
  requiredKeys: [CK_GH_NUM_STARS],
  description: 'Number of stars for GitHub repo',
  weight: 10,
}

export default plugin
