// @flow

const path = require('path')
const fs = require('fs')
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
)
const URL = require('domurl')
const defPort = process.env.SERVER_PORT || 80
const port =
  process.env.NODE_ENV !== 'production' ? new URL(pkg.proxy).port : defPort

const config = {
  port,
  githubUrls: {
    ACCESS_TOKEN: 'https://github.com/login/oauth/access_token',
  },
  github: [
    {
      CLIENT_ID: '8854c61e8d8a70aa89fc',
      SECRET: 'f70dcfe4d3d44eb25e2b334e51fe09d329caed89',
    },
    {
      CLIENT_ID: 'b9470cae4abc802c75d8',
      SECRET: '4e9553db79bcff677b95eec1306680098b225bad',
    },
  ],
  defaultGithub: {
    SECRET: process.env.GH_SECRET || 'xxx',
  },
  allowOrigin: process.env.ALLOW_ORIGIN || 'https://instea.github.io',
}

module.exports = config
