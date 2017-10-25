// @flow
import React from 'react'
import moment from 'moment'

import type { CriteriaPlugin } from '../../engine/types'
import { CK_GH_COMMENTS_PER_ISSUES } from '../ContextKeys'
import { makeUnlimitedNormalizator } from '../normalization'
import { isoToTimestamp } from '../conversion'

const NUM_STARS_FOR_VALUE_50 = 24 * 3600 * 1000 // 1 day
const normalizator = makeUnlimitedNormalizator(NUM_STARS_FOR_VALUE_50)

function evaluate(ctx) {
  const perIssue = ctx.get(CK_GH_COMMENTS_PER_ISSUES)
  const ratings = perIssue.map(analyzeIssue)
  return average(ratings.map(r => 100 - normalizator(r.average)))
}

function average(values: Array<number>): ?number {
  if (!values.length) return
  return sum(values) / values.length
}

function sum(values: Array<number>): number {
  let sum = 0
  for (let i = 0; i < values.length; i++) {
    sum += values[i]
  }
  return sum
}

function analyzeIssue({ issue, comments }) {
  let responseTimeSum = 0
  let responsesCount = 0
  let contributorResponses = 0
  let start = isoToTimestamp(issue.created_at)
  for (let i = 0; i < comments.length; i++) {
    const c = comments[i]
    if (isContributor(c)) {
      contributorResponses++
      if (start) {
        responsesCount++
        responseTimeSum += isoToTimestamp(c.created_at) - start
        start = undefined
      }
      // else more replies from contributors
    } else {
      // non-contributor
      if (!start) {
        // "new thread"
        start = isoToTimestamp(c.created_at)
      }
    }
  }
  if (start) {
    // no response till end
    const end = issue.closed_at ? isoToTimestamp(issue.closed_at) : Date.now()
    responsesCount++
    responseTimeSum += end - start
  }
  const average = responseTimeSum / responsesCount
  return {
    value: 100 - normalizator(average), // inverse
    average,
    issue,
    contributorResponses,
  }
}

const isContributor = comment => {
  // console.log('author_association', comment.author_association)
  return comment.author_association !== 'NONE'
}

function IssueResponseDetail({ ctx }) {
  const perIssue = ctx.get(CK_GH_COMMENTS_PER_ISSUES)
  const ratings = perIssue.map(analyzeIssue)
  console.log(ratings)
  const responseTime = average(ratings.map(r => r.average))
  const responses = sum(ratings.map(r => r.contributorResponses))
  return (
    <div>
      Average response time: {moment.duration(responseTime).humanize()}
      <div>Total contributor responses (in last issues): {responses}</div>
    </div>
  )
}

const plugin: CriteriaPlugin = {
  evaluate,
  requiredKeys: [CK_GH_COMMENTS_PER_ISSUES],
  detailComponent: IssueResponseDetail,
  name: 'Issue average response',
  description:
    'Average response time show how to contributors responde to the issues',
  weight: 15,
}

export default plugin
