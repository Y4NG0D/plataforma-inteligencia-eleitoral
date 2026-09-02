plataforma-dinamica-eleitoral/
│
├── index.html               # Aplicação SPA modular (com as 5 funcionalidades)
├── README.md                # Documentação e guia de manutenção
│
├── css/
│   └── styles.css           # Tema executivo político-institucional e estilos de impressão (@media print)
│
├── js/
│   ├── data.js              # Camada de carregamento e fallback do dataset eleitoral
│   ├── charts.js            # Módulo de renderização e controle com Chart.js
│   └── app.js               # Navegação entre abas e lógica das 5 telas
│
├── data/
│   └── data.json            # Dataset estruturado com histórico de 30 dias, alertas e pesquisas
│
└── scripts/
    ├── requirements.txt     # Dependências Python (pandas, pytrends, google-api-python-client)
    ├── schema.sql           # Modelagem relacional para o SQLite local
    └── pipeline.py          # Script de cálculo do IDE, processamento e exportação para JSON

1. index.html (Aplicação e as 5 Telas)
Contém o cabeçalho institucional, o seletor de navegação rápida e a estrutura das 5 abas integradas

2. css/styles.css (Estilos e Tema Político-Institucional)
Define as cores dos partidos, cartões KPI, badges de anomalia do radar e regras de impressão para que o relatório saia limpo sem barras de navegação

3. js/data.js (Camada de Dados & Fallback)
Responsável por fazer o fetch de data/data.json. Se o usuário abrir no navegador sem servidor local (protocolo file://), ele ativa o fallback em memória sem travar a interface

4. js/charts.js (Módulo de Visualização com Chart.js)
Gera e gerencia a destruição/recriação limpa das instâncias do Chart.js:

Gráfico de Linha da Dinâmica (30 dias)

Gráfico Dual-Axis (Digital vs Pesquisas de Opinião)

Gráfico Radar (Duelo 1 vs 1 nos 6 sub-índices)

Gráfico de Barras e Sentimento por Pauta

