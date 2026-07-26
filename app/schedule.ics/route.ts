import { DEFAULT_ROUNDS, DEFAULT_SCHEDULE, GAME_LABELS, TRIP_NAME } from '@/lib/constants';

// Prerendered to a static asset at build time (regenerates on each deploy).
export const dynamic = 'force-static';

/** Louisville is Eastern Time; the whole trip (Jul 31–Aug 2, 2026) is EDT = UTC-4. */
const EDT_OFFSET_HOURS = 4;
const ROUND_MS = 4.5 * 60 * 60 * 1000; // ~4.5h per round
const DTSTAMP = '20260601T000000Z'; // fixed so the file is deterministic

function parseTeeTime(t: string): { h: number; m: number } | null {
  const match = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();
  if (meridiem === 'PM' && h !== 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  return { h, m };
}

const pad = (n: number) => String(n).padStart(2, '0');

function utcStamp(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
  );
}

/** Escape per RFC 5545 text rules. */
function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/** Fold a logical line to <=75 octets with CRLF + space continuations. */
function fold(line: string): string {
  if (line.length <= 74) return line;
  const parts = [line.slice(0, 74)];
  let rest = line.slice(74);
  while (rest.length > 73) {
    parts.push(' ' + rest.slice(0, 73));
    rest = rest.slice(73);
  }
  parts.push(' ' + rest);
  return parts.join('\r\n');
}

export function GET() {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bourbon Scramble//Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${esc(TRIP_NAME)}`,
    'X-WR-TIMEZONE:America/New_York',
  ];

  DEFAULT_ROUNDS.forEach((round) => {
    const day = DEFAULT_SCHEDULE[round.dayIndex];
    if (!day) return;
    const [y, mo, d] = day.date.split('-').map(Number);
    const tee = parseTeeTime(round.teeTime);

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${round.id}@bourbonscramble.com`);
    lines.push(`DTSTAMP:${DTSTAMP}`);

    if (tee) {
      const start = new Date(Date.UTC(y, mo - 1, d, tee.h + EDT_OFFSET_HOURS, tee.m, 0));
      const end = new Date(start.getTime() + ROUND_MS);
      lines.push(`DTSTART:${utcStamp(start)}`);
      lines.push(`DTEND:${utcStamp(end)}`);
    } else {
      // No parseable tee time → all-day event on the round's date.
      lines.push(`DTSTART;VALUE=DATE:${y}${pad(mo)}${pad(d)}`);
    }

    const desc = [
      `Tee: ${round.teeTime}`,
      round.tees ? `Tees: ${round.tees}` : '',
      `Game: ${GAME_LABELS[round.game]}`,
    ]
      .filter(Boolean)
      .join(' · ');

    lines.push(`SUMMARY:${esc(`${round.courseName} — ${GAME_LABELS[round.game]}`)}`);
    lines.push(`LOCATION:${esc(round.courseName)}`);
    lines.push(`DESCRIPTION:${esc(desc)}`);
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  const body = lines.map(fold).join('\r\n') + '\r\n';

  return new Response(body, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="bourbon-scramble.ics"',
    },
  });
}
