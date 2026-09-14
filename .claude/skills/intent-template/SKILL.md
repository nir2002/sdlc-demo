---
name: intent-template
description: Turn a conversation about a problem, idea, or request into an intent file saved at intent/<slug>.md. Use whenever someone asks to capture, save, record, or write up an idea, a feature request, a bug, or a problem as a file — e.g. "capture this idea", "save this as an intent", "write this up", "turn this into a doc", "log this problem".
---

# Intent template

Turn a conversation about a problem or an idea into a short intent file. The intent file records what the requester wants and why, in their own words, before any solution is designed.

## Rules

1. **Ask clarifying questions before writing.** Read the conversation, then ask the requester about anything missing or ambiguous for the five sections below (who is affected, what "done" looks like, constraints). Ask them together in one message, and wait for answers before you write the file. Don't ask about things they've already stated.
2. **Never invent decisions.** Record only what the requester said or confirmed. Do not choose solutions, technologies, priorities, deadlines, or scope on their behalf.
3. **Anything assumed goes under Open questions.** If a section needs something the requester did not state, don't put it in that section. Write it as an open question instead (e.g. "Assumed: only logged-in users are affected — confirm?").
4. **Keep the requester's words.** The Problem section uses their phrasing, quoted or lightly trimmed, not rephrased into product language. Open questions they raised are copied verbatim.

## Output

Save to `intent/<slug>.md`, where `<slug>` is a short kebab-case name for the problem (e.g. `intent/slow-image-export.md`). Create the `intent/` directory if needed. If the file already exists, ask before overwriting.

Write it in English, under half a page, with exactly these sections and nothing else:

```markdown
# <Short title>

## Problem
<The problem in the words of the person who raised it — quote them; do not rephrase into product language.>

## Desired outcome
<What would be true if this were solved, as the requester described it.>

## Affected users and systems
<Who hits this problem, and which parts of the product or infrastructure are involved.>

## Constraints
<Limits the requester stated: time, budget, tech, compliance, things that must not change. Write "None stated" if there are none.>

## Open questions
<Everything the requester is unsure about, verbatim, plus anything you had to assume. Write "None" if there are none.>
```

After saving, show the requester the file path and its contents so they can correct it.
