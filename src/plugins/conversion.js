// @flow
import moment from 'moment'

export function isoToDate(str: string): Date {
  return moment(str).toDate()
}

export function isoToTimestamp(str: string): number {
  return isoToDate(str).getTime()
}
