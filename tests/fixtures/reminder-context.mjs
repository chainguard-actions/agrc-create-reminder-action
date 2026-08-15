// Fixture for testing: a comment with a /remind command.
// Named exports match the IssueCommentCreatedOrEditedEvent interface.
// Used for tests that need the action to find a reminder and proceed to API calls.

export const action = 'created';

export const comment = {
  id: 492700402,
  url: 'https://api.github.com/repos/Codertocat/Hello-World/issues/comments/492700402',
  html_url: 'https://github.com/Codertocat/Hello-World/issues/1#issuecomment-492700402',
  issue_url: 'https://api.github.com/repos/Codertocat/Hello-World/issues/1',
  user: {
    login: 'Codertocat',
    id: 21031067,
    type: 'User',
    site_admin: false,
  },
  created_at: '2019-05-15T22:20:21Z',
  updated_at: '2019-05-15T15:20:21Z',
  author_association: 'OWNER',
  body: '/remind me to deploy in one day',
};

export const issue = {
  id: 444500041,
  url: 'https://api.github.com/repos/Codertocat/Hello-World/issues/1',
  number: 1,
  title: 'Test issue',
  user: {
    login: 'Codertocat',
    id: 21031067,
    type: 'User',
    site_admin: false,
  },
  labels: [],
  state: 'open',
  locked: false,
  assignee: null,
  assignees: [],
  milestone: null,
  comments: 0,
  created_at: '2019-05-15T15:20:18Z',
  updated_at: '2019-05-15T15:20:21Z',
  closed_at: null,
  author_association: 'OWNER',
  body: 'This is a test issue body.',
};

export const repository = {
  id: 186853002,
  name: 'Hello-World',
  full_name: 'Codertocat/Hello-World',
  private: false,
  owner: {
    login: 'Codertocat',
    id: 21031067,
    type: 'User',
    site_admin: false,
  },
  default_branch: 'master',
};

export const sender = {
  login: 'Codertocat',
  id: 21031067,
  type: 'User',
  site_admin: false,
};
