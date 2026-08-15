// Fixture: issue comment event context with no /remind command
export const action = "created";
export const issue = {
  url: "https://api.github.com/repos/Codertocat/Hello-World/issues/1",
  repository_url: "https://api.github.com/repos/Codertocat/Hello-World",
  labels_url: "https://api.github.com/repos/Codertocat/Hello-World/issues/1/labels{/name}",
  comments_url: "https://api.github.com/repos/Codertocat/Hello-World/issues/1/comments",
  events_url: "https://api.github.com/repos/Codertocat/Hello-World/issues/1/events",
  html_url: "https://github.com/Codertocat/Hello-World/issues/1",
  id: 444500041,
  node_id: "MDU6SXNzdWU0NDQ1MDAwNDE=",
  number: 1,
  title: "Spelling error in the README file",
  user: {
    login: "Codertocat",
    id: 21031067,
    node_id: "MDQ6VXNlcjIxMDMxMDY3",
    avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/Codertocat",
    html_url: "https://github.com/Codertocat",
    type: "User",
    site_admin: false
  },
  labels: [],
  state: "open",
  locked: false,
  assignee: null,
  assignees: [],
  milestone: null,
  comments: 0,
  created_at: "2019-05-15T15:20:18Z",
  updated_at: "2019-05-15T15:20:21Z",
  closed_at: null,
  author_association: "OWNER",
  body: "This is a regular issue body."
};
export const comment = {
  url: "https://api.github.com/repos/Codertocat/Hello-World/issues/comments/492700400",
  html_url: "https://github.com/Codertocat/Hello-World/issues/1#issuecomment-492700400",
  issue_url: "https://api.github.com/repos/Codertocat/Hello-World/issues/1",
  id: 492700400,
  node_id: "MDEyOklzc3VlQ29tbWVudDQ5MjcwMDQwMA==",
  user: {
    login: "Codertocat",
    id: 21031067,
    node_id: "MDQ6VXNlcjIxMDMxMDY3",
    avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/Codertocat",
    html_url: "https://github.com/Codertocat",
    type: "User",
    site_admin: false
  },
  created_at: "2019-05-15T22:20:21Z",
  updated_at: "2019-05-15T15:20:21Z",
  author_association: "OWNER",
  body: "This is just a regular comment with no reminder command."
};
export const repository = {
  id: 186853002,
  node_id: "MDEwOlJlcG9zaXRvcnkxODY4NTMwMDI=",
  name: "Hello-World",
  full_name: "Codertocat/Hello-World",
  private: false,
  owner: {
    login: "Codertocat",
    id: 21031067,
    node_id: "MDQ6VXNlcjIxMDMxMDY3",
    avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/Codertocat",
    html_url: "https://github.com/Codertocat",
    type: "User",
    site_admin: false
  },
  html_url: "https://github.com/Codertocat/Hello-World",
  description: null,
  fork: false,
  url: "https://api.github.com/repos/Codertocat/Hello-World",
  created_at: "2019-05-15T15:19:25Z",
  updated_at: "2019-05-15T15:19:27Z",
  pushed_at: "2019-05-15T15:20:13Z",
  git_url: "git://github.com/Codertocat/Hello-World.git",
  ssh_url: "git@github.com:Codertocat/Hello-World.git",
  clone_url: "https://github.com/Codertocat/Hello-World.git",
  default_branch: "master"
};
export const sender = {
  login: "Codertocat",
  id: 21031067,
  node_id: "MDQ6VXNlcjIxMDMxMDY3",
  avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/Codertocat",
  html_url: "https://github.com/Codertocat",
  type: "User",
  site_admin: false
};
