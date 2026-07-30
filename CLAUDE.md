# CLAUDE.md

## Project

Static Next.js 14 PWA (App Router, Tailwind, Capacitor iOS shell) for **The Kentucky
Bourbon Scramble** — a buddies golf trip, **July 31 – August 2, 2026**, Louisville KY.
Deployed on Vercel (project `cfstt-2026-golf`, team PinHigh Advisory); pushes to `main`
auto-deploy production.

**Trip facts are hardcoded in `lib/constants.ts`** — there is no backend and no
database. Pages are view-only and read everything via `getTripState()`
(`lib/tripState.ts`). To change trip facts (players, courses, tee times, schedule,
lodging), edit `lib/constants.ts` and redeploy.

**Scores are the one exception:** they live in `data/scores.json`, are overlaid onto
the rounds in `getTripState()` (`lib/scores.ts`), and can be edited by admins in the UI.

## Admin score editor

`/admin` (nav tab "Admin", `AdminIcon`) is an admin-only page — server-gated in
`app/admin/page.tsx` (`redirect('/')` unless `session.user.isAdmin`). Admins are
Matt Huber (both emails) and Jason Karns, keyed by email server-side in `lib/auth.ts`
(`ADMIN_EMAILS` / `isAdminEmail`); only the derived `isAdmin` boolean ships to the
client (session, typed in `types/next-auth.d.ts`), never the emails. The Navbar shows
the Admin tab only when `session.user.isAdmin`. **The editor requires auth to be ON**
(see Auth) — with auth off nobody has an identity, so the page redirects home.

