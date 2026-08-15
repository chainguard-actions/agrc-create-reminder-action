<!-- markdownlint-disable -->

# Hardening Report: agrc--create-reminder-action/v1.1.23

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **agrc--create-reminder-action/v1.1.23** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference actions using mutable tags or branch names instead of pinned full-length SHA commit hashes. This exposes the workflow to supply-chain attacks where a tag could be silently moved to point to malicious code.

Failing references:
- .github/workflows/issue_comment.yml: `agrc/create-reminder-action@main`
- .github/workflows/pull_request.yml: `actions/checkout@v5` (×3), `pnpm/action-setup@v4` (×3), `actions/setup-node@v6` (×3), `actions/create-github-app-token@v2`
- .github/workflows/push.yml: `agrc/release-composite-action@v1`
- .github/workflows/schedule.yml: `agrc/reminder-action@v1`

All should be pinned to a full 40-character hex SHA, e.g. `actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v5`.

Locations:

- `.github/workflows/issue_comment.yml:17`
- `.github/workflows/pull_request.yml:13`
- `.github/workflows/pull_request.yml:17`
- `.github/workflows/pull_request.yml:22`
- `.github/workflows/pull_request.yml:38`
- `.github/workflows/pull_request.yml:42`
- `.github/workflows/pull_request.yml:47`
- `.github/workflows/pull_request.yml:57`
- `.github/workflows/pull_request.yml:63`
- `.github/workflows/pull_request.yml:68`
- `.github/workflows/pull_request.yml:73`
- `.github/workflows/push.yml:21`
- `.github/workflows/schedule.yml:13`

### script-injection (severity: high)

Sub-rule (a): The 'Commit and push if needed' step in pull_request.yml directly interpolates GitHub Actions expressions inside a `run:` shell command string. The expressions `${{ secrets.UGRC_RELEASE_BOT_NAME }}` and `${{ secrets.UGRC_RELEASE_BOT_EMAIL }}` are substituted into the shell command before the shell ever sees them, meaning any special characters in those values (semicolons, backticks, etc.) would be interpreted by the shell. Even though these come from `secrets.*`, the YAML template substitution happens before shell quoting, making this a script-injection risk.

Offending lines:
  `git config user.name "${{ secrets.UGRC_RELEASE_BOT_NAME }}"`
  `git config user.email "${{ secrets.UGRC_RELEASE_BOT_EMAIL }}"`

Fix: Move the values into `env:` variables and reference them as `"$ENV_VAR"` in the shell script.

Locations:

- `.github/workflows/pull_request.yml:93`
- `.github/workflows/pull_request.yml:94`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all unpinned action references by resolving each to its full 40-character SHA:
- issue_comment.yml: agrc/create-reminder-action@main → @8798362d131d74a70435283581f566c4986328dd # main
- pull_request.yml: actions/checkout@v5 → @fbc6f3992d24b796d5a048ff273f7fcc4a7b6c09 # v5 (×3), pnpm/action-setup@v4 → @b906affcce14559ad1aafd4ab0e942779e9f58b1 # v4 (×3), actions/setup-node@v6 → @249970729cb0ef3589644e2896645e5dc5ba9c38 # v6 (×3), actions/create-github-app-token@v2 → @fee1f7d63c2ff003460e3d139729b119787bc349 # v2
- push.yml: agrc/release-composite-action@v1 → @a10e80a55af2d482f699607f56312ffec5c9400b # v1
- schedule.yml: agrc/reminder-action@v1 → @76a6297d144adb572b4cf6d9c0ee667f0ec6b832 # v1

Fixed script injection in pull_request.yml 'Commit and push if needed' step: moved ${{ secrets.UGRC_RELEASE_BOT_NAME }} and ${{ secrets.UGRC_RELEASE_BOT_EMAIL }} into an env: block as BOT_NAME and BOT_EMAIL, then referenced them as $BOT_NAME and $BOT_EMAIL in the shell script.

