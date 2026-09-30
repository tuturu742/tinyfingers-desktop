# TinyFingers Desktop

A fullscreen smash toy for toddlers — keys and clicks make shapes, colours and sounds —
as a **desktop app** rather than a web page.

In the spirit of [TinyFingers](https://tinyfingers.net/), and built for the one thing a
browser cannot do: **hold the keys that would end the session.** In a tab, `Esc` leaves
fullscreen, `/` opens quick-find, and `F11`, `Ctrl+W` and `Cmd+Q` belong to the browser. A
desktop shell can intercept them. Leaving requires a password, `parent` by default.

---

## This repository is an exercise

**`main` is deliberately a scaffold.** A `package.json`, an empty `test/`, a licence and
this file — no app. The working application lives in **[pull request
#5](https://github.com/tuturu742/tinyfingers-desktop/pull/5)**, built end to end by
[Pyrrhula](https://github.com/tuturu742/pyrrhula)'s coding agents: a lead persona frames the
work, a developer persona builds it inside a container through a coding harness, and the
lead reads the diff against the task and approves it or sends it back. It was opened by one
GitHub account and approved by another, because an account cannot approve its own pull
request.

Read that pull request to see what the loop produces. Then **do it yourself, in your own
fork**, and compare.

> **Why a fork, and not this repository?** You do not have push access here, and you never
> will — delegated work pushes branches and opens pull requests under a credential *you*
> give Pyrrhula, and that credential has to own the repository it writes to. GitHub will
> let anyone open a pull request *from* a fork of a public repo, but nobody can push a
> branch into someone else's repository. So: fork, then point Pyrrhula at your fork.

---

## What this honestly cannot do

Read this before trusting it with a determined toddler and an unlocked machine.

Electron's `before-input-event` and `globalShortcut` hold keys **while the app has focus**.
They do not hold:

- **Ctrl+Alt+Del** on Windows — reserved by the OS by design, and nothing in user space
  intercepts it
- **Cmd+Q / Cmd+Tab** on macOS without accessibility entitlements the user must grant
- **Alt+Tab** under most Linux window managers, which own it before the app sees it

And a password documented in this README is a **speed bump for a toddler, not a security
control**. It stops a two-year-old, not a person.

That is the honest boundary, and it is stated here rather than discovered later.

---

## Running the app

From a checkout that has the application in it — your own fork after the agents have
built it, or the demo pull request's branch:

```sh
npm install
npm start          # launches the Electron app fullscreen
npm test           # the pure logic, headless, no display needed
```

`npm test` is the important one. The key-blocking rules and the password gate are pure
functions with unit tests precisely so that a coding agent in a container with no display
can verify its own work. Anything that only works inside a running Electron window cannot
be checked that way, which is why the shell stays thin.

To leave the running app: type the password (`parent` by default) and press Enter.

---

## Running the exercise yourself

The steps live with the sample, in
**[pyrrhula-samples/tinyfingers-desktop](https://github.com/tuturu742/pyrrhula-samples/tree/main/tinyfingers-desktop)**:
a `.pyr` bundle carrying the two personas (including the developer's harness selection) and
a README that starts at "sign up" and ends at a pull request on your fork.

They are kept there rather than repeated here because they are re-checked against a purged
deployment whenever they change — a second copy would drift from the one that gets tested.

In outline: fork this repository, give Pyrrhula a token that can push to your fork, select
the Software Development workflow, import the bundle, register your fork with runtime
`node20` and test command `npm test`, and start a session on the *Plan, Implement, Review,
Merge* flow.

## What the loop actually does

`Lead Wren` turns the agenda into work items — real records, not a list in a message — and
hands them to `Senior Developer Pike`. Pike's container comes up, installs the harness,
clones the branch, and then the agent *works*: list the files, read what is there, write
`src/key-blocker.js`, run `npm test`, read the failure, fix it. A bounded summary of that
comes back into the transcript in Pike's own voice — how many steps, which tools, what it
concluded, what it cost.

Then Wren reviews the diff against what it asked for, and either approves it or sends it
back with specifics, in which case Pike reworks it in the same container.

Every model call the harness makes goes through Pyrrhula's own inference proxy, so delegated
spend is metered under `purpose='delegation'` and daily caps apply to it. No provider key
ever enters the container: the agent gets a short-lived token scoped to the one connection
its persona was given.

---

## Licence

MIT. See `LICENSE`.
