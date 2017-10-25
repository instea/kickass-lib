// @flow
import React from 'react'

import type { CriteriaPlugin } from '../../engine/types'
import { CK_GH_NUM_STARS, CK_GH_URL } from '../ContextKeys'
import { makeUnlimitedNormalizator } from '../normalization'

const NUM_STARS_FOR_VALUE_50 = 100
const normalizator = makeUnlimitedNormalizator(NUM_STARS_FOR_VALUE_50)

function evaluate(ctx) {
  const numStars = ctx.get(CK_GH_NUM_STARS)
  return normalizator(numStars)
}

function StarDetail({ ctx }) {
  const numStars = ctx.get(CK_GH_NUM_STARS)
  const url = ctx.get(CK_GH_URL)
  return (
    <div>
      Star count: <a href={url}> {numStars}</a>
    </div>
  )
}

const plugin: CriteriaPlugin = {
  evaluate,
  requiredKeys: [CK_GH_NUM_STARS],
  detailComponent: StarDetail,
  name: 'Github Stars',
  description: `Too low a number of github stars usually means that lib
                is not so popular or too young (to have confidence)`,
  weight: 10,
}

export default plugin
