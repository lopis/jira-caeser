import { AgileClient, Version3Client, Version3Models, Version3Parameters } from 'jira.js'

const jiraHost = 'https://lopis-playground.atlassian.net'

let client, agileClient

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
    console.log(`Found ${backlog.issues.length} issues in the backlog.`);

    return nextIssue;
  } catch (error) {
    console.error(error);
  }
}

export async function voteForIssue(issueIdOrKey) {
  const votes = await client.issueVotes.getVotes({ issueIdOrKey })
  console.log(votes.votes + ' votes.');
  await client.issueVotes.addVote({ issueIdOrKey: issueIdOrKey })
}