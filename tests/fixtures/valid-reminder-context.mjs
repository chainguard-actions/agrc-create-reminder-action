// Simulated issue_comment payload with a valid /remind command.
export const action = 'created';
export const comment = { body: '/remind me to do something in one day' };
export const sender = { login: 'Codertocat' };
export const issue = { number: 1, body: 'Issue body' };
export const repository = { name: 'sample-repo', owner: { login: 'sample-owner' } };
export default { action, comment, sender, issue, repository };
