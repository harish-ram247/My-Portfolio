"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Lights = { on: boolean; toggle: () => void; set: (on: boolean) => void };

const LightsContext = createContext<Lights>({ on: false, toggle: () => {}, set: () => {} });

export function useLights() {
  return useContext(LightsContext);
}

/**
 * Global "lights" state. Off: flashlight scenes are dark and the torch reveals
 * them. On: every flashlight scene is fully lit. Mirrored to <html data-lights>
 * so CSS can react without re-rendering.
 */
export function LightsProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    // Reduced motion starts with the lights on (set by the boot script).
    if (document.documentElement.dataset.lights === "on") setOn(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.lights = on ? "on" : "off";
  }, [on]);

  const toggle = useCallback(() => setOn((v) => !v), []);
  const value = useMemo(() => ({ on, toggle, set: setOn }), [on, toggle]);

  return <LightsContext.Provider value={value}>{children}</LightsContext.Provider>;
}
