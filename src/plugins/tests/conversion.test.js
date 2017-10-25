// @flow
import { isoToDate } from '../conversion'

describe('isoToDate', () => {
  it('parses UTC ISO format', () => {
    const val = isoToDate('2017-10-25T09:23:16.350Z')
    expect(val).toEqual(new Date(Date.UTC(2017, 9, 25, 9, 23, 16, 350)))
  })
})
