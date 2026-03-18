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

  const updateState = useCallback((updater: TripState | ((prev: TripState) => TripState)) => {
    setState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setTripState(next);
      return next;
    });
  }, []);

  return [state, updateState, hydrated];
}
