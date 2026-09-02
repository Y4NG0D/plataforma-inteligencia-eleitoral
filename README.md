# Plataforma Dinâmica Eleitoral

Plataforma web para **análise, visualização e acompanhamento de dados eleitorais**, desenvolvida com uma arquitetura modular e interface institucional.

O projeto apresenta informações eleitorais por meio de **indicadores, gráficos, tabelas, alertas e análises comparativas**, permitindo transformar dados estruturados em um painel executivo de fácil compreensão.

> **Status:** Protótipo funcional
> **Arquitetura:** Front-end estático + pipeline local em Python/SQLite
> **Publicação:** GitHub Pages / Vercel

---

## Visão Geral

A **Plataforma Dinâmica Eleitoral** foi projetada para centralizar diferentes indicadores relacionados ao cenário eleitoral em uma única interface.

A aplicação funciona como uma **SPA (Single Page Application)**, permitindo navegar entre diferentes módulos sem a necessidade de recarregar a página.

Entre os recursos disponíveis estão:

* Acompanhamento da dinâmica eleitoral;
* Indicadores-chave de desempenho (KPIs);
* Comparação entre candidatos;
* Análise de presença digital;
* Comparação com pesquisas de opinião;
* Radar de subíndices eleitorais;
* Análise de sentimento;
* Análise por pautas;
* Alertas e identificação de anomalias;
* Geração de relatório executivo;
* Impressão e exportação para PDF.

---

## Estrutura do Projeto

```text
plataforma-dinamica-eleitoral/
│
├── index.html
│   └── Aplicação SPA e estrutura das 5 funcionalidades
│
├── README.md
│   └── Documentação do projeto
│
├── css/
│   └── styles.css
│       └── Tema institucional, componentes e estilos de impressão
│
├── js/
│   ├── data.js
│   │   └── Carregamento e fallback dos dados eleitorais
│   │
│   ├── charts.js
│   │   └── Gráficos e visualizações com Chart.js
│   │
│   └── app.js
│       └── Navegação e lógica principal da aplicação
│
├── data/
│   └── data.json
│       └── Dataset eleitoral estruturado
│
└── scripts/
    ├── requirements.txt
    │   └── Dependências Python
    │
    ├── schema.sql
    │   └── Estrutura do banco SQLite
    │
    └── pipeline.py
        └── Processamento, cálculo e exportação dos dados
```

---

# Funcionalidades

## 1. Dashboard Executivo

A tela principal apresenta uma visão geral do cenário analisado por meio de:

* KPIs;
* Indicadores eleitorais;
* Evolução temporal;
* Alertas;
* Comparações;
* Resumos executivos.

O objetivo é permitir que o usuário compreenda rapidamente o cenário sem precisar analisar individualmente todos os dados.

---

## 2. Dinâmica Eleitoral

Apresenta a evolução dos indicadores ao longo do tempo.

O projeto utiliza um histórico de aproximadamente **30 dias**, permitindo visualizar tendências, oscilações e mudanças no comportamento dos indicadores.

### Visualização

**Gráfico de linha da dinâmica eleitoral**

```text
Indicador
   │
   │       ╭──╮
   │   ╭───╯  ╰──╮
   │───╯         ╰────
   │
   └────────────────────
          Tempo
```

---

## 3. Digital x Pesquisas de Opinião

Permite comparar indicadores relacionados à presença digital com dados provenientes de pesquisas de opinião.

A visualização utiliza um **gráfico de dois eixos (Dual Axis)** para facilitar a comparação entre métricas que possuem escalas diferentes.

Exemplos de indicadores:

* Interesse digital;
* Volume de buscas;
* Engajamento;
* Intenção de voto;
* Evolução das pesquisas.

---

## 4. Radar Comparativo

Possibilita realizar um duelo **1 vs 1** entre candidatos utilizando seis subíndices.

O gráfico radar permite observar rapidamente os pontos fortes e fracos de cada candidato.

Exemplo de estrutura:

```text
                 Índice 1
                    ▲
                   / \
                  /   \
        Índice 6 ◄     ► Índice 2
                /       \
               /         \
        Índice 5 ◄───────► Índice 3
                    │
                 Índice 4
```

