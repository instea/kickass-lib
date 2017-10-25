// @flow
import React from 'react'

import type { CriteriaPlugin } from '../../engine/types'
import { CK_NPMS_DATA, CK_GH_URL } from '../ContextKeys'

const MIN_NUM_COMMITS_TO_BE_ACTIVE = 10
//const NUM_CONTRIBUTORS_FOR_VALUE_50 = 5
// TODO - generalize it in normalization file and make it parametric
// For example by solving:
//   a * val_50^b = 50
//   a * val_100^b = 100
const normalizator = function customNormalizatorWithUpperBound100(number) {
  return Math.round(34.4543 * Math.pow(number, 0.231378) * 1000) / 1000
}

function getActiveContributors(ctx) {
  return ctx
    .get(CK_NPMS_DATA)
    .collected.github.contributors.filter(
      c => c.commitsCount >= MIN_NUM_COMMITS_TO_BE_ACTIVE
    ).length
}

function evaluate(ctx) {
  const numDownloads = getActiveContributors(ctx)
  return normalizator(numDownloads)
}

function makeContributorsUrl(githubUrl) {
  return `${githubUrl}/graphs/contributors`
}

function ContributorsDetail({ ctx }) {
  const numDownloads = getActiveContributors(ctx)
  const url = makeContributorsUrl(ctx.get(CK_GH_URL))
  return (
    <div>
      Active contributors:{' '}
      <a href={url}>
        {' '}
        {numDownloads}
        {numDownloads >= 100 ? ' (or more)' : ''}
      </a>
    </div>
  )
}

const plugin: CriteriaPlugin = {
  evaluate,
  requiredKeys: [CK_NPMS_DATA],
  detailComponent: ContributorsDetail,
  name: 'Active contributors',
  description: `A small number of contributors usually means that lib is there
                is smaller chance any issue or problem will be addressed quickly`,
  weight: 3,
}

export default plugin
