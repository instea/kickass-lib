// @flow
import React from 'react'

import type { CriteriaPlugin } from '../../engine/types'
import { CK_GH_PERIOD_LAST_30_STARS } from '../ContextKeys'
import { makeUnlimitedNormalizator } from '../normalization'

const _normalizator = makeUnlimitedNormalizator(25)
const normalizator = function reversedUnlimitedNormalizator(value) {
  return 100 - _normalizator(Math.max(0, value - 2))
}

function evaluate(ctx) {
  return normalizator(ctx.get(CK_GH_PERIOD_LAST_30_STARS).asDays())
}

function StarsDetail({ ctx }) {
  const durationInDays = ctx.get(CK_GH_PERIOD_LAST_30_STARS).asDays()
  return (
    <div>
      Days it took to get the last 30 stars:{' '}
      {durationInDays === 0
        ? "N/A (too many stars, couldn't load relevant data due to limits)"
        : durationInDays === Infinity
          ? "NA (repository hasn't yet achieved 30 stars)"
          : Math.round(durationInDays)}
    </div>
  )
}

const plugin: CriteriaPlugin = {
  evaluate,
  requiredKeys: [CK_GH_PERIOD_LAST_30_STARS],
  detailComponent: StarsDetail,
  name: 'Stars trend',
  description: `If the duration it takes to get 30 stars is too long, it usually shows either
                there is a better alternative or indicates that library gets unsupported`,
  weight: 5,
}

export default plugin
