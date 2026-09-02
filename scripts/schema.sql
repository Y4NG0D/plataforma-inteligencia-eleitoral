CREATE TABLE IF NOT EXISTS candidatos (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    partido TEXT NOT NULL,
    numero TEXT NOT NULL,
    cor_hex TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS metricas_diarias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidato_id TEXT NOT NULL,
    data_registro DATE NOT NULL,
    ide_score REAL NOT NULL,
    FOREIGN KEY(candidato_id) REFERENCES candidatos(id)
);

CREATE TABLE IF NOT EXISTS pesquisas_eleitorais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_publicacao DATE NOT NULL,
    instituto TEXT NOT NULL,
    candidato_id TEXT NOT NULL,
    percentual_votos REAL NOT NULL,
    FOREIGN KEY(candidato_id) REFERENCES candidatos(id)
);