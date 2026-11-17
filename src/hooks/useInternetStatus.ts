import { useCallback, useEffect, useRef, useState } from 'react';

async function probeInternetReachability(timeoutMs = 2500): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return false;
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(`https://speed.cloudflare.com/__down?bytes=0&t=${Date.now()}`, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timer);
  }
}

export function useInternetStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [checking, setChecking] = useState(false);
  const checkingRef = useRef(false);

  const checkConnection = useCallback(async () => {
    if (checkingRef.current) return false;
    checkingRef.current = true;
    setChecking(true);
    try {
      const reachable = await probeInternetReachability(2500);
      setIsOnline(reachable);
      return reachable;
    } finally {
      checkingRef.current = false;
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);
    };
    const handleOnline = () => {
      setIsOnline(true);
      void checkConnection();
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [checkConnection]);

  // While offline, periodically probe connectivity so the UI can detect reconnection
  useEffect(() => {
    if (isOnline) return;
    const interval = window.setInterval(() => {
      if (navigator.onLine) {
        void checkConnection();
      }
    }, 4000);
    return () => window.clearInterval(interval);
  }, [isOnline, checkConnection]);

  const markOffline = useCallback(() => {
    setIsOnline(false);
  }, []);

  return {
    isOnline,
    checking,
    checkConnection,
    markOffline,
  };
}
