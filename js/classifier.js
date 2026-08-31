const AIClassifier = {
  keywords: {
    candidates: [
      { id: "cand_b", name: "Gabriel Mendes", terms: ["gabriel mendes", "gabriel", "mendes", "candidato b", "22"] },
      { id: "cand_a", name: "Helena Prado", terms: ["helena prado", "helena", "prado", "candidata a", "44"] },
      { id: "cand_c", name: "Clarice Silveira", terms: ["clarice silveira", "clarice", "silveira", "candidata c", "13"] },
      { id: "cand_d", name: "Rodrigo Tavares", terms: ["rodrigo tavares", "rodrigo", "tavares", "candidato d", "15"] }
    ],
    themes: [
      { name: "Segurança Pública", terms: ["segurança", "polícia", "crime", "violência", "assalto", "bandido"] },
      { name: "Economia e Emprego", terms: ["economia", "emprego", "trabalho", "salário", "imposto", "renda"] },
      { name: "Saúde Pública", terms: ["saúde", "hospital", "upa", "médico", "fila", "remédio"] },
      { name: "Educação", terms: ["educação", "escola", "professor", "ensino", "estudante", "passe livre"] }
    ],
    sentiments: {
      positive: ["voto", "votar", "ótimo", "excelente", "melhor", "apoio", "experiência", "futuro"],
      negative: ["péssimo", "ruim", "urgência", "insuportável", "crime", "sumiu", "problema", "não voto"]
    }
  },

  classifyText(rawText) {
    if (!rawText || rawText.trim().length === 0) return null;
    const text = rawText.toLowerCase();

    // 1. Identifica Candidato
    let candidate = "Menção Geral / Não Identificado";
    for (const cand of this.keywords.candidates) {
      if (cand.terms.some(term => text.includes(term))) {
        candidate = cand.name;
        break;
      }
    }

    // 2. Identifica Tema
    let theme = "Campanha e Eleição Geral";
    for (const th of this.keywords.themes) {
      if (th.terms.some(term => text.includes(term))) {
        theme = th.name;
        break;
      }
    }

    // 3. Sentimento
    let pos = 0, neg = 0;
    this.keywords.sentiments.positive.forEach(w => { if (text.includes(w)) pos++; });
    this.keywords.sentiments.negative.forEach(w => { if (text.includes(w)) neg++; });

    let sentiment = "Neutro", score = 0.0, badgeClass = "bg-secondary";
    if (pos > neg) {
      sentiment = "Positivo";
      score = 0.85;
      badgeClass = "bg-success";
    } else if (neg > pos) {
      sentiment = "Negativo";
      score = -0.75;
      badgeClass = "bg-danger";
    }

    // 4. Tipo & Mobilização
    const isSupport = text.includes("voto") || text.includes("votar") || pos >= 2;
    const type = isSupport ? "Declaração de Apoio Explícito" : (neg > 0 ? "Crítica / Cobrança Direta" : "Menção Espontânea");
    const intensity = (pos >= 2 || neg >= 2 || text.includes("!")) ? "Alta" : "Média";
    const supportProb = isSupport ? "Muito Alta (94%)" : (sentiment === "Negativo" ? "Baixa (< 15%)" : "Indefinida (50%)");

    return {
      rawText,
      candidate,
      theme,
      sentiment,
      sentimentScore: score.toFixed(2),
      badgeClass,
      type,
      intensity,
      supportProbability: supportProb,
      mobilizationLevel: isSupport ? "Alta (Multiplicador de Voto)" : "Média",
      processedAt: new Date().toLocaleTimeString("pt-BR")
    };
  }
};

window.AIClassifier = AIClassifier;