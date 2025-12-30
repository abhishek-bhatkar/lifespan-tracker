You are a senior full-stack engineer + product designer.

Your task is to design, implement, and verify a production-quality “Life in Weeks / Lifespan Tracker” web application inspired by thelifespantracker.com.

You must make reasonable decisions without asking questions, document assumptions briefly, and deliver working, self-verifiable code.

1️⃣ Product Goal

Build a single-page web application that visualizes a human life as weekly blocks to help users understand time spent vs time remaining.

Each square = 1 week of life
Total squares = lifespan years × 52

This is a reflection tool, not a medical predictor.

2️⃣ Functional Requirements (STRICT)
A. User Input

Date of birth (required)

Expected lifespan in years (optional, default = 80)

Validate:

No future dates

Lifespan range: 40–120

B. Life Calculation

Calculate:

Total weeks = lifespan × 52

Weeks lived = floor((today − DOB) / 7 days)

Weeks remaining

Completion percentage

Highlight current week

C. Visualization

Render a grid of weekly blocks

Rows = years

Columns = weeks (52)

Past weeks = filled

Future weeks = empty

Current week = highlighted

Must render within 1 second

D. Summary Panel

Display:

Age (years)

Weeks lived

Weeks remaining

% life completed

E. Persistence

Store DOB + lifespan in localStorage

Auto-load on revisit

“Reset” button clears all data

3️⃣ UX / UI Requirements

Clean, minimal, distraction-free

Responsive (desktop + mobile)

No horizontal scrolling on mobile

Tooltips:

Hover/tap on a week shows date range

Include subtle reflective text:

Example: “Each square represents one week of your life.”

4️⃣ Technical Requirements
Stack

Choose ONE and implement fully:

React + Vite OR

Vanilla HTML + CSS + JS (no frameworks)

Styling

Pure CSS (no Tailwind unless necessary)

Light mode only (dark optional)

Accessible contrast

Performance

Efficient rendering (no DOM explosion)

Avoid re-rendering entire grid unnecessarily

5️⃣ Code Quality Requirements

Modular structure

Clear variable naming

Inline comments for non-obvious logic

No dead code

No external APIs

No analytics

6️⃣ Deliverables (MANDATORY)
A. Working Code

Entire app must run by opening index.html OR npm run dev

Include clear run instructions

B. Verification Checklist (Self-Test)

You must include a section where you verify:

DOB validation works

Lifespan change updates grid

Current week highlighting is correct

Data persists after refresh

Mobile layout works

C. README

Include:

Product description (≤100 words)

How to run

Known limitations

Assumptions made

7️⃣ Explicit Non-Goals (DO NOT IMPLEMENT)

❌ Accounts / login
❌ Backend / database
❌ AI predictions
❌ Health data
❌ Gamification

8️⃣ Success Criteria

The result should:

Load instantly

Be emotionally impactful but neutral

Be printable

Be understandable in under 5 seconds

If something is ambiguous, make a sensible engineering decision and document it.

FINAL INSTRUCTION

Do not ask clarifying questions.
Do not over-engineer.
Do not skip verification.

Build it. Test it. Explain it.

