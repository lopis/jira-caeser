import { WebClient } from '@slack/web-api';
import { getRandomBacklogIssue } from './jira.js'

// Read a token from the environment variables
const token = process.env.SLACK_BOT_TOKEN;

// Initialize
const web = new WebClient(token);

const conversationId = 'C0276BUNLAX'; //offsite-slack-bots channel
const messages = [
  'Let\'s take a look at this ticket:',
  'Today I have for you:',
  'I picked this ticket for you today:',
  'How about this ticket?',
  'Have a go with this one:',
  'What about this one?'
]

const getIntro = () => {
  return messages[Math.round(Math.random() * messages.length - 1)]
}

const sendRefinementMessage = async (line) => {
  if (url && summary) {
    const response = await web.chat.postMessage({
      channel: channel_id,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: line
          },
        },
      ]
    });
    ['u1', 'u2', 'u3', 'u5'].forEach(async (emoji) => {
      await web.reactions.add({
        name: emoji,
        channel: channel_id,
        timestamp: response.ts,
      });
    });
  }
};

/**
 * Payload example:
 *  token=gIkuvaNzQIHg97ATvDxqgjtO
 *  team_id=T0001
 *  team_domain=example
 *  enterprise_id=E0001
 *  enterprise_name=Globular%20Construct%20Inc
 *  channel_id=C2147483705
 *  channel_name=test
 *  user_id=U2147483697
 *  user_name=Steve
 *  command=/weather
 *  text=94070
 *  response_url=https://hooks.slack.com/commands/1234/5678
 *  trigger_id=13345224609.738474920.8088930838d88f008e0
 *  api_app_id=A123456
 */
const sendRefinementMessages = async (messages, body) => {
  const { channel_id } = body;
  console.log('typeof messages', typeof messages);
  web.chat.postMessage({
    channel: channel_id,
    text: '🌿 Starting refinement 🌿'
  }).then(() => {
    messages.forEach(sendRefinementMessage);
  })
}

export {
  sendRefinementMessages,
}