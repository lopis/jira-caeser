import { init } from './server.js'
import { getRandomBacklogIssue, voteForIssue, initJiraClient } from './jira.js'

init()
initJiraClient()
const issue = await getRandomBacklogIssue()
console.log('next issue:', issue.key);
// voteForIssue(issue.key)