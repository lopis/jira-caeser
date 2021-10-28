import express from 'express'
import { sendRefinementMessages } from './slack.js'
import { getUnestimatedIssues } from './jira.js'

const port = process.env.PORT || 9000

const init = () => {
  const app = express()
  // app.use(express.json())
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.send('Hello! This is Caeser for JIRA.')
    console.log(req.body);
  })

  app.post('/refine', (req, res) => {
    res.send('Received batch of messages...')

    const messages = await getUnestimatedIssues()
    sendRefinementMessages(messages, req.body)
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

export { init }