"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "./hours";

const POS_STATUS_POLL_MS = 30000;

type PosStatus = { isOpen: boolean; updatedAt: string | null; stale: boolean };

/**
 * Se puede pedir solo si estamos en horario Y el POS del restaurante
 * reportó la caja abierta (sin caja abierta no hay quien atienda el
 * pedido). Mientras no sabemos el estado del POS, se trata como cerrado
 * — mejor un parpadeo corto de "Cerrado" al cargar que dejar pedir sin
 * que nadie del otro lado se entere.
 */
export function useCanOrder() {
  const [scheduleOpen, setScheduleOpen] = useState(() => isOpenNow(new Date()));
  const [posOpen, setPosOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setScheduleOpen(isOpenNow(new Date())), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch("/api/pos-status", { cache: "no-store" });
        const data: PosStatus = await res.json();
        if (!cancelled) setPosOpen(data.isOpen);
      } catch {
        if (!cancelled) setPosOpen(false);
      }
    }

    check();
    const timer = setInterval(check, POS_STATUS_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return scheduleOpen && posOpen;
}
