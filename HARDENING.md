<!-- markdownlint-disable -->

# Hardening Report: agrc--create-reminder-action/v1.1.25

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **agrc--create-reminder-action/v1.1.25** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Two ${{ }} expressions are interpolated directly inside a run: shell command block in the 'Commit and push if needed' step. Specifically: `git config user.name "${{ secrets.UGRC_RELEASE_BOT_NAME }}"` and `git config user.email "${{ secrets.UGRC_RELEASE_BOT_EMAIL }}"`. Any ${{ ... }} expression interpolated directly into a run: block is a script-injection risk because YAML template substitution happens before the shell ever sees the value, allowing special characters to break out of the quoted context. These values should be passed via env: variables and referenced as $ENV_VAR instead.

Locations:

- `.github/workflows/pull_request.yml:83`
- `.github/workflows/pull_request.yml:84`

### unpinned-uses (severity: high)

Multiple workflow files reference GitHub Actions using mutable tag or branch refs instead of immutable full 40-character SHA commit hashes, making them vulnerable to supply-chain attacks if the referenced tag or branch is moved or compromised.

issue_comment.yml:
  - uses: agrc/create-reminder-action@main  (branch ref)

pull_request.yml:
  - uses: actions/checkout@v6  (tag ref, appears 3 times)
  - uses: pnpm/action-setup@v6.0.5  (tag ref, appears 3 times)
  - uses: actions/setup-node@v6  (tag ref, appears 3 times)
  - uses: actions/create-github-app-token@v3.1.1  (tag ref)

push.yml:
  - uses: agrc/release-composite-action@v1  (tag ref)

schedule.yml:
  - uses: agrc/reminder-action@v1  (tag ref)

Locations:

- `.github/workflows/issue_comment.yml:17`
- `.github/workflows/pull_request.yml:16`
- `.github/workflows/pull_request.yml:20`
- `.github/workflows/pull_request.yml:25`
- `.github/workflows/pull_request.yml:48`
- `.github/workflows/pull_request.yml:52`
- `.github/workflows/pull_request.yml:57`
- `.github/workflows/pull_request.yml:65`
- `.github/workflows/pull_request.yml:69`
- `.github/workflows/pull_request.yml:74`
- `.github/workflows/pull_request.yml:78`
- `.github/workflows/push.yml:21`
- `.github/workflows/schedule.yml:14`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed script-injection in pull_request.yml by moving UGRC_RELEASE_BOT_NAME and UGRC_RELEASE_BOT_EMAIL secrets from inline ${{ }} expressions in the run: block into an env: block, referencing them as $BOT_NAME and $BOT_EMAIL in the shell script. Pinned all unpinned action references to full 40-character SHA hashes across all four workflow files: actions/checkout@v6, pnpm/action-setup@v6.0.5, actions/setup-node@v6, actions/create-github-app-token@v3.1.1 (pull_request.yml); agrc/create-reminder-action@main (issue_comment.yml); agrc/release-composite-action@v1 (push.yml); agrc/reminder-action@v1 (schedule.yml). Original tag/branch refs preserved as inline comments.

