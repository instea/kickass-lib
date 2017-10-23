// @flow

const config = {
  authUrl: '',
  // For url: http://localhost:3000
  GITHUB_CLIENT_ID: 'b9470cae4abc802c75d8',
}

const productionConfig = {
  authUrl: 'https://kickass.instea.co',
  // For url: https://instea.github.io/kickass-lib/
  GITHUB_CLIENT_ID: '8854c61e8d8a70aa89fc',
}

export default (process.env.NODE_ENV === 'production'
  ? productionConfig
  : config)
