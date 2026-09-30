# TinyFingers Desktop

A fullscreen smash toy for toddlers — keys and clicks make shapes, colours and sounds —
as a **desktop app** rather than a web page.

In the spirit of [TinyFingers](https://tinyfingers.net/), and built for the one thing a
browser cannot do: **hold the keys that would end the session.** In a tab, `Esc` leaves
fullscreen, `/` opens quick-find, and `F11`, `Ctrl+W` and `Cmd+Q` belong to the browser. A
desktop shell can intercept them. Leaving requires a password, `parent` by default.

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

## Status

Built by [Pyrrhula](https://github.com/tuturu742/pyrrhula)'s own coding agents, through a
harness running in an execution environment — a facilitator frames the work, a developer
persona does it, a reviewer reads the diff against the task. This repository is both a
real app and the first real exercise of that loop.

## Licence

MIT. See `LICENSE`.
