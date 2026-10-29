// Simulated issue_comment payload loaded via the action's testContextPath input.
export const action = 'created';
export const comment = { body: 'This is just a regular comment with no command.' };
export const sender = { login: 'Codertocat' };
export const issue = { number: 1, body: 'Issue body' };
export const repository = { name: 'sample-repo', owner: { login: 'sample-owner' } };
export default { action, comment, sender, issue, repository };
