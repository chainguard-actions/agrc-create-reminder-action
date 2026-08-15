<!-- markdownlint-disable -->

# Hardening Report: agrc--create-reminder-action/v1.1.24

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **agrc--create-reminder-action/v1.1.24** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference GitHub Actions using mutable tags or branch names instead of immutable full 40-character SHA commit hashes. This exposes the workflow to supply-chain attacks if the referenced action is compromised or the tag is moved.

Failing references:
- issue_comment.yml: `agrc/create-reminder-action@main`
- pull_request.yml: `actions/checkout@v6`, `pnpm/action-setup@v4`, `actions/setup-node@v6`, `actions/create-github-app-token@v2` (used in multiple jobs)
- push.yml: `agrc/release-composite-action@v1`
- schedule.yml: `agrc/reminder-action@v1`

Locations:

- `.github/workflows/issue_comment.yml:17`
- `.github/workflows/pull_request.yml:13`
- `.github/workflows/pull_request.yml:18`
- `.github/workflows/pull_request.yml:23`
- `.github/workflows/pull_request.yml:36`
- `.github/workflows/pull_request.yml:41`
- `.github/workflows/pull_request.yml:46`
- `.github/workflows/pull_request.yml:57`
- `.github/workflows/pull_request.yml:62`
- `.github/workflows/pull_request.yml:67`
- `.github/workflows/push.yml:21`
- `.github/workflows/schedule.yml:14`

### script-injection (severity: high)

Sub-rule (a): In pull_request.yml, the 'Commit and push if needed' run: block directly interpolates GitHub Actions expressions inside shell commands:
  `git config user.name "${{ secrets.UGRC_RELEASE_BOT_NAME }}"`
  `git config user.email "${{ secrets.UGRC_RELEASE_BOT_EMAIL }}"`
Any `${{ ... }}` expression interpolated directly inside a run: shell command string is a script-injection risk because YAML template substitution occurs before the shell ever sees the value, bypassing shell quoting. These values should be passed via env: variables and referenced as shell variables instead.

Locations:

- `.github/workflows/pull_request.yml:83`
- `.github/workflows/pull_request.yml:84`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all unpinned action references by pinning to full 40-character SHA hashes with tag comments preserved: agrc/create-reminder-action@main→8798362d, actions/checkout@v6→d23441a4, pnpm/action-setup@v4→b906affc, actions/setup-node@v6→24997072, actions/create-github-app-token@v2→fee1f7d6, agrc/release-composite-action@v1→a10e80a5, agrc/reminder-action@v1→76a6297d. Fixed script injection in pull_request.yml 'Commit and push if needed' step by moving ${{ secrets.UGRC_RELEASE_BOT_NAME }} and ${{ secrets.UGRC_RELEASE_BOT_EMAIL }} into an env: block as BOT_NAME and BOT_EMAIL, then referencing them as plain shell variables in the run: script.

