// @flow

const express = require('express')
const bodyParser = require('body-parser')
const superagent = require('superagent')
const app = express()

const config = require('./config')
const { port, github, githubUrls, defaultGithub, allowOrigin } = config

if (allowOrigin) {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', allowOrigin)
    res.header(
      'Access-Control-Allow-Methods',
      'GET, PUT, POST, DELETE, OPTIONS'
    )
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With'
    )
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200)
    } else {
      //move on
      next()
    }
  })
}

app.use(bodyParser.json())
app.post('/access_token', (req, res) => {
  console.log('request to /access_token', req.body)
  const { code, clientId, redirectUri } = req.body
  const githubConf =
    github.find(conf => conf.CLIENT_ID === clientId) || defaultGithub
  if (!githubConf) {
    return res.send({ status: 'error', message: 'Incorrect client id' })
  }
  const data = {
    client_id: clientId,
    client_secret: githubConf.SECRET,
    code: code,
    redirect_uri: redirectUri,
  }
  console.log('/access_token sending data', data)
  superagent
    .post(githubUrls.ACCESS_TOKEN)
    .set('Accept', 'application/json')
    .send(data)
    .then(({ body: resp }) => {
      console.log('/access_token received data', resp)
      const accessToken = resp.access_token
      if (accessToken) {
        res.send({ status: 'success', accessToken })
      } else {
        res.send({
          status: 'error',
          message: resp.error_description,
        })
      }
    })
    .catch(err => res.send({ status: 'error', message: err.message }))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
