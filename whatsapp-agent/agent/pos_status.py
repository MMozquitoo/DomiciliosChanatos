# agent/pos_status.py — Estado de la caja del POS
# Generado por AgentKit

"""
El POS reporta si la caja esta abierta en cada ciclo de su poller de
pedidos web (misma conexion saliente, no expone nada nuevo). La web
consulta esto antes de dejar hacer un pedido: sin caja abierta no hay
quien lo atienda del otro lado.
"""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column

from agent.memory import Base, ahora, async_session

# Si el POS no reporta en mas de esto (PC apagado, sin internet, etc.),
# el estado se considera vencido y se trata como cerrado — nunca se queda
# "abierto" para siempre por un reporte viejo.
STALE_AFTER_SECONDS = 90


class EstadoPos(Base):
    """Fila unica (id=1) con el ultimo estado de caja reportado por el POS."""

    __tablename__ = "estado_pos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    is_open: Mapped[bool] = mapped_column(Boolean, default=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=ahora)


async def reportar_estado(is_open: bool) -> None:
    """El POS llama a esto (via la ruta HTTP) en cada ciclo de poll."""
    async with async_session() as session:
        estado = await session.get(EstadoPos, 1)
        if estado is None:
            session.add(EstadoPos(id=1, is_open=is_open, updated_at=ahora()))
        else:
            estado.is_open = is_open
            estado.updated_at = ahora()
        await session.commit()


async def obtener_estado() -> dict:
    """La web consulta esto para saber si puede dejar hacer pedidos."""
    async with async_session() as session:
        estado = await session.get(EstadoPos, 1)

    if estado is None:
        return {"isOpen": False, "updatedAt": None, "stale": True}

    edad_segundos = (ahora() - estado.updated_at).total_seconds()
    stale = edad_segundos > STALE_AFTER_SECONDS

    return {
        "isOpen": bool(estado.is_open) and not stale,
        "updatedAt": estado.updated_at.isoformat(),
        "stale": stale,
    }
