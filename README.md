# workshop-github-action-copilot

A GitHub Action to perform releases with an IssueOps/ChatOps approach coded live
with the help of GitHub Copilot including prompts and step-by-step guidance.

First delivered as a live coding talk in OpenSlava 2024.

## Part 1. Scaffolding the project

Ask copilot:

```text
    hello. i would like to create a new github action using typescript. how can i start creating it? thanks.

    i need to create a github action with typescript. could you respond with a step by step plan to create a brand new github action?

    is there any available repository template to create a brand new github action with typescript? thanks.

    does exist any repository template to speed up github action creation?

    is there any available repository template to create a brand new github action with typescript? what are the steps that I need to customize the repository created from the template? thanks.
```

Go to `github.com` by clicking the link to `actions/typescript-action`

Create the repository from the template

Clone it locally

Change into directory

Run in terminal:

```bash
    npm install
```

Open the folder in code

## Part 2. Customizing the template

Ask copilot:

```text
    which files should i modify to customize the github action just created?
```

Modify `action.yml`

- Include input parameter `release-version`
- Include input parameter `target-environment`
- Include output parameter `release-status`
- Include output parameter `target-url`

Modify `main.ts`

- Update input and output parameters so they are matching the action definition
- Add some dummy command in place of the actual release process

Run in terminal:

```bash
    npm run build
    npm run
    npm run all
```

Optional: modify `package.json`

Optional: modify `readme.md`

## Part 3: Update the unit tests

Ask copilot:

```text
    where are test files located in the project?
```

Click and modify `main.test.ts`:

- Update mocks so the input and output parameters are matching the action
  definition
- Remove the second test case

Run in terminal:

```bash
    npm run all
```

Commit and push changes

Go to `github.com` and check the workflows

Lint checks should fail as the CI workflow has wrong input parameters

The CI workflow execution log confirms the problem

## Part 4: Fix the CI workflow

Ask copilot:

```text
    where is the github action CI located?
```

Click `ci.yml`

Change input params

Ask copilot:

```text
    how can i run multi-line commands in a github action?
```

Add the other output params

Commit and push changes

Go to `github.com` and check the workflows

## Part 5: Add the release workflow

Ask copilot:

```text
    i need to write a github workflow that runs when an issue with a 'release' label has a new or modified comment and the comment content is '/approve'. could you generate the code of the workflow? thanks.
```

Create `.github/workflows/dorelease.yml`

Use the suggested code as starting point

Ask copilot:

```text
    could you double check whether the #selection is correct, and if not, suggest an alternate way of filtering the job run?

    what is the latest version for the actions/checkout github action?

    how can I limit permissions for this github workflow?
```

Modify the `approve-release` job

Fix the filter

Add permissions

Add the `dorelease` step

Add a step to log `dorelease` outputs

Add a step to close the issue

Ask copilot:

```text
    could you check whether the github token is missing in the job?
```

Add the missing token value

Create the `cancel-release` job

Commit and push changes

Go to `github.com` and check the workflows

Create new issue from web or terminal:

```bash
    gh label create release
    gh issue create --label release
```

Check that workflow is not running

Comment from web or terminal to cancel:

```bash
    gh issue comment 4 --body /cancel
```

Check that workflow is running as expected and the issue is closed

Create new issue from web or terminal:

```bash
    gh issue create --label release
```

Comment from web or terminal to approve:

```bash
    gh issue comment 5 --body /approve
```

Check that the workflow is running, the release is approved and the custom
action is executed

## Part 6: Add the release request form

Ask copilot:

```text
    how can i create a github issue form for releases with two parameters: release-version and target-environment?
```

Paste the suggestion into a new file

Fix validations

Save it as `.github/ISSUE_TEMPLATE/release-form.yml`

Commit

Ask copilot:

```text
    how can I read issue form input parameters in a github action?

    that code is not working. could you double check for alternate methods to access issue form parameters from the workflow?

    is there any reusable action in the marketplace to parse issue forms?

    could you show how to rewrite the issue form parsing by using the onmax/issue-form-parser action?
```

It seems that GitHub Copilot is not capable to provide the right suggestion to
read the input parameters from the form

Commit and push

Create a release issue and approve

Check that the workflow is running, the release is approved and the custom
action is executed using as input parameters those coming from the issue form
