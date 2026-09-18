"use client";

import { useMemo, useState } from "react";

type GuardState = {
  task: string;
  allowed: string;
  protectedAreas: string;
  verification: string;
  stopConditions: string;
  approval: string;
};

const initial: GuardState = {
  task: "Add OAuth login to the dashboard.",
  allowed: "/app/auth/**\n/tests/auth/**",
  protectedAreas: "Database schema\nBilling logic\nExisting public API contracts",
  verification: "Run typecheck\nRun tests\nRun production build",
  stopConditions:
    "A database migration is required\nTests fail twice for the same reason\nProtected files must be changed",
  approval:
    "Architecture changes\nNew dependencies\nAny change outside the allowed scope",
};

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function bullets(value: string) {
  const items = lines(value);
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- None specified";
}

export default function Home() {
  const [state, setState] = useState(initial);
  const [copied, setCopied] = useState(false);

  const contract = useMemo(
    () => `AGENT EXECUTION CONTRACT

TASK
${state.task.trim() || "No task specified"}

ALLOWED SCOPE
${bullets(state.allowed)}

PROTECTED AREAS
${bullets(state.protectedAreas)}

REQUIRED VERIFICATION
${bullets(state.verification)}

STOP AND RETURN CONTROL TO THE HUMAN IF
${bullets(state.stopConditions)}

HUMAN APPROVAL REQUIRED FOR
${bullets(state.approval)}

OPERATING RULES
- Work only inside the allowed scope.
- Treat protected areas as read-only unless the human explicitly changes this contract.
- Complete every required verification step before claiming success.
- If a stop condition occurs, stop. Report what happened, what you learned, and the smallest decision needed from the human.
- Do not reinterpret, weaken, or silently bypass these boundaries.

Completion means the requested task is done inside this contract — not merely that the code appears to work.`,
    [state]
  );

  const update = (key: keyof GuardState, value: string) =>
    setState((current) => ({ ...current, [key]: value }));

  const copy = async () => {
    await navigator.clipboard.writeText(contract);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <span className="mark" aria-hidden="true">ARG</span>
          <span>Agent Run Guard</span>
        </div>
        <span className="status"><i /> deterministic · client-side</span>
      </header>

      <section className="intro">
        <p className="eyebrow">PRE-RUN CONTROL FOR CODING AGENTS</p>
        <h1>Capability is not authority.</h1>
        <p className="lede">
          Define what an AI coding agent can change, what it must protect,
          what proves the work, and when control comes back to you.
        </p>
      </section>

      <section className="workspace">
        <div className="panel formPanel">
          <div className="panelHeading">
            <div>
              <p className="kicker">01 / HUMAN INPUT</p>
              <h2>Set the boundary</h2>
            </div>
            <button className="ghost" onClick={() => setState(initial)}>Reset example</button>
          </div>

          <label>
            <span>Task</span>
            <textarea
              rows={2}
              value={state.task}
              onChange={(e) => update("task", e.target.value)}
            />
          </label>

          <div className="grid2">
            <label>
              <span>Allowed scope</span>
              <small>One path or area per line</small>
              <textarea
                rows={5}
                value={state.allowed}
                onChange={(e) => update("allowed", e.target.value)}
              />
            </label>
            <label>
              <span>Protected areas</span>
              <small>Read-only unless you approve otherwise</small>
              <textarea
                rows={5}
                value={state.protectedAreas}
                onChange={(e) => update("protectedAreas", e.target.value)}
              />
            </label>
          </div>

          <div className="grid2">
            <label>
              <span>Required verification</span>
              <small>What must pass before completion</small>
              <textarea
                rows={5}
                value={state.verification}
                onChange={(e) => update("verification", e.target.value)}
              />
            </label>
            <label>
              <span>Stop conditions</span>
              <small>When autonomy ends</small>
              <textarea
                rows={5}
                value={state.stopConditions}
                onChange={(e) => update("stopConditions", e.target.value)}
              />
            </label>
          </div>

          <label>
            <span>Human approval required for</span>
            <textarea
              rows={4}
              value={state.approval}
              onChange={(e) => update("approval", e.target.value)}
            />
          </label>
        </div>

        <aside className="panel outputPanel">
          <div className="panelHeading">
            <div>
              <p className="kicker">02 / AGENT INPUT</p>
              <h2>Execution contract</h2>
            </div>
            <button className="copy" onClick={copy}>{copied ? "Copied" : "Copy contract"}</button>
          </div>
          <p className="explain">
            Paste this into Claude Code, Codex, Cursor, Aider, or another coding agent before the run.
          </p>
          <pre>{contract}</pre>
        </aside>
      </section>

      <footer>
        <span>Agent Run Guard</span>
        <span>Human-defined boundaries. Deterministic output. No model call required.</span>
      </footer>
    </main>
  );
}
