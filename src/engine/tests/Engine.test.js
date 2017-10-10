// @flow
import Engine from '../Engine'

describe('Engine', () => {
  function checkDefaultKey(plugins) {
    const e = new Engine()
    return e.run(plugins).then(() => {
      expect(e.ctx.get('key')).toEqual(1)
    })
  }

  const setDefaultKey = ctx => ctx.set('key', 1)

  it('execute synchronous plugin', () => {
    const plugin = {
      fetch: setDefaultKey,
    }
    return checkDefaultKey([plugin])
  })

  it('execute asynchronous plugin', () => {
    const plugin = {
      fetch: ctx => {
        return new Promise(resolve => {
          ctx.set('key', 1)
          resolve()
        })
      },
    }
    return checkDefaultKey([plugin])
  })

  it('does not execute plugin without met requirements', () => {
    const plugin = {
      fetch: setDefaultKey,
      requiredKeys: ['not_met_key'],
    }
    const e = new Engine()
    return e.run([plugin]).then(() => {
      expect(e.ctx.get('key')).toBeUndefined()
    })
  })

  it('execute dependent plugins in order', () => {
    const plugin1 = {
      fetch: setDefaultKey,
      requiredKeys: ['int_key'],
    }
    const plugin2 = {
      // 0 is also value
      fetch: ctx => ctx.set('int_key', 0),
    }
    return checkDefaultKey([plugin1, plugin2])
  })
})
