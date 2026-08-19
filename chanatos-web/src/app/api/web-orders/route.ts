import { NextRequest, NextResponse } from "next/server";

/**
 * Reenvia el pedido a la cola en la nube (Railway) para que el POS del
 * restaurante lo recoja. Corre en el servidor: el secreto compartido nunca
 * llega al navegador (a diferencia de las variables NEXT_PUBLIC_*).
 */
export async function POST(request: NextRequest) {
  const endpoint = process.env.WEB_ORDERS_ENDPOINT;
  const secret = process.env.WEB_ORDERS_SECRET;

  if (!endpoint || !secret) {
    return NextResponse.json(
      { error: "WEB_ORDERS_ENDPOINT/WEB_ORDERS_SECRET no configurados" },
      { status: 503 },
    );
  }

  const body = await request.json();

  try {
    const upstream = await fetch(`${endpoint.replace(/\/$/, "")}/web-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Web-Orders-Secret": secret,
      },
      body: JSON.stringify(body),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      return NextResponse.json(
        { error: "La cola de pedidos rechazo el pedido", detail },
        { status: upstream.status },
      );
    }

    const data = await upstream.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo contactar la cola de pedidos", detail: String(error) },
      { status: 502 },
    );
  }
}
