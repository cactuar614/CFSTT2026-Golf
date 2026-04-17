import { LODGING, TRIP_DATES } from '@/lib/constants';
import MapLink from './MapLink';

export default function LodgingCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
      <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
        <span className="text-xl" aria-hidden>
          🏨
        </span>
        <div>
          <h2 className="font-bold text-primary">Lodging</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">{TRIP_DATES}</p>
        </div>
      </div>
      <div>
        <p className="font-semibold text-gray-900 dark:text-gray-100">{LODGING.hotel}</p>
        {LODGING.mapUrl ? (
          <div className="mt-1">
            <MapLink href={LODGING.mapUrl} label="Map · Hotel" />
          </div>
        ) : null}
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Hotel nights are Friday–Sunday in Louisville.
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <span className="text-gray-500 dark:text-gray-500">Check-in:</span> {LODGING.checkIn}
          </li>
          <li>
            <span className="text-gray-500 dark:text-gray-500">Check-out:</span> {LODGING.checkOut}
          </li>
          <li>
            <span className="text-gray-500 dark:text-gray-500">Status:</span> {LODGING.status}
          </li>
          <li>
            <span className="text-gray-500 dark:text-gray-500">Rooms:</span> {LODGING.rooms}
          </li>
          <li>
            <span className="text-gray-500 dark:text-gray-500">Group:</span> {LODGING.groupSize} golfers
          </li>
        </ul>
      </div>
    </div>
  );
}
