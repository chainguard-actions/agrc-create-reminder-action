// Simulated issue_comment payload: the /remind command is inside a code block and must be ignored.
export const action = 'created';
export const comment = {
  body: 'Here is how to use it:\r\n```\r\n/remind me to do this in one day\r\n```\r\nend',
};
export const sender = { login: 'Codertocat' };
export const issue = { number: 1, body: 'Issue body' };
export const repository = { name: 'sample-repo', owner: { login: 'sample-owner' } };
export default { action, comment, sender, issue, repository };
