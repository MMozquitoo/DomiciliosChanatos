import { NextResponse } from "next/server";

/**
 * Proxy al estado de caja del POS (Railway). Publico y de solo lectura del
 * lado de Railway, pero pasa por nuestro propio server para no tener que
 * exponer la URL de Railway en el bundle del cliente.
 *
 * Falla "cerrado" ante cualquier error: si algo se cae, mejor no dejar
 * pedir que dejar pedir sin que nadie del otro lado se entere.
 */
export async function GET() {
  const endpoint = process.env.WEB_ORDERS_ENDPOINT;

  if (!endpoint) {
    return NextResponse.json({ isOpen: false, updatedAt: null, stale: true });
  }

  try {
    const upstream = await fetch(`${endpoint.replace(/\/$/, "")}/pos-status`, {
      cache: "no-store",
    });
    if (!upstream.ok) throw new Error(`HTTP ${upstream.status}`);
    const data = await upstream.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ isOpen: false, updatedAt: null, stale: true });
  }
}
