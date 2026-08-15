<!-- markdownlint-disable -->

# Hardening Report: agrc--create-reminder-action/v1.1.22

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **agrc--create-reminder-action/v1.1.22** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference actions using mutable tags or branch names instead of pinned full-length SHA commit hashes, making them vulnerable to supply-chain attacks.

.github/workflows/issue_comment.yml:
  - uses: agrc/create-reminder-action@main  (branch ref)

.github/workflows/pull_request.yml:
  - uses: actions/checkout@v4
  - uses: pnpm/action-setup@v4
  - uses: actions/setup-node@v4
  - uses: actions/create-github-app-token@v2

.github/workflows/push.yml:
  - uses: agrc/release-composite-action@v1

.github/workflows/schedule.yml:
  - uses: agrc/reminder-action@v1

Locations:

- `.github/workflows/issue_comment.yml:17`
- `.github/workflows/pull_request.yml:18`
- `.github/workflows/pull_request.yml:22`
- `.github/workflows/pull_request.yml:27`
- `.github/workflows/pull_request.yml:68`
- `.github/workflows/push.yml:19`
- `.github/workflows/schedule.yml:14`

### script-injection (severity: high)

Sub-rule (a): The 'Commit and push if needed' run: block in pull_request.yml directly interpolates ${{ secrets.UGRC_RELEASE_BOT_NAME }} and ${{ secrets.UGRC_RELEASE_BOT_EMAIL }} inside shell command strings. Any ${{ ... }} expression interpolated directly into a run: block is processed by the YAML template engine before the shell ever sees it, bypassing shell quoting and enabling injection if the value contains shell metacharacters. These should be moved to env: variables and referenced as $ENV_VAR instead.

Offending lines:
  git config user.name "${{ secrets.UGRC_RELEASE_BOT_NAME }}"
  git config user.email "${{ secrets.UGRC_RELEASE_BOT_EMAIL }}"

Locations:

- `.github/workflows/pull_request.yml:97`
- `.github/workflows/pull_request.yml:98`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all 7 unpinned action references by pinning to full commit SHAs: agrc/create-reminder-action@main → @8798362d131d74a70435283581f566c4986328dd, actions/checkout@v4 → @11d5960a326750d5838078e36cf38b85af677262, pnpm/action-setup@v4 → @b906affcce14559ad1aafd4ab0e942779e9f58b1, actions/setup-node@v4 → @49933ea5288caeca8642d1e84afbd3f7d6820020, actions/create-github-app-token@v2 → @fee1f7d63c2ff003460e3d139729b119787bc349, agrc/release-composite-action@v1 → @a10e80a55af2d482f699607f56312ffec5c9400b, agrc/reminder-action@v1 → @76a6297d144adb572b4cf6d9c0ee667f0ec6b832. Fixed script injection in pull_request.yml by moving ${{ secrets.UGRC_RELEASE_BOT_NAME }} and ${{ secrets.UGRC_RELEASE_BOT_EMAIL }} into an env: block as BOT_NAME and BOT_EMAIL, then referencing them as plain shell variables in the run: block.

