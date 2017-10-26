// @flow
import React from 'react'

import type { CriteriaPlugin } from '../../engine/types'
import {
  CK_NPM_DOWNLOADS_YEARLY,
  CK_NPM_DOWNLOADS_MONTHLY,
} from '../ContextKeys'
import { makeRatioNormalizator } from '../normalization'

// steady trend is 33%
const normalizator = makeRatioNormalizator(25, 50, 30)

function evaluate(ctx) {
  const yearlyPerMonth = ctx.get(CK_NPM_DOWNLOADS_YEARLY) / 12
  const monthly = ctx.get(CK_NPM_DOWNLOADS_MONTHLY)
  // ratio normalizer works with 0-1 range - now we have 0-inf but let's say cap it max to 3
  // thus 1:1 rate will be 33%
  const max = 3 * yearlyPerMonth
  return normalizator(monthly, max)
}

function DownloadsDetail({ ctx }) {
  const yearlyPerMonth = ctx.get(CK_NPM_DOWNLOADS_YEARLY) / 12
  const monthly = ctx.get(CK_NPM_DOWNLOADS_MONTHLY)
  return (
    <div>
      Last month's downloads: {monthly} vs Last year's month average:{' '}
      {yearlyPerMonth}
    </div>
  )
}

const plugin: CriteriaPlugin = {
  evaluate,
  requiredKeys: [CK_NPM_DOWNLOADS_YEARLY, CK_NPM_DOWNLOADS_MONTHLY],
  detailComponent: DownloadsDetail,
  name: 'Downloads trend',
  description: `Decreasing trend in downloads shows either there is a better
                alternative or indicates that library gets unsupported`,
  weight: 15,
}

export default plugin
