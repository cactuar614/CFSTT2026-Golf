# CLAUDE.md

## Project

Static Next.js 14 PWA (App Router, Tailwind, Capacitor iOS shell) for **The Kentucky
Bourbon Scramble** — a buddies golf trip, **July 31 – August 2, 2026**, Louisville KY.
Deployed on Vercel (project `cfstt-2026-golf`, team PinHigh Advisory); pushes to `main`
auto-deploy production.

**All data is hardcoded in `lib/constants.ts`** — there is no backend, no localStorage,
no admin UI. Pages are view-only and read everything via `getTripState()`
(`lib/tripState.ts`). To change trip facts (players, courses, tee times, schedule,
lodging, scores), edit `lib/constants.ts` and redeploy.

## Auth

Google sign-in via Auth.js / NextAuth v5 (`lib/auth.ts`, `middleware.ts`,
`app/signin/page.tsx`). **Feature-flagged:** the site is public until
`AUTH_SECRET` + `AUTH_GOOGLE_ID` + `AUTH_GOOGLE_SECRET` are set (Vercel env vars).
Access is restricted to the hardcoded `ALLOWED_EMAILS` list in `lib/auth.ts`
(server-side only — most golfer emails still TBD). JWT sessions, no database.
Note: the Capacitor iOS shell serves static files directly, so middleware/auth
does not gate it.

## Trip facts

- Lodging: AC Hotel Louisville Downtown, Fri 7/31 – Sun 8/2, (4) two-queen rooms, 8 golfers (confirmed).
- Friday R1: Champions Pointe Golf Club, 12:30 PM — White tees, 6,484 yds.
- Saturday is **36 holes** across two rounds:
  - R2: Covered Bridge Golf Club, 8:00 AM — Gold tees, 6,453 yds (par 72).
  - R3: Hidden Creek Golf Club (Sellersburg, IN), 1:30 PM (est.) — Gold tees, 6,282 yds, **par 70** (`HIDDEN_CREEK_PAR` is the real 35/35 card).
- Sunday R4: Valley View Golf Club (Floyds Knobs, IN), 11:03 AM — Green tees, 6,508 yds.

## Scoring structure (decided June 2026)

**There is NO cumulative weekend leaderboard or overall champion.** Each day is a
self-contained game with its own winner. The Board page (`app/leaderboard/page.tsx`,
nav label "Board") groups rounds by their schedule day (`dayIndex`); each day renders
one board per round, so Saturday shows two boards:

1. **Friday — Individual stroke play, GROSS.** No tiers, no strokes — lowest gross wins.
   Tier badges/legend are intentionally absent from the Friday board and scorecard.
2. **Saturday — 36 holes, two separate Stableford rounds** (Covered Bridge AM, then
   Hidden Creek PM). Each round is its own game/winner — they are NOT summed. Custom
   points (double eagle 9 · eagle 6 · birdie 4 · par 2 · bogey 1 · double bogey+ 0),
   most points wins, **plus 2× Longest Drive (holes 9 & 18) and 2× Closest to the Pin
   (holes 3 & 17)** contests **at Covered Bridge only** (winner slots in
   `SATURDAY_CONTESTS`, null until decided; rendered under `round-2`). Covered Bridge
   plays the **Gold tees — 6,453 yards** (`Round.tees`); Hidden Creek's tees are TBD.
   Players still carry stroke-allowance tiers (`Player.tier`, values in `TIER_STROKES`)
   which only matter here, if Stableford goes net (TBD):
   - **A = 0 strokes:** Matt Huber, Adam Wakeland, Alex Rogers, Matt Sweeney, Kevin OCallahan
   - **B = 7 strokes/round:** Jason Karns, Mike Kennedy
   - **M ("HM") = 18 strokes/round:** Hippy Mike (his own number, not a real tier)
3. **Sunday — Team scramble.** No individual handicaps or cards; teams in
   `SCRAMBLE_TEAMS` (empty until drafted → placeholder UI).

Presentation rules:
- **Tiers are data-only** — A/B/HM badges and the stroke-allowance legend were removed
  from the UI entirely (June 2026). `Player.tier` and `TIER_STROKES` remain in the model
  in case Saturday's Stableford goes net. If tiers ever resurface in UI, frame them as
  stroke allowances, never as "+N" added to a score.
- Hole scores use classic card notation (`cellNotationClass` in `ScorecardTable`):
  birdie circled, eagle+ double-circled, bogey squared, double bogey+ double-squared,
  par plain.

### Still undecided (kept as single constants so they're one-line changes)

- Final stroke values: B may become **8**, Hippy Mike may become **20** (`TIER_STROKES`).
- Saturday Stableford: **net vs gross** not decided; currently computed gross
  (`stablefordPoints` in `lib/scoring.ts`).
- Sunday scramble **teams** not drafted (`SCRAMBLE_TEAMS`).

## Design

"Bourbon label / clubhouse" theme: cream (light) / charred-oak (dark, class-based via
ThemeContext) with fairway green, gold, copper. Playfair Display (display) + Source
Sans 3 (body) via `next/font`. Shared classes in `globals.css`: `.card`, `.eyebrow`,
`.page-title`. SVG icons in `components/icons.tsx` (no emoji).

## Conventions

- `npm run build` must pass before pushing (static export of all pages).
- Stableford (PTS column + points key) appears ONLY on Saturday's two rounds; Friday's
  scorecard is gross-only. Each day is shown strictly in its own game's terms.
- Courses use their real cards: `CHAMPIONS_POINTE_PAR`, `COVERED_BRIDGE_PAR`,
  `VALLEY_VIEW_PAR` are each 36/36 par 72; `HIDDEN_CREEK_PAR` is 35/35 **par 70**
  (Gold tees, 6,282 yds). Nothing assumes par 72 — totals derive from `coursePar`.
- Scores live in `Round.playerRounds` (empty = dashes everywhere until entered).
