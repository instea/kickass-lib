// @flow
import React from 'react'

import type { CriteriaPlugin } from '../../engine/types'
import { CK_NPM_DOWNLOADS_WEEKLY, CK_NPM_URL } from '../ContextKeys'
import { makeUnlimitedNormalizator } from '../normalization'

const NUM_DOWNLOADS_FOR_VALUE_50 = 5000
const normalizator = makeUnlimitedNormalizator(NUM_DOWNLOADS_FOR_VALUE_50)

function evaluate(ctx) {
  const numDownloads = ctx.get(CK_NPM_DOWNLOADS_WEEKLY)
  return normalizator(numDownloads)
}

function DownloadsDetail({ ctx }) {
  const numDownloads = ctx.get(CK_NPM_DOWNLOADS_WEEKLY)
  const url = ctx.get(CK_NPM_URL)
  return (
    <div>
      Weekly download count: <a href={url}> {numDownloads}</a>
    </div>
  )
}

const plugin: CriteriaPlugin = {
  evaluate,
  requiredKeys: [CK_NPM_DOWNLOADS_WEEKLY],
  detailComponent: DownloadsDetail,
  name: 'Npm downloads',
  description: `Too low a number of npm downloads usually means that lib is
                not so popular or too young (to have confidence)`,
  weight: 5,
}

export default plugin
