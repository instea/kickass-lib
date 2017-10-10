// @flow
import Engine from '../Engine'

describe('Engine', () => {
  it('execute synchronous plugin', () => {
    const e = new Engine()
    const plugin1 = {
      fetch: ctx => {
        ctx.set('key', 1)
      },
    }
    return e.run([plugin1]).then(() => {
      expect(e.ctx.get('key')).toEqual(1)
    })
  })

  it('execute asynchronous plugin', () => {
    const e = new Engine()
    const plugin1 = {
      fetch: ctx => {
        return new Promise(resolve => {
          ctx.set('key', 1)
          resolve()
        })
      },
    }
    return e.run([plugin1]).then(() => {
      expect(e.ctx.get('key')).toEqual(1)
    })
  })
})
