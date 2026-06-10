import { LODGING, TRIP_DATES } from '@/lib/constants';
import MapLink from './MapLink';
import { BedIcon } from './icons';

const details: Array<[string, string]> = [
  ['Check-in', LODGING.checkIn],
  ['Check-out', LODGING.checkOut],
  ['Rooms', LODGING.rooms],
  ['Group', `${LODGING.groupSize} golfers`],
];

export default function LodgingCard() {
  return (
    <section className="card p-4">
      <div className="flex items-center gap-3 border-b border-linen pb-3 dark:border-char-700">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent">
          <BedIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="eyebrow">Lodging</p>
          <h2 className="font-display text-lg font-bold leading-snug">{LODGING.hotel}</h2>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary dark:bg-accent/15 dark:text-accent">
          {LODGING.status}
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
        {details.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-ink-soft dark:text-chalk/50">{label}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-linen pt-3 dark:border-char-700">
        <p className="text-xs text-ink-soft dark:text-chalk/50">
          Hotel nights are Friday–Sunday in Louisville · {TRIP_DATES}
        </p>
        {LODGING.mapUrl ? <MapLink href={LODGING.mapUrl} label="Map · Hotel" /> : null}
      </div>
    </section>
  );
}
