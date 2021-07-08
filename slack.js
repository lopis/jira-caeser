import { WebClient } from '@slack/web-api';

// Read a token from the environment variables
const token = process.env.SLACK_BOT_TOKEN;

// Initialize
const web = new WebClient(token);

const conversationId = 'C0276BUNLAX'; //offsite-slack-bots channel
const sendMessage = async () => {

  // Post a message to the channel, and await the result.
  // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
  const result = await web.chat.postMessage({
    channel: conversationId,
    text: 'Daily clean up',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Let\'s take a look at this ticket: :jira: <https://lopis-playground.atlassian.net/browse/GP-1|GP-1 - Fix Bugs>'
        },
      },
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: 'Vote for this ticket if you think it\'s important. You can also vote to close it.',
          emoji: true
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '👍🏼 Up vote',
              emoji: true
            },
            style: 'primary',
            value: 'upvote',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'ℹ️ Needs info',
              emoji: true
            },
            value: 'info',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '⚠️ Outdated',
              emoji: true
            },
            value: 'outdated',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '🚫 Close',
              emoji: true
            },
            style: 'danger',
            value: 'close',
          }
        ],
      },
    ]
  });

  // The result contains an identifier for the message, `ts`.
  console.log(`Successfully send message ${result.ts} in conversation ${conversationId}`);
}

export {
  test,
}