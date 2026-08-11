<!-- markdownlint-disable -->

# Hardening Report: agrc--create-reminder-action/v1.1.26

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **agrc--create-reminder-action/v1.1.26** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference actions using mutable tags or branch names instead of full 40-character commit SHAs. This exposes the workflow to supply-chain attacks if the referenced tag or branch is moved to point to malicious code.

Failing references:
- .github/workflows/issue_comment.yml: `uses: agrc/create-reminder-action@main` (branch ref)
- .github/workflows/pull_request.yml: `uses: actions/checkout@v7` (tag)
- .github/workflows/pull_request.yml: `uses: pnpm/action-setup@v6.0.9` (tag)
- .github/workflows/pull_request.yml: `uses: actions/setup-node@v6` (tag)
- .github/workflows/pull_request.yml: `uses: actions/create-github-app-token@v3.2.0` (tag)
- .github/workflows/push.yml: `uses: agrc/release-composite-action@v1` (tag)
- .github/workflows/schedule.yml: `uses: agrc/reminder-action@v1` (tag)

All `uses:` references should be pinned to a full SHA, e.g. `uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4`.

Locations:

- `.github/workflows/issue_comment.yml:16`
- `.github/workflows/pull_request.yml:18`
- `.github/workflows/pull_request.yml:22`
- `.github/workflows/pull_request.yml:27`
- `.github/workflows/pull_request.yml:44`
- `.github/workflows/pull_request.yml:49`
- `.github/workflows/pull_request.yml:54`
- `.github/workflows/pull_request.yml:70`
- `.github/workflows/pull_request.yml:79`
- `.github/workflows/pull_request.yml:84`
- `.github/workflows/pull_request.yml:89`
- `.github/workflows/push.yml:21`
- `.github/workflows/schedule.yml:14`

### script-injection (severity: high)

A `run:` block in pull_request.yml directly interpolates GitHub Actions expressions (`${{ secrets.UGRC_RELEASE_BOT_NAME }}` and `${{ secrets.UGRC_RELEASE_BOT_EMAIL }}`) into shell command strings. Per rule (a), ANY `${{ ... }}` expression interpolated directly inside a `run:` block is a script-injection risk because the value flows through YAML template substitution before the shell ever sees it, allowing special shell characters in the value to be interpreted by the shell.

Offending lines:
```
git config user.name "${{ secrets.UGRC_RELEASE_BOT_NAME }}"
git config user.email "${{ secrets.UGRC_RELEASE_BOT_EMAIL }}"
```

Fix: move the values into `env:` variables and reference them as `"$ENV_VAR"` in the shell script:
```yaml
env:
  BOT_NAME: ${{ secrets.UGRC_RELEASE_BOT_NAME }}
  BOT_EMAIL: ${{ secrets.UGRC_RELEASE_BOT_EMAIL }}
run: |
  git config user.name "$BOT_NAME"
  git config user.email "$BOT_EMAIL"
```

Locations:

- `.github/workflows/pull_request.yml:96`
- `.github/workflows/pull_request.yml:97`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all unpinned action references by resolving each tag/branch to its full 40-character commit SHA using lookup_action_sha. In issue_comment.yml: pinned agrc/create-reminder-action@main. In pull_request.yml: pinned actions/checkout@v7, pnpm/action-setup@v6.0.9, actions/setup-node@v6, and actions/create-github-app-token@v3.2.0 (all 3 occurrences of checkout, pnpm, and setup-node). In push.yml: pinned agrc/release-composite-action@v1. In schedule.yml: pinned agrc/reminder-action@v1. Also fixed the script-injection finding in pull_request.yml by moving ${{ secrets.UGRC_RELEASE_BOT_NAME }} and ${{ secrets.UGRC_RELEASE_BOT_EMAIL }} into an env: block (as BOT_NAME and BOT_EMAIL) and referencing them as plain environment variables in the shell script.

