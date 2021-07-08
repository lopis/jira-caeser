import express from 'express'

const port = 9000

const init = () => {
  const app = express()
  // app.use(express.json())
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.send('Hello! This is Caeser for JIRA.')
    console.log(req.body);
  })

  app.post('/', (req, res) => {
    res.send('Gotcha!')
    const payload = JSON.parse(req.body.payload)
    const action = payload.actions[0].value
    console.log(action);
  })

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

export { init }