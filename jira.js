import { AgileClient, Version3Client, Version3Models, Version3Parameters } from 'jira.js'

const jiraHost = 'https://ecosia.atlassian.net'

/**
 * @type Version3Client
 */
let client

/**
 * @type AgileClient
 */
let agileClient

const config = {
  host: jiraHost,
  authentication: {
    basic: {
      email: process.env.JIRA_EMAIL,
      apiToken: process.env.JIRA_API_TOKEN,
    },
  },
}

export function initJiraClient() {
  client = new Version3Client(config);
  agileClient = new AgileClient(config);
}

export async function getRandomBacklogIssue() {
  try {
    // 1. select project
    // 2. select board
    // 3. find backlog
    const boards = await agileClient.board.getAllBoards();
    const backlog = await agileClient.board.getIssuesForBacklog({ boardId: boards.values[0].id })
    const nextIssue = backlog.issues[Math.round(Math.random() * backlog.issues.length)];
    console.log(`Found ${backlog.issues.length} issues in the backlog. Next is ${nextIssue.key}`);

    return {
      id: nextIssue.id,
      key: nextIssue.key,
      title: nextIssue.fields?.summary
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getUnestimatedIssues() {
  try {
    const boards = await agileClient.board.getAllBoards();
    const results = await client.issueSearch.searchForIssuesUsingJql({
      jql: 'project = SEAII AND "Story point estimate" = EMPTY AND Sprint != EMPTY AND Sprint != 108 AND Sprint != 134 AND statusCategory != Done AND type = Task AND (labels != spike OR labels = EMPTY) ORDER BY status ASC'
    })
    console.log(`Found ${results.total} issues in the filter.`);
    if (results.total < 1) {
      return
    }
    const messages = results.issues.map(({ key, fields }) => {
      return `<${jiraHost}/browse/${key}|${key}> - ${fields.summary} (${fields.status.name})`
    })
    return messages
  } catch (error) {
    console.error(error);
  }
}

export async function voteForIssue(issueIdOrKey) {
  const votes = await client.issueVotes.getVotes({ issueIdOrKey })
  console.log(votes.votes + ' votes.');
  await client.issueVotes.addVote({ issueIdOrKey: issueIdOrKey })
}