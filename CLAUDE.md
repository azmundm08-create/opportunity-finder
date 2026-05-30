# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # TypeScript compile + Vite production build
npm run lint       # ESLint across all files
npm run preview    # Preview the production build locally
```

There is no test suite configured.

## Architecture

This is a single-page React 19 app (Vite + TypeScript tooling, but `src/App.jsx` is plain JSX). Everything lives in one large file: `src/App.jsx` (~2700+ lines). `src/main.tsx` is the entry point that mounts `<App />`.

### Page routing

There is no router library. The root `App` component holds a `page` state string and conditionally renders one of these top-level page components based on its value:

| `page` value    | Component rendered      |
|-----------------|-------------------------|
| `"opportunities"` | Inline JSX in `App` (Browse/Saved/Tracker/Profile tabs) |
| `"collegeprep"` | `<CollegePrepHub>`      |
| `"studyhub"`    | `<StudyHub>`            |
| `"news"`        | `<NewsPage>`            |
| `"changelog"`   | `<ChangelogPage>`       |
| `"community"`   | `<CommunityPage>`       |
| `"scholarships"`| `<ScholarshipHub>`      |

A sticky global nav bar with a "More ▼" dropdown handles all navigation.

### Pro/Free gating

`isPro` is a `useState(false)` boolean in `App`. Set it to `true` at `App.jsx:2654` to test Pro features locally. Pro-gated UI renders a `<ProGate>` placeholder with an upgrade CTA. The upgrade flow opens a `<ProUpgradeModal>` (email waitlist — payments not yet live) via `modal` state.

### Data model

All 50+ opportunities are a hardcoded `OPPORTUNITIES` array at the top of `App.jsx`. Each entry has: `id`, `title`, `category`, `grades[]`, `mode`, `deadline`, `paid`, `cost`, `description`, `link`, `featured`, `requirements` (minAge, maxAge, location, gpa, citizenship), `tags[]`, `earlyAccess`. Early-access entries are only shown when `isPro` is true.

### AI features

`askClaude()` at ~line 895 makes direct `fetch` calls to the Anthropic API (`/v1/messages`) using `claude-sonnet-4-20250514`. The API key must be provided via `VITE_ANTHROPIC_API_KEY` (used client-side — only safe for development/demo). AI features include: homework helper, essay grader, flashcard generator, practice test generator, and AI match score calculation (`calcMatchScore` is purely client-side math, not an API call).

### External integrations

- **Google Sheets (Apps Script)**: `SubmitForm` and `ProUpgradeModal` POST to a hardcoded Apps Script URL for opportunity submissions and waitlist emails.
- **Browser Notifications API**: Used for deadline reminders on saved opportunities (Pro only).

### State management

All state is local React `useState` in each component — no global store, no context. Parent `App` passes down `isPro`, `profile`, `savedIds`, `appStatuses`, and callbacks as props.

### Environment variables

| Variable | Purpose |
|---|---|
| `VITE_ANTHROPIC_API_KEY` | Anthropic API key for AI features (Study Hub) |
| `VITE_OWNER_PASSWORD` | Password for community owner panel (defaults to `"studentrise2026"`) |
