# CFSTT 2026 Golf — Project Memory

Static Next.js app (App Router, Tailwind). All trip data is hardcoded in `lib/constants.ts`; no env vars, no localStorage, no admin/edit UI. Rendering is driven by `lib/tripState.ts` + `lib/activeDay.ts`.

## Trip facts (lib/constants.ts)

- `TRIP_NAME`: "The Kentucky Bourbon Scramble"
- `TRIP_DATES`: "July 31 – August 2, 2026"
- `TRIP_LOCATION`: "Lexington & Louisville, KY" (note: itinerary itself is Louisville-only; Lexington is leftover from earlier draft)
- `TRIP_STATUS`: "" (empty = banner hidden)

## Lodging

- Hotel: AC Hotel Louisville Downtown — Confirmed
- Check-in Fri 7/31/26, check-out Sun 8/2/26
- (4) Two Queen rooms, group size 8

## Schedule / rounds (3 days, 3 rounds)

| Day | Date | Course | Tee time | Round id |
|---|---|---|---|---|
| 1 (Fri) | 2026-07-31 | Champions Pointe Golf Club | 12:30 PM | round-1 |
| 2 (Sat) | 2026-08-01 | Covered Bridge Golf Club | 10:00 AM | round-2 |
| 3 (Sun) | 2026-08-02 | TBD | TBD | round-3 |

`DEFAULT_PAR`: 18 holes, all par 4 (placeholder).
`DAY_LABELS` mirror the three schedule entries above.

## Players (DEFAULT_PLAYERS, 7 total)

Matt Huber (11), Adam Wakeland (12), Jason Karns (18), Mike Kennedy (20), Matt Lanning (25), Hippy Mike (36), Alex Rogers (12).

## Conventions

- To change trip content, edit `lib/constants.ts` only — everything else reads from it.
- Schedule `activities[]` strings are free text; the "Tee time: …" line is parsed/displayed as-is.
- `mapUrl` uses `https://www.google.com/maps/search/?api=1&query=...` (Round 3 has none until course is set).
- Active-day highlighting only fires on the literal calendar date (see `lib/activeDay.ts`).

## Branches

Develop on `claude/review-golf-project-o2NEz`. Main is the deployable branch (Vercel + `@vercel/analytics`).