Os seis subíndices podem ser utilizados para representar diferentes dimensões da análise eleitoral.

---

## 5. Sentimento e Pautas

O sistema também apresenta informações relacionadas ao sentimento identificado nas menções e às principais pautas associadas aos candidatos.

Entre os indicadores possíveis:

* Sentimento positivo;
* Sentimento neutro;
* Sentimento negativo;
* Volume de menções;
* Principais pautas;
* Desempenho por pauta.

A visualização combina **gráficos de barras e indicadores de sentimento**.

---

# Tecnologias Utilizadas

## Front-end

* HTML5
* CSS3
* JavaScript
* Chart.js

## Dados

* JSON
* SQLite

## Pipeline

* Python 3
* Pandas
* PyTrends
* Google API Client

## Hospedagem

* GitHub Pages
* Vercel

---

# Arquitetura

O projeto utiliza uma arquitetura simples e modular:

```text
             ┌──────────────────┐
             │     Dataset      │
             │    data.json     │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │     data.js      │
             │  Camada de dados │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │      app.js      │
             │  Lógica da SPA   │
             └───────┬──────────┘
                     │
             ┌───────┴────────┐
             ▼                ▼
      ┌──────────────┐  ┌──────────────┐
      │   charts.js  │  │   Interface  │
      │   Chart.js   │  │     HTML     │
      └──────────────┘  └──────────────┘
```

O pipeline Python funciona separadamente para processamento e atualização dos dados.

```text
Fontes de dados
       │
       ▼
 pipeline.py
       │
       ├── Processamento
       ├── Cálculo de indicadores
       ├── Análise
       └── Exportação
              │
              ▼
          data.json
              │
              ▼
        Plataforma Web
```

---

# Organização dos Arquivos

## `index.html`

É o ponto de entrada da aplicação.

Contém:

* Cabeçalho institucional;
* Navegação;
* Estrutura das cinco telas;
* Tabelas;
* Cards;
* Containers dos gráficos;
* Área do relatório executivo.

A aplicação funciona como uma **Single Page Application (SPA)**, alternando entre as telas sem recarregar o documento.

---

## `css/styles.css`

Responsável pela aparência da plataforma.

Inclui:

* Tema político-institucional;
* Cores dos elementos;
* Cards de KPI;
* Tabelas;
* Badges;
* Alertas;
* Componentes de navegação;
* Responsividade;
* Estilos dos gráficos;
* Regras específicas para impressão.

Também contém regras `@media print` para adaptar o relatório quando o usuário utilizar a função de impressão do navegador.

---

## `js/data.js`

Responsável pela camada de dados.

Sua principal função é carregar:

```text
data/data.json
```

A aplicação também possui um **fallback em memória**.

Isso significa que, caso o usuário abra o `index.html` diretamente utilizando:

```text
file://
```

e o navegador bloqueie o carregamento do arquivo JSON, a interface poderá utilizar dados disponíveis no próprio JavaScript em vez de simplesmente apresentar um erro.

Para desenvolvimento, entretanto, recomenda-se utilizar um servidor local.

---

## `js/charts.js`

Responsável pela criação e gerenciamento das visualizações utilizando **Chart.js**.

Entre os gráficos utilizados estão:

### Gráfico de Linha

Representa a dinâmica dos indicadores ao longo dos últimos 30 dias.

### Gráfico Dual Axis

Compara:

```text
Indicadores Digitais
        ×
Pesquisas de Opinião
```

utilizando dois eixos.

### Gráfico Radar

Compara dois candidatos considerando seis subíndices.

### Gráfico de Barras

Apresenta dados relacionados às principais pautas.

### Sentimento

Representa a distribuição de sentimentos identificados na análise.

O módulo também realiza a **destruição e recriação das instâncias do Chart.js**, evitando a sobreposição de gráficos quando o usuário troca de tela ou atualiza os dados.

---

## `js/app.js`

É responsável pela lógica principal da aplicação.

Entre suas funções estão:

* Navegação entre abas;
* Atualização dos indicadores;
* Alimentação das tabelas;
* Atualização dos componentes;
* Controle dos filtros;
* Comunicação com o módulo de gráficos;
* Montagem do relatório executivo;
* Preparação da interface para impressão.

