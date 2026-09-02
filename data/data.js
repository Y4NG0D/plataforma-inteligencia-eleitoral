const DEFAULT_DATA = {
  "meta": {
    "title": "Plataforma de Inteligência e Dinâmica Eleitoral",
    "election": "Eleição Estadual 2026 - Governo do Estado",
    "updatedAt": "2026-09-02T08:00:00-03:00",
    "instituteName": "Instituto de Inteligência & Estratégia Política"
  },
  "candidates": [
    {
      "id": "cand_a",
      "name": "Candidato A",
      "party": "União Democrática",
      "number": "44",
      "color": "#1d4ed8",
      "ideScore": 81.4,
      "change30d": 2.0,
      "trend": "up",
      "acceleration": "Estável / Crescimento Vegetativo (+2% em 30d)",
      "volumeMentions": 142500,
      "subindices": { "presenca": 88.0, "engajamento": 79.5, "repercussao": 84.0, "mobilizacao": 76.0, "sentimento": 74.0, "interesse": 87.0 }
    },
    {
      "id": "cand_b",
      "name": "Candidato B",
      "party": "Frente de Renovação",
      "number": "22",
      "color": "#ea580c",
      "ideScore": 73.8,
      "change30d": 18.1,
      "trend": "rapid_up",
      "acceleration": "Alta Aceleração (+18% em 30d - Alerta de Inflexão)",
      "volumeMentions": 198400,
      "subindices": { "presenca": 72.0, "engajamento": 86.0, "repercussao": 92.0, "mobilizacao": 81.0, "sentimento": 44.0, "interesse": 78.0 }
    },
    {
      "id": "cand_c",
      "name": "Candidato C",
      "party": "Aliança Trabalhista",
      "number": "13",
      "color": "#dc2626",
      "ideScore": 62.1,
      "change30d": 3.0,
      "trend": "up",
      "acceleration": "Crescimento Moderado (+3% em 30d)",
      "volumeMentions": 84100,
      "subindices": { "presenca": 65.0, "engajamento": 64.0, "repercussao": 59.0, "mobilizacao": 68.0, "sentimento": 58.0, "interesse": 59.0 }
    },
    {
      "id": "cand_d",
      "name": "Candidato D",
      "party": "Partido Liberal Cidadão",
      "number": "30",
      "color": "#4b5563",
      "ideScore": 48.7,
      "change30d": -7.9,
      "trend": "down",
      "acceleration": "Desaceleração Contínua (-8% em 30d)",
      "volumeMentions": 31200,
      "subindices": { "presenca": 49.0, "engajamento": 46.0, "repercussao": 42.0, "mobilizacao": 45.0, "sentimento": 55.0, "interesse": 55.0 }
    }
  ],
  "radarAlerts": [
    {
      "severity": "danger",
      "badge": "Alerta Crítico",
      "timestamp": "Últimas 24 horas",
      "title": "Disparo Anormal de Repercussão e Menções (+187%)",
      "summary": "Menções ao Candidato B aumentaram 187% nas últimas 24h. Tema: segurança pública. 68% das novas menções de tom crítico.",
      "metrics": {
        "spikePercent": "+187%",
        "leadTopic": "Segurança Pública",
        "negativeRatio": "68%",
        "topPlatforms": ["Instagram", "TikTok", "X"]
      }
    }
  ],
  "timeline30d": {
    "dates": ["04/08", "07/08", "10/08", "13/08", "16/08", "19/08", "22/08", "25/08", "28/08", "31/08", "02/09"],
    "cand_a": [79.8, 80.0, 80.2, 80.5, 80.7, 80.9, 81.0, 81.1, 81.2, 81.3, 81.4],
    "cand_b": [62.5, 63.2, 64.0, 65.1, 66.8, 68.2, 69.5, 71.0, 72.4, 73.1, 73.8],
    "cand_c": [60.3, 60.5, 60.8, 61.0, 61.2, 61.5, 61.7, 61.8, 62.0, 62.0, 62.1],
    "cand_d": [52.9, 52.4, 52.0, 51.5, 51.0, 50.4, 49.8, 49.5, 49.1, 48.9, 48.7]
  },
  "digitalVsPolls": [
    { "date": "01/08", "candB_digital": 61.0, "candB_poll": 28.0, "candA_digital": 79.5, "candA_poll": 42.0, "event": "Medição de pré-campanha" },
    { "date": "08/08", "candB_digital": 65.0, "candB_poll": 29.0, "candA_digital": 80.0, "candA_poll": 41.5, "event": "Cand. B inicia pauta de segurança" },
    { "date": "15/08", "candB_digital": 72.0, "candB_poll": 32.0, "candA_digital": 80.6, "candA_poll": 41.0, "event": "Pesquisa registra subida (+3 p.p.) após aceleração digital" },
    { "date": "22/08", "candB_digital": 79.0, "candB_poll": 35.0, "candA_digital": 81.0, "candA_poll": 39.5, "event": "Confirmação da antecipação digital" },
    { "date": "29/08", "candB_digital": 83.5, "candB_poll": 37.5, "candA_digital": 81.3, "candA_poll": 38.0, "event": "Cruzamento iminente das curvas" }
  ],
  "leadLagAnalysis": {
    "correlationScore": 0.89,
    "averageLeadDays": 9.2,
    "insight": "As inflexões na aceleração digital do Candidato B antecederam em média 9 dias as alterações nas pesquisas de opinião registradas."
  },
  "themes": [
    { "name": "Segurança Pública", "volumeShare": 41.0, "sentiment": { "positive": 24, "neutral": 20, "negative": 56 }, "dominantCandidate": "Candidato B (49% de voz)", "tone": "Cobrança institucional", "growth": "+34% semana" },
    { "name": "Saúde Pública", "volumeShare": 25.0, "sentiment": { "positive": 35, "neutral": 28, "negative": 37 }, "dominantCandidate": "Candidato C (42% de voz)", "tone": "Propositivo", "growth": "+8% semana" },
    { "name": "Economia e Emprego", "volumeShare": 19.0, "sentiment": { "positive": 42, "neutral": 38, "negative": 20 }, "dominantCandidate": "Candidato A (51% de voz)", "tone": "Obras e tributação", "growth": "-2% semana" },
    { "name": "Educação", "volumeShare": 15.0, "sentiment": { "positive": 46, "neutral": 34, "negative": 20 }, "dominantCandidate": "Candidato C (38% de voz)", "tone": "Valorização escolar", "growth": "+5% semana" }
  ]
};

let electoralData = DEFAULT_DATA;

async function loadElectoralData() {
  try {
    const res = await fetch('data/data.json');
    if (res.ok) {
      electoralData = await res.json();
    }
  } catch (e) {
    electoralData = DEFAULT_DATA;
  }
  return electoralData;
}

function getData() {
  return electoralData;
}