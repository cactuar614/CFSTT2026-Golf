'use client';

import { useState, useEffect, useCallback } from 'react';
import { TripState } from './types';
import { getTripState, setTripState, defaultTripState } from './storage';

export function useLocalStorage(): [TripState, (updater: TripState | ((prev: TripState) => TripState)) => void, boolean] {
  const [state, setState] = useState<TripState>(defaultTripState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(getTripState());
    setHydrated(true);
  }, []);

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
