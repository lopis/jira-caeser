import { init } from './server.js'
import { getUnestimatedIssues, initJiraClient } from './jira.js'

init()
initJiraClient()
await getUnestimatedIssues()
