import express from 'express'
import { sendMessage } from './slack.js'
import { voteForIssue } from './jira.js'

const port = process.env.PORT || 9000

const init = () => {
  const app = express()
  // app.use(express.json())
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.send('Hello! This is Caeser for JIRA.')
    console.log(req.body);
  })

  app.post('/action', (req, res) => {
    const payload = JSON.parse(req.body.payload)
    const action = payload.actions[0].value
    console.log(action);
    if (action === 'upvote') {
      voteForIssue()
    }
  })

  app.post('/call', (res) => {
    res.send('OK.')
    sendMessage()
  })

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

export { init }