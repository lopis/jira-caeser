import { AgileClient, Version3Client, Version3Models, Version3Parameters } from 'jira.js'

const jiraHost = 'https://lopis-playground.atlassian.net'

export async function main() {
  try {
    // const agileClient = new AgileClient({
    //   host: jiraHost,
    //   authentication: {
    //     basic: {
    //       email: process.env.JIRA_EMAIL,
    //       apiToken: process.env.JIRA_API_TOKEN,
    //     },
    //   },
    // });
    const client = new Version3Client({
      host: jiraHost,
      authentication: {
        basic: {
          email: process.env.JIRA_EMAIL,
          apiToken: process.env.JIRA_API_TOKEN,
        },
      },
    });


    // 1. select project
    // 2. select board
    // 3. find backlog
    // const boards = await agileClient.board.getAllBoards();
    // const boardId = boards.values[0].id;
    // const backlogIssues = await agileClient.board.getIssuesForBacklog({ boardId })
    // const issueKey = backlogIssues.issues[0].key
    // console.log(issueKey);

    const issueKey = 'GP-2'
    const votes = await client.issueVotes.getVotes({ issueIdOrKey: issueKey })
    console.log(votes.votes + ' votes.');
    await client.issueVotes.addVote({ issueIdOrKey: issueKey })

  } catch (error) {
    console.error(error);
  }

}