// @flow

import type { CriteriaPlugin } from '../../engine/types'
import { CK_TOTAL_ISSUES_COUNT, CK_OPEN_ISSUES_COUNT } from '../ContextKeys'
import { makeRatioNormalizator } from '../normalization'

// more then 50% of open issues indicates problem
// less then 10% of open issues is ok
const normalizator = makeRatioNormalizator(50, 10)

function evaluate(ctx) {
  const open = ctx.get(CK_OPEN_ISSUES_COUNT)
  const total = ctx.get(CK_TOTAL_ISSUES_COUNT)
  return normalizator(open, total)
}

const plugin: CriteriaPlugin = {
  evaluate,
  requiredKeys: [CK_TOTAL_ISSUES_COUNT, CK_OPEN_ISSUES_COUNT],
  name: 'Open issues ratio',
  description:
    'Ratio of open issues against all issues should not be high. However older project will naturally have low ratio thus weight of this criterion is not high',
  weight: 5,
}

export default plugin
