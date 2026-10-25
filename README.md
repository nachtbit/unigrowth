# UniGrowth

React + Vite static website, deployed to Vercel. Full project documentation lives in [`docs/`](./docs).

Single source of truth for what UniGrowth is, how it looks and how it is built.

> [!IMPORTANT]
> **Rule:** every change to the project must update the relevant doc in the same commit.
> If code, design or scope changes and the docs don't, the change is not finished.

| Doc | Purpose | Update when |
| --- | --- | --- |
| [idea.md](./docs/idea.md) | Vision, audience, goals, scope | The product direction or scope changes |
| [design.md](./docs/design.md) | Brand, colors, logos, typography, UI rules | Any visual or theme change |
| [code.md](./docs/code.md) | Stack, structure, conventions, how to run | Dependencies, folders or conventions change |
| [deployment.md](./docs/deployment.md) | Vercel static deploy setup | Build or hosting config changes |
| [roadmap.md](./docs/roadmap.md) | Planned work and status | A task is planned, started or finished |
| [changelog.md](./docs/changelog.md) | Log of notable changes | After every meaningful change |

## Checklist before committing
- [ ] Does the change affect the idea or scope? Update `idea.md`.
- [ ] Does it affect visuals? Update `design.md`.
- [ ] Does it affect structure, deps or conventions? Update `code.md`.
- [ ] Does it affect build or hosting? Update `deployment.md`.
- [ ] Update `roadmap.md` status and add a `changelog.md` entry.