---

# Dataset

Os dados utilizados pela interface estão armazenados em:

```text
data/data.json
```

O arquivo possui uma estrutura preparada para armazenar informações como:

* Candidatos;
* Indicadores;
* Histórico temporal;
* Pesquisas;
* Dados digitais;
* Sentimentos;
* Pautas;
* Alertas;
* Subíndices;
* Informações comparativas.

### Exemplo simplificado

```json
{
  "periodo": "30 dias",
  "candidatos": [],
  "historico": [],
  "pesquisas": [],
  "alertas": [],
  "pautas": []
}
```

A estrutura pode ser expandida conforme novas fontes de dados forem incorporadas.

---

# Pipeline Python

O diretório `scripts/` contém a estrutura necessária para processamento local dos dados.

## `scripts/schema.sql`

Define a modelagem do banco de dados SQLite.

O banco pode ser utilizado como camada intermediária para:

```text
Coleta
   ↓
Banco SQLite
   ↓
Processamento
   ↓
Indicadores
   ↓
JSON
   ↓
Dashboard
```

---

## `scripts/pipeline.py`

Responsável pelo processamento dos dados.

Entre as funções previstas estão:

* Coleta de dados;
* Tratamento;
* Normalização;
* Cálculo de indicadores;
* Cálculo do IDE;
* Organização dos dados;
* Exportação para JSON.

O resultado final é utilizado pela aplicação web.

---

# Instalação

## Pré-requisitos

Para utilizar o projeto localmente, recomenda-se possuir:

