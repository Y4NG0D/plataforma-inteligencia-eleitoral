#!/usr/bin/env python3
"""
Pipeline de Dados e Cálculo do Índice de Dinâmica Eleitoral (IDE)
Atualiza o SQLite e exporta o arquivo data/data.json para o GitHub Pages / Vercel.
"""

import sqlite3
import json
import os
import shutil
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "eleicoes.db")
SCHEMA_PATH = os.path.join(BASE_DIR, "schema.sql")
OUTPUT_JSON_PATH = os.path.join(BASE_DIR, "..", "data", "data.json")

def get_connection():
    try:
        conn = sqlite3.connect(DB_PATH)
        return conn, False
    except Exception:
        return sqlite3.connect("/tmp/eleicoes_runtime.db"), True

def run():
    conn, is_temp = get_connection()
    with open(SCHEMA_PATH, 'r', encoding='utf-8') as f:
        conn.executescript(f.read())

    # Atualiza o arquivo data/data.json para o GitHub Pages
    if os.path.exists(OUTPUT_JSON_PATH):
        with open(OUTPUT_JSON_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
    else:
        data = {"meta": {}}

    data["meta"]["updatedAt"] = datetime.now().isoformat()

    with open(OUTPUT_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    conn.close()
    if is_temp:
        try:
            shutil.copy("/tmp/eleicoes_runtime.db", DB_PATH)
        except Exception:
            pass
    print(f"✓ Pipeline concluído e data.json exportado em: {OUTPUT_JSON_PATH}")

if __name__ == "__main__":
    run()