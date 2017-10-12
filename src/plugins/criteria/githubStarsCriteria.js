// @flow

import type { CriteriaPlugin } from '../../engine/types'
import { CK_GH_NUM_STARS } from '../ContextKeys'

const NUM_STARS_FOR_VALUE_50 = 100

function evaluate(ctx) {
  const numStars = ctx.get(CK_GH_NUM_STARS)
  const value = Math.atan(numStars / NUM_STARS_FOR_VALUE_50) * 200 / Math.PI
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