* [Python 3](https://www.python.org/)
* [Git](https://git-scm.com/)
* Visual Studio Code
* Navegador moderno

---

# Executando no VS Code

Clone o projeto:

```bash
git clone https://github.com/SEU-USUARIO/eleitoral-intelligence.git
```

Entre na pasta:

```bash
cd eleitoral-intelligence
```

Abra o projeto no VS Code:

```bash
code .
```

Instale a extensão **Live Server**.

Depois:

1. Abra `index.html`;
2. Clique com o botão direito;
3. Selecione **Open with Live Server**.

A aplicação será disponibilizada normalmente em:

```text
http://127.0.0.1:5500
```

O uso do Live Server é recomendado porque permite que o navegador carregue corretamente o arquivo:

```text
data/data.json
```

---

# Executando o Pipeline Python

Entre na pasta do projeto e instale as dependências:

```bash
pip install -r scripts/requirements.txt
```

Em algumas distribuições Linux/macOS, pode ser necessário utilizar:

```bash
pip3 install -r scripts/requirements.txt
```

Depois execute:

```bash
python3 scripts/pipeline.py
```

No Windows, também pode ser utilizado:

```bash
python scripts/pipeline.py
```

Após o processamento, o pipeline deverá atualizar os dados utilizados pela aplicação.

---

# Publicando no GitHub Pages

O projeto possui uma arquitetura estática e pode ser hospedado gratuitamente utilizando o GitHub Pages.

Inicialize o Git:

```bash
git init
```

Adicione os arquivos:

```bash
git add .
```

Crie o primeiro commit:

```bash
git commit -m "feat: prototipo plataforma dinamica eleitoral"
```

Defina a branch principal:

```bash
git branch -M main
```

Adicione o repositório remoto:

```bash
git remote add origin https://github.com/SEU-USUARIO/eleitoral-intelligence.git
```

Envie os arquivos:

```bash
git push -u origin main
```

Depois, no GitHub:

```text
Settings
   ↓
Pages
   ↓
Build and deployment
   ↓
Source: Deploy from a branch
   ↓
Branch: main
   ↓
Folder: / (root)
   ↓
Save
```

Após a publicação, a aplicação ficará disponível em:

```text
https://SEU-USUARIO.github.io/eleitoral-intelligence/
```

---

# Deploy na Vercel

O projeto também pode ser publicado na Vercel.

Como a aplicação é essencialmente estática, não é necessário configurar um servidor de aplicação complexo.

Fluxo recomendado:

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
Deploy automático
   │
   ▼
Plataforma publicada
```

Basta importar o repositório do GitHub na Vercel.

A cada novo `push` na branch configurada, a plataforma poderá realizar um novo deploy automaticamente.

---

# Impressão e PDF

A plataforma possui estilos específicos para impressão utilizando:

```css
@media print
```

Isso permite transformar o dashboard em um relatório mais adequado para apresentação.

Ao utilizar:

```text
Ctrl + P
```

o navegador poderá gerar:

* Impressão física;
* PDF;
* Relatório executivo.

Durante a impressão, elementos de navegação desnecessários podem ser ocultados para deixar o documento mais limpo.

---

# Fluxo de Atualização dos Dados

O fluxo recomendado para atualização é:

```text
        Fontes de Dados
              │
              ▼
        pipeline.py
              │
              ▼
        Tratamento dos dados
              │
              ▼
       Cálculo dos índices
              │
              ▼
          data.json
              │
              ▼
        Plataforma Web
              │
              ▼
       Dashboard atualizado
```

Em uma implementação futura, esse processo poderá ser automatizado.

---

# Roadmap

Possíveis melhorias futuras:

* [ ] Integração com APIs eleitorais;
* [ ] Integração automatizada com pesquisas;
* [ ] Integração com Google Trends;
* [ ] Banco de dados remoto;
* [ ] Sistema de autenticação;
* [ ] Painel administrativo;
* [ ] Filtros por período;
* [ ] Filtros por candidato;
* [ ] Exportação automática de relatórios;
* [ ] Geração de PDF automatizada;
* [ ] Histórico de eleições;
* [ ] Atualização automática dos dados;
* [ ] API própria;
* [ ] Deploy automatizado do pipeline;
* [ ] Migração para arquitetura full-stack.

---

# Boas Práticas de Desenvolvimento

Ao realizar alterações no projeto:

### Front-end

Alterações visuais devem ser realizadas preferencialmente em:

```text
css/styles.css
```

### Dados

Alterações na estrutura ou carregamento dos dados devem ser realizadas em:

```text
js/data.js
```

### Gráficos

Alterações nas visualizações devem ser realizadas em:

```text
js/charts.js
```

### Lógica

Alterações na navegação e comportamento da aplicação devem ser realizadas em:

```text
js/app.js
```

### Processamento

Alterações na coleta ou processamento dos dados devem ser realizadas em:

```text
scripts/pipeline.py
```

---

# Considerações sobre Dados Eleitorais

Esta plataforma é uma ferramenta de **visualização e análise de dados**.

Os indicadores apresentados dependem da qualidade, metodologia, período e origem dos dados utilizados.

Resultados, índices, classificações ou visualizações apresentados pela plataforma **não devem ser interpretados automaticamente como previsão de resultado eleitoral**.

Sempre que dados reais forem utilizados, recomenda-se documentar:

* Fonte;
* Data de coleta;
* Metodologia;
* Período analisado;
* Critérios de cálculo;
* Limitações da informação.

---

# Licença

Este projeto pode ser adaptado conforme a necessidade do responsável pelo repositório.

Caso uma licença específica seja adotada, recomenda-se adicionar um arquivo:

```text
LICENSE
```

na raiz do projeto.

---

# Autor

**Yan Pereira de Lima**

Projeto desenvolvido para fins comerciais, desenvolvimento e experimentação com:

* Desenvolvimento Web;
* Visualização de dados;
* Análise de indicadores;
* Processamento de dados;
* Tecnologias aplicadas ao contexto eleitoral.

---

## Estrutura resumida

```text
Plataforma Dinâmica Eleitoral
│
├── Interface Web
│   ├── Dashboard
│   ├── Dinâmica Eleitoral
│   ├── Digital × Pesquisas
│   ├── Radar Comparativo
│   └── Sentimento × Pautas
│
├── Visualização
│   └── Chart.js
│
├── Dados
│   ├── JSON
│   └── SQLite
│
├── Pipeline
│   └── Python
│
└── Deploy
    ├── GitHub Pages
    └── Vercel
```
**SUJEITO A DIREITOS AUTORAIS**

**Plataforma Dinâmica Eleitoral — dados transformados em informação visual para análise estratégica.**
