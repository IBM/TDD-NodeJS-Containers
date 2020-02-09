# Contributing

This is an open source project, and we appreciate your help!

We use the GitHub issue tracker to discuss new features and non-trivial bugs.

In addition to the issue tracker, [#journeys on
Slack](https://dwopen.slack.com) is the best way to get into contact with the
project's maintainers.

To contribute code, documentation, or tests, please submit a pull request to
the GitHub repository. Generally, we expect two maintainers to review your pull
request before it is approved for merging. For more details, see the
[MAINTAINERS](MAINTAINERS.md) page.

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Setting Up the project locally

To install the project you need to have `yarn` and `node`

1. [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your fork:

   ```
   # Clone your fork
   git clone https://github.com/<your-username>/TDD-NodeJS-Containers.git

   # Navigate to the newly cloned directory
   cd TDD-NodeJS-Containers
   ```
2. `npm` to install dependencies
3. `npm start` to start the example app

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream git@github.com:IBM/TDD-NodeJS-Containers.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream,"
> Then fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`.
> Then you can make all of your pull request branches based on this `master`
> branch. Whenever you want to update your version of `master`, do a regular
> `git pull`.

## Submitting a Pull Request

Please go through existing issues and pull requests to check if somebody else is already working on it.

