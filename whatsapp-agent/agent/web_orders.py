# agent/web_orders.py — Cola de pedidos de la web para el POS
# Generado por AgentKit

"""
La web de domicilios (chanatos-web) manda aca los pedidos que hace un cliente.
El POS del restaurante (que nunca se expone a internet) consulta esta cola cada
cierto tiempo y crea la orden real en su base de datos local.

Reusa el motor de base de datos de memory.py: mismo Postgres/SQLite, misma sesion.
"""

import json
import logging
from datetime import datetime, timezone

from sqlalchemy import JSON, DateTime, Integer, String, Text, select
from sqlalchemy.orm import Mapped, mapped_column

from agent.memory import Base, ahora, async_session

logger = logging.getLogger("agentkit")


class PedidoWeb(Base):
    """Un pedido hecho en la web, pendiente de que el POS lo recoja."""

    __tablename__ = "pedidos_web"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=ahora)
    customer: Mapped[str] = mapped_column(JSON)  # {"name": str, "phone": str|None}
    fulfillment: Mapped[str] = mapped_column(JSON)  # {"type": "pickup"|"delivery", "address": str|None}
    payment_method: Mapped[str] = mapped_column(String(50), default="")
    notes: Mapped[str] = mapped_column(Text, default="")
    items: Mapped[str] = mapped_column(JSON)  # [{webId,name,qty,unitPrice,modifiersLabel}]
    total: Mapped[int] = mapped_column(Integer, default=0)
    status: Mapped[str] = mapped_column(String(20), default="pendiente")  # pendiente | recibido


def _serializar(pedido: PedidoWeb) -> dict:
    return {
        "id": pedido.id,
        "created_at": pedido.created_at.isoformat() if pedido.created_at else None,
        "customer": pedido.customer,
        "fulfillment": pedido.fulfillment,
        "paymentMethod": pedido.payment_method,
        "notes": pedido.notes,
        "items": pedido.items,
        "total": pedido.total,
        "status": pedido.status,
    }


async def crear_pedido_web(data: dict) -> dict:
    """Guarda un pedido nuevo de la web. Retorna el pedido serializado."""
    async with async_session() as session:
        pedido = PedidoWeb(
            created_at=ahora(),
            customer=data.get("customer") or {},
            fulfillment=data.get("fulfillment") or {},
            payment_method=data.get("paymentMethod") or "",
            notes=data.get("notes") or "",
            items=data.get("items") or [],
            total=int(data.get("total") or 0),
            status="pendiente",
        )
        session.add(pedido)
        await session.commit()
        await session.refresh(pedido)
        logger.info(f"Pedido web #{pedido.id} recibido ({pedido.customer})")
        return _serializar(pedido)


async def listar_pedidos_pendientes() -> list[dict]:
    """Retorna todos los pedidos con status=pendiente, mas viejo primero."""
    async with async_session() as session:
        resultado = await session.execute(
            select(PedidoWeb).where(PedidoWeb.status == "pendiente").order_by(PedidoWeb.id.asc())
        )
        pedidos = list(resultado.scalars().all())
    return [_serializar(p) for p in pedidos]


async def marcar_pedido_recibido(pedido_id: int) -> bool:
    """Marca un pedido como recibido por el POS. Retorna False si no existia."""
    async with async_session() as session:
        pedido = await session.get(PedidoWeb, pedido_id)
        if not pedido:
            return False
        pedido.status = "recibido"
        await session.commit()
    logger.info(f"Pedido web #{pedido_id} confirmado por el POS")
    return True
