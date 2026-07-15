# GitHub Ruleset Setup for Nova Systems Lab Platform

This guide defines the recommended GitHub branch ruleset for protecting `main`.

## Recommended approach

Create one branch ruleset named:

```text
Protect main
```

A single ruleset is sufficient at this stage. GitHub combines overlapping rulesets and applies the most restrictive result, so adding several overlapping rulesets without a specific need can make maintenance confusing.

## Navigation

Open:

```text
Repository → Settings → Rules → Rulesets → New ruleset → New branch ruleset
```

## Ruleset name

```text
Protect main
```

## Enforcement status

Select:

```text
Active
```

Do not use Evaluate or Disabled for the final setup.

## Bypass list

Recommended now:

```text
No bypass actors
```

This means even repository administrators follow the pull-request and CI workflow.

If GitHub requires or you deliberately choose an emergency bypass, allow only the repository administrator and select a mode that requires a pull request where available. Use bypass only for genuine recovery situations.

Do not add ordinary contributors, broad teams, or GitHub Apps unless they genuinely need bypass rights.

## Target branches

Under branch targeting:

1. Choose **Include default branch**, or
2. Add the branch pattern `main`.

Do not target every feature branch. Developers should be free to update their own feature branches while `main` remains protected.

## Rules to enable

### Restrict deletions

Enable: **Yes**

Purpose: prevents accidental or unauthorized deletion of `main`.

### Restrict updates

Enable: **No**

This rule can prevent normal pull-request merges except for bypass actors. Pull-request protection is handled by the dedicated pull-request rule.

### Require linear history

Recommended: **Yes**

Purpose: prevents merge commits from entering `main` and keeps history easier to audit.

Repository merge settings should therefore allow **Squash merging** or **Rebase merging**. Squash merging is the simplest default for this project.

### Require deployments to succeed before merging

Enable: **No for now**

Render deployment happens after changes reach `main`, so requiring a production deployment before merging would create a circular workflow unless preview deployments are configured later.

### Require signed commits

Recommended now: **No**

Signed commits are useful, but enabling this before all maintainers and automation are prepared can block legitimate work. Revisit after contributor onboarding and signing documentation are ready.

### Require a pull request before merging

Enable: **Yes**

Configure:

- Required approvals: **0 for now while you are the only maintainer**
- Dismiss stale pull-request approvals when new commits are pushed: **Yes**
- Require review from Code Owners: **No for now**
- Require approval of the most recent reviewable push: **No for now**
- Require conversation resolution before merging: **Yes**

Why zero approvals: GitHub generally does not allow the author to approve their own pull request. Requiring one approval while you are the only maintainer could prevent you from merging. Change this to one approval when a trusted reviewer joins.

### Require status checks to pass

Enable: **Yes**

Add the status check produced by the current CI workflow. Based on the existing workflow, it will likely appear as:

```text
Test and build
```

Select the exact check name shown by a successful GitHub Actions run.

Configure:

- Require branches to be up to date before merging: **Yes**
- Do not add optional or unstable checks as required
- Keep only checks that run on every pull request to `main`

If the check does not appear in the selector, first let the workflow complete successfully on the repository, then return to the ruleset.

### Block force pushes

Enable: **Yes**

Purpose: protects history from being rewritten.

### Require code scanning results

Enable: **No for now**

Enable later after GitHub code scanning is configured and has produced stable results.

### Require code quality results

Enable: **No for now**

Enable only after a corresponding tool is configured and consistently reports results.

### Restrict creations

Enable: **No**

`main` already exists, and this rule is mainly useful for tightly controlled branch patterns.

### Restrict commits by metadata

Enable: **No for now**

Do not enforce commit-message patterns until the team has a documented convention and automation is known to comply.

## Repository merge settings

Open:

```text
Repository → Settings → General → Pull Requests
```

Recommended:

- Allow squash merging: **Yes**
- Default commit message for squash: pull-request title or title and description
- Allow merge commits: **No**
- Allow rebase merging: optional; **No** is simplest
- Always suggest updating pull-request branches: **Yes**
- Allow auto-merge: optional
- Automatically delete head branches: **Yes**

With linear history enabled, squash merging is the simplest consistent strategy.

## Expected workflow after activation

```text
feature branch
→ push commits
→ open pull request into main
→ CI: Test and build
→ resolve conversations
→ update branch if required
→ squash and merge
→ Render deploys main
```

## Later changes when contributors join

When at least one trusted reviewer is consistently available:

- change required approvals from `0` to `1`;
- consider adding a `CODEOWNERS` file;
- require Code Owner review for sensitive areas;
- consider signed commits;
- consider dependency review and code scanning;
- keep production infrastructure access separate from repository contribution access.

## Sensitive ownership areas for future CODEOWNERS

Potential paths:

```text
/.github/                 repository automation
/render.yaml              deployment configuration
/packages/database/       database schema and client
/apps/api/src/config/     API configuration and environment validation
```

Do not enable mandatory Code Owner review until the ownership file and reviewer availability are reliable.
