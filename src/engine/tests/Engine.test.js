// @flow
import Engine from '../Engine'

describe('Engine', () => {
  it('execute plugin', () => {
    const e = new Engine()
    const plugin1 = { fetch: () => Promise.resolve(1) }
    return e.run([plugin1]).then(result => {
      expect(result).toEqual(1)
    })
  })
})
