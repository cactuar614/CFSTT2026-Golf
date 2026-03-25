'use client';

import { useState, useEffect, useCallback } from 'react';
import { TripState } from './types';
import { getTripState, setTripState, defaultTripState } from './storage';
import { getActiveDayIndexForToday } from './activeDay';

function withTodayActiveDay(state: TripState): TripState {
  if (!state.activeDayFollowCalendar) return state;
  const activeDayIndex = getActiveDayIndexForToday(state.schedule);
  return state.activeDayIndex === activeDayIndex ? state : { ...state, activeDayIndex };
}

export function useLocalStorage(): [TripState, (updater: TripState | ((prev: TripState) => TripState)) => void, boolean] {
  const [state, setState] = useState<TripState>(defaultTripState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = getTripState();
    setState(withTodayActiveDay(raw));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const sync = () => {
      setState((prev) => withTodayActiveDay(prev));
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') sync();
    };
    window.addEventListener('focus', sync);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('focus', sync);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [hydrated]);

  // Debounce persistence so rapid typing/score entry doesn't JSON-serialize
  // the entire trip state on every keystroke.
  useEffect(() => {
    if (!hydrated) return;
    const id = window.setTimeout(() => setTripState(state), 250);
    return () => window.clearTimeout(id);
  }, [state, hydrated]);

  const updateState = useCallback((updater: TripState | ((prev: TripState) => TripState)) => {
    setState((prev) => {
      return typeof updater === 'function' ? updater(prev) : updater;
    });
  }, []);

  return [state, updateState, hydrated];
}
