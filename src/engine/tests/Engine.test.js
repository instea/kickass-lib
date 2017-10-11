// @flow
import Engine from '../Engine'

describe('Engine:run', () => {
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

describe('Engine:evaluate', () => {
  function mockSimplePlugin(weight, val) {
    return {
      evaluate: ctx => val,
      description: 'tmp',
      weight,
    }
  }
  function mockKeyPlugin(weight, key) {
    return {
      evaluate: ctx => ctx.get(key),
      description: 'tmp',
      weight,
    }
  }
  it('computes weighted rating', () => {
    const e = new Engine()
    const plugin1 = mockSimplePlugin(2, 10)
    const plugin2 = mockSimplePlugin(3, 5)

    const rating = e.evaluate([plugin1, plugin2])
    expect(rating).toBe(7)
  })

  it('skip not-met plugins', () => {
    const e = new Engine()
    const plugin1 = mockKeyPlugin(5, 'key')

    const rating = e.evaluate([plugin1])
    expect(rating).toBe(undefined)
  })

  it('evalutate key from context', () => {
    const e = new Engine({ key: 10 })
    const plugin1 = mockKeyPlugin(5, 'key')

    const rating = e.evaluate([plugin1])
    expect(rating).toBe(10)
  })
})
