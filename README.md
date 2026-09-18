# Agent Run Guard

A small pre-run control for AI coding agents.

Agent Run Guard turns human-defined scope, protected areas, verification requirements, stop conditions, and approval boundaries into a deterministic execution contract that can be pasted into Claude Code, Codex, Cursor, Aider, or another coding agent.

## Why

Coding agents are getting more capable, but capability and authority are not the same thing. This tool makes the boundary explicit before autonomy starts.

## Design decisions

- **Deterministic output:** no LLM call decides or rewrites the guardrails.
- **Pre-run rather than post-run:** authority is defined before the agent begins work.
- **Tool-agnostic plain text:** the same contract can be inspected by a human and used across coding agents.
- **Client-side only:** the inputs do not need to leave the browser.
- **Intentionally narrow:** no auth, persistence, agent SDK, or backend in the assessment build.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
