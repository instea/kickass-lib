// @flow

const express = require('express')
const bodyParser = require('body-parser')
const superagent = require('superagent')
const app = express()

const config = require('./config')
const { port, github, githubUrls } = config

app.use(bodyParser.json())
app.post('/access_token', (req, res) => {
  console.log('request to /access_token', req.body)
  const { code, clientId } = req.body
  const githubConf = github.filter(conf => conf.CLIENT_ID === clientId)[0]
  if (!githubConf) {
    return res.send({ status: 'error', message: 'Incorrect client id' })
  }
  const data = {
    client_id: githubConf.CLIENT_ID,
    client_secret: githubConf.SECRET,
    code: code,
    redirect_uri: req.get('Referrer'),
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

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})
