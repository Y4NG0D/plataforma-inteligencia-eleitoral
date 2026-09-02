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