The editor (`AdminScoreEditor.tsx`) edits one card per row per round — every golfer for
individual rounds (`best-ball`/`tbd`/`stroke`), one card per team for `scramble` — and
"Save round" POSTs to `app/api/admin/scores/route.ts`. That route re-checks `isAdmin`,
then commits the round's scores into `data/scores.json` via the **GitHub Contents API**
(read file + SHA → replace that round's entry → PUT), which triggers a Vercel redeploy —
so scores go live ~1 min after saving. Requires env vars (Vercel): `ADMIN_GH_TOKEN`
(a PAT / fine-grained token with **contents: write** on the repo), and optionally
`ADMIN_GH_REPO` (default `cactuar614/cfstt2026-golf`) and `ADMIN_GH_BRANCH` (default
`main`).

## Auth

Google sign-in via Auth.js / NextAuth v5 (`lib/auth.ts`, `middleware.ts`,
`app/signin/page.tsx`). **Feature-flagged:** the site is public until
`AUTH_SECRET` + `AUTH_GOOGLE_ID` + `AUTH_GOOGLE_SECRET` are set (Vercel env vars).
Yahoo sign-in (for golfers on Yahoo addresses) is a custom **OIDC** provider,
added only when `AUTH_YAHOO_ID` + `AUTH_YAHOO_SECRET` are set (`yahooEnabled`);
the sign-in page shows the Yahoo button only then.
Access is restricted to the golfers in `EMAIL_TO_PLAYER` (`lib/auth.ts`,
server-side only; `ALLOWED_EMAILS` is derived from it). JWT sessions, no database.
The session callback attaches the matched `playerId` to `session.user` (typed in
`types/next-auth.d.ts`) — the only identity shipped to the client, never the emails.
Home's `MyPairings` reads `session.user.playerId` to show the signed-in golfer their
team/partners per round (renders nothing while auth is off or signed out).
Note: the Capacitor iOS shell serves static files directly, so middleware/auth
does not gate it.

## Trip facts

- Lodging: AC Hotel Louisville Downtown, Fri 7/31 – Sun 8/2, (4) two-queen rooms, 8 golfers (confirmed).
- Friday R1: Champions Pointe Golf Club, 12:30 PM — White tees, 6,484 yds.
- Saturday is **36 holes** across two rounds:
  - R2: Covered Bridge Golf Club, 8:00 AM — Gold tees, 6,453 yds (par 72).
  - R3: Hidden Creek Golf Club (Sellersburg, IN), 1:30 PM — Gold tees, 6,282 yds, **par 70** (`HIDDEN_CREEK_PAR` is the real 35/35 card).
- Sunday R4: Valley View Golf Club (Floyds Knobs, IN), 11:03 AM — Green tees, 6,508 yds.

## Scoring structure (formats decided July 2026)

**There is NO cumulative weekend leaderboard or overall champion.** Each day/round is a
self-contained game with its own winner. The Board page (`app/leaderboard/page.tsx`,
nav label "Board") groups rounds by their schedule day (`dayIndex`); each day renders
one board per round, so Saturday shows two boards. `Round.game` (`GameType`) drives
board + scorecard rendering: `stroke`, `stableford`, `scramble`, `best-ball`, `tbd`.
`stroke`/`stableford` are currently **unused** but kept (R3 may adopt one) along with
their scoring in `lib/scoring.ts`.

1. **Friday — 3-2-1 Best Ball (`best-ball`).** Team format played in a foursome: each
   hole the team counts its best 1, 2, or 3 balls toward the team score, and must
   declare the count for the next hole before anyone tees off. Six "3" holes, six "2",
   six "1" across 18. Everyone plays their own ball → individual cards still shown;
   lowest team total wins. Foursomes in `FRIDAY_BEST_BALL_TEAMS` (`Round.teams`).
2. **Saturday — 36 holes, two rounds, each its own game (NOT summed):**
   - **AM Covered Bridge — 2-man scramble (`scramble`).** Four teams in
     `SATURDAY_SCRAMBLE_TEAMS` (`Round.teams`): Rogers & Hippy Mike · Huber & Kennedy ·
     Sweeney & OCallahan · Wakeland & Karns. One ball per team, lowest team score wins.
     **Plus 2× Longest Drive (9 & 18) and 2× Closest to the Pin (3 & 17)** contests
     (`SATURDAY_CONTESTS`, null until decided; rendered under `round-2`). Gold tees, 6,453 yds.
   - **PM Hidden Creek — casual, format TBD (`tbd`).** To be decided with the group;
     renders a placeholder. Gold tees, 6,282 yds, par 70.
3. **Sunday — 4-person team scramble (`scramble`).** No individual cards; two teams in
   `SUNDAY_SCRAMBLE_TEAMS` (`Round.teams`). Green tees.

Team games use per-round `Round.teams: ScrambleTeam[]` (empty = not yet drafted →
placeholder). `TeamBoard` (Board) and the scorecard render them.

Presentation rules:
- **Tiers are data-only** — A/B/HM badges and the stroke-allowance legend were removed
  from the UI entirely (June 2026). `Player.tier` and `TIER_STROKES` remain in the model
  in case a Stableford round ever goes net. If tiers ever resurface in UI, frame them as
  stroke allowances, never as "+N" added to a score.
- Hole scores use classic card notation (`cellNotationClass` in `ScorecardTable`):
  birdie circled, eagle+ double-circled, bogey squared, double bogey+ double-squared,
  par plain.

### Still undecided (kept as single constants so they're one-line changes)

- Saturday PM Hidden Creek **game** (`round-3` is `tbd`); may become a Stableford/other.
- Whether the Covered Bridge **contests** carry over now that it's a scramble (`SATURDAY_CONTESTS`).

## Design

"Bourbon label / clubhouse" theme: cream (light) / charred-oak (dark, class-based via
ThemeContext) with fairway green, gold, copper. Playfair Display (display) + Source
Sans 3 (body) via `next/font`. Shared classes in `globals.css`: `.card`, `.eyebrow`,
`.page-title`. SVG icons in `components/icons.tsx` (no emoji).

## Conventions

- `npm run build` must pass before pushing (static export of all pages).
- The scorecard adapts to `Round.game`: individual hole cards for `stroke`/`stableford`/
  `best-ball` (Stableford adds the PTS column + points key); team formats (`scramble`)
  and `tbd` show a team-list / placeholder card instead of individual cards. No round is
  currently `stableford`. Each round is shown strictly in its own game's terms.
- Courses use their real cards: `CHAMPIONS_POINTE_PAR`, `COVERED_BRIDGE_PAR`,
  `VALLEY_VIEW_PAR` are each 36/36 par 72; `HIDDEN_CREEK_PAR` is 35/35 **par 70**
  (Gold tees, 6,282 yds). Nothing assumes par 72 — totals derive from `coursePar`.
- Scores live in `Round.playerRounds` (empty = dashes everywhere until entered).
- Two static reference pages (hardcoded copy, no trip data): `/rules` (house rules —
  one breakfast ball / no mulligans, merch reminder, per-day games) and `/games` (how each format
  works: the ones in play on top, other options like Poker/Shamble/Wolf below). Both are
  nav tabs. `<main>` carries mobile bottom padding to clear the fixed bottom nav.
- `/schedule.ics` (`app/schedule.ics/route.ts`, `force-static`) is an iCalendar feed —
  one VEVENT per round, tee times converted Eastern→UTC (trip is EDT, UTC-4). It sits
  outside auth (the middleware matcher excludes dotted paths), so it's downloadable/
  subscribable. The Schedule page links to it ("Add tee times to your calendar").
