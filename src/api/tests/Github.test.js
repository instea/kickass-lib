// @flow

import { templateToUrl } from '../Github'

describe('templateToUrl', () => {
  const TEMPLATE =
    'https://api.github.com/repos/instea/react-native-popup-menu/issues{/number}'

  it('removes undefined keys', () => {
    const url = templateToUrl(TEMPLATE)
    expect(url).toEqual(
      'https://api.github.com/repos/instea/react-native-popup-menu/issues'
    )
  })

  it('replaces the named keys retrieving special characters', () => {
    const url = templateToUrl(TEMPLATE, {
      number: 150,
    })
    expect(url).toEqual(
      'https://api.github.com/repos/instea/react-native-popup-menu/issues/150'
    )
  })
})
