# agent/tools.py — Herramientas del agente
# Generado por AgentKit

"""
Herramientas especificas de Chanatos.

OJO: estas funciones NO se ejecutan solas todavia. El menu y los precios le llegan al
agente por el system prompt (config/prompts.yaml), asi que para CONTESTAR preguntas
sobre el menu no hace falta nada de aca. Este archivo es el lugar para las ACCIONES
-armar el pedido, confirmarlo- y conectarlas al ciclo de tool use de Claude es un paso
aparte, todavia no hecho.

El carrito de abajo es en memoria (un dict del proceso): se pierde si el servidor se
reinicia. Sirve para probar el flujo de pedidos; si el negocio crece, hay que moverlo
a la base de datos igual que memory.py hace con el historial.
"""

import logging
from pathlib import Path

import yaml

logger = logging.getLogger("agentkit")

CARPETA_KNOWLEDGE = Path("knowledge")

# {telefono: [{"producto": str, "cantidad": int}]}
_carritos: dict[str, list[dict]] = {}


def cargar_info_negocio() -> dict:
    """Carga la informacion del negocio desde config/business.yaml."""
    try:
        with open("config/business.yaml", "r", encoding="utf-8") as f:
            return yaml.safe_load(f) or {}
    except FileNotFoundError:
        logger.error("config/business.yaml no encontrado")
        return {}


def obtener_horario() -> dict:
    """Retorna el horario de atencion del negocio."""
    info = cargar_info_negocio()
    return {
        "horario": info.get("negocio", {}).get("horario", "No disponible"),
        "esta_abierto": True,  # TODO: calcular segun la hora actual y el horario
    }


def buscar_en_knowledge(consulta: str) -> str:
    """
    Busca informacion en los archivos de /knowledge.
    Retorna los fragmentos que coinciden con la consulta.
    """
    if not CARPETA_KNOWLEDGE.is_dir():
        return "No hay archivos de conocimiento disponibles."

    resultados = []
    for ruta in sorted(CARPETA_KNOWLEDGE.iterdir()):
        if ruta.name.startswith(".") or not ruta.is_file():
            continue
        try:
            contenido = ruta.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue  # binarios y archivos ilegibles se saltean
        if consulta.lower() in contenido.lower():
            resultados.append(f"[{ruta.name}]: {contenido[:500]}")

    if resultados:
        return "\n---\n".join(resultados)
    return "No encontre informacion especifica sobre eso en mis archivos."


# ── Pedidos ──────────────────────────────────────────────────────────────


def agregar_al_carrito(telefono: str, producto: str, cantidad: int = 1) -> list[dict]:
    """Agrega un producto al carrito del cliente y retorna el carrito completo."""
    carrito = _carritos.setdefault(telefono, [])
    for item in carrito:
        if item["producto"].lower() == producto.lower():
            item["cantidad"] += cantidad
            return carrito
    carrito.append({"producto": producto, "cantidad": cantidad})
    return carrito


def ver_carrito(telefono: str) -> list[dict]:
    """Retorna los items actuales del carrito del cliente."""
    return _carritos.get(telefono, [])


def confirmar_pedido(telefono: str) -> dict:
    """
    Cierra el carrito del cliente y lo retorna como pedido confirmado.

    No cobra ni descuenta stock: solo deja el pedido listo para que alguien del
    restaurante lo atienda. Conectar esto a un sistema de cocina/caja real es un
    paso aparte.
    """
    carrito = _carritos.pop(telefono, [])
    return {"telefono": telefono, "items": carrito, "confirmado": bool(carrito)}
