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
this file — no app. The working application lives in a **pull request**, built end to end
by [Pyrrhula](https://github.com/tuturu742/pyrrhula)'s coding agents: a facilitator persona
frames the work, a developer persona builds it inside a container through a coding harness,
and a reviewer reads the diff against the task and approves or sends it back.

Read the pull request to see what the loop produces. Then **do it yourself, in your own
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

You need a Pyrrhula deployment and a model API key. Built and tested against **DeepSeek**.

### 1. Fork this repository

Use the **Fork** button. Everything below points at *your* fork, not at this one.

### 2. Make a GitHub token for the agents

A classic personal access token with the **`repo`** scope, able to push to your fork.
Pyrrhula seals it with its encryptor; it is never shown again and never reaches the
container.

> **Two tokens, if you want the review to be real.** GitHub will not let an account
> approve a pull request it opened itself. Give the repository one account's token (the
> one that pushes branches and opens PRs) and bind the facilitator persona to a second
> account's token under **Repos → your repo → Persona credentials**. With one token the
> reviewer's approval is cosmetic. A second account needs to be a collaborator on your
> fork first, or its token sees a 404.

### 3. Sign up and choose the workflow

Register with any organization name. Then **Workflows → Software Development** — that is
the workflow that grants repository access at all.

### 4. Add your model connection

**Personas → Model profiles → New model profile**: a name, provider `deepseek`, a model,
and your API key.

### 5. Register your fork

**Repos → New repo**:

| Field | Value |
|---|---|
| Key | `tinyfingers` |
| Source URL | `https://github.com/<you>/tinyfingers-desktop` |
| Access token | the token from step 2 |
| Runtime | `node20` |
| Test command | `npm test` |

Pyrrhula clones your fork into its own hosted store. Delegated containers clone *that*
over a scoped, short-lived token and never talk to GitHub at all; only the platform pushes
back to your fork.

### 6. Create the cast

**Personas → New persona**, twice:

| | Type | Harness | Notes |
|---|---|---|---|
| **Wren** | supervisor | none | frames the work and reviews what comes back |
| **Pike** | participant | `opencode` | builds it |

The **Harness** dropdown sits beside *Web search* on the persona roster. `none` is the
default and keeps the one-shot path, where the model answers with whole files and never
runs anything. Choosing a harness instead gives that persona a real agent loop with a
shell inside its container — it reads, edits, runs `npm test`, and iterates before
anything is committed.

> If the dropdown is absent, your deployment serves no harness. If `opencode` is missing
> from it, an administrator has withheld it for this organization.

### 7. Set a daily cap first

**Usage → Limits**, a per-persona daily token cap. An agent loop is many calls per task,
and on a cheap model a confused one can spend a great deal before it gives up. The cap
turns that into a clean "on hold" note instead of a bill.

### 8. Start the session

**New session**:

- **Process definition**: `Plan, Implement, Review, Merge`
- **Supervisor**: Wren · **Participant**: Pike
- **Repos**: your fork
- **Agenda**: the brief below

```
Build TinyFingers Desktop: a standalone Electron app in the spirit of tinyfingers.net --
a fullscreen smash toy where every keypress and click paints something, and a toddler
cannot get out of it by accident.

The reason it is a desktop app at all is that a web page cannot do this: Esc leaves
fullscreen, / opens quick-find, F11 and Ctrl+W belong to the browser.

What must be true when this is done:

- The keys a browser would act on -- Esc, /, F11, Ctrl+W, Ctrl+R, Alt+Left, function keys
  -- are swallowed while the app has focus.
- Leaving the app needs a password. The default is `parent`, configurable.
- The blocking rules and the password gate are pure functions with unit tests, run by
  `npm test` with `node --test`. There is no display in the test container, so anything
  that only works inside a running Electron window cannot be verified and does not count
  as finished.
- The README states plainly what this cannot block, and that a documented default
  password is a speed bump for a toddler, not a security control.

Start with the pure logic and its tests. The Electron shell comes after, and stays thin.
```

---

## What you should see

Wren turns the agenda into work items — real records, not a list in a message — and hands
each to Pike. Pike's container comes up, installs the harness, clones the branch, and then
the agent *works*: `ls`, read the existing files, write `src/key-blocker.js`, run
`npm test`, read the failure, fix it. A bounded summary of that comes back into the
transcript in Pike's own voice — how many steps, which tools, what it concluded, what it
cost — and the full detail is there for Pike to answer questions about on a later turn.

Then Wren reviews the diff against what it asked for. If the work is short, the item goes
back with comments and Pike reworks it in the same container. When it passes, the branch
is pushed to your fork and a pull request is opened.

The costs are metered: every model call the harness makes goes through Pyrrhula's own
inference proxy, so it lands in `usage_record` under `purpose='delegation'` and your caps
apply to it. No provider key ever enters the container — the agent gets a short-lived,
scoped token that can only spend on the connection the persona was given.

---

## Licence

MIT. See `LICENSE`.
