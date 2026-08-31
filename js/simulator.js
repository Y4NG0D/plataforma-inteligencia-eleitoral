const ScenarioSimulator = {
  scenarios: [
    {
      id: "debate_win",
      title: "Desempenho Dominante em Debate na TV",
      icon: "bi-trophy-fill",
      color: "success",
      description: "O candidato impõe suas narrativas, gera momentos virais e domina as buscas e repercussões.",
      effects: { presenca: +8, engajamento: +15, repercussao: +22, mobilizacao: +14, sentimento: +12, interesse: +25 },
      anomalyTrigger: "Pico de buscas (+145%) e engajamento dominante pós-transmissão."
    },
    {
      id: "scandal_crisis",
      title: "Denúncia / Crise Reputacional Grave",
      icon: "bi-exclamation-triangle-fill",
      color: "danger",
      description: "Explosão de menções críticas impulsionadas por ataques e reportagens investigativas.",
      effects: { presenca: +12, engajamento: +18, repercussao: +30, mobilizacao: -18, sentimento: -35, interesse: +28 },
      anomalyTrigger: "Volume atípico (+210%) de menções com 78% de teor crítico."
    },
    {
      id: "viral_organic",
      title: "Viralização Orgânica em Vídeos Curtos (TikTok/Reels)",
      icon: "bi-phone-fill",
      color: "info",
      description: "Trecho de proposta gera forte engajamento e replicação massiva entre jovens.",
      effects: { presenca: +5, engajamento: +20, repercussao: +16, mobilizacao: +25, sentimento: +15, interesse: +18 },
      anomalyTrigger: "Propagação acelerada (+85% compartilhamentos) de 16 a 24 anos."
    },
    {
      id: "paid_ads_boost",
      title: "Injeção Massiva de Tráfego Pago / Anúncios",
      icon: "bi-badge-ad-fill",
      color: "warning",
      description: "Aumento abrupto de alcance pago com impacto institucional moderado.",
      effects: { presenca: +28, engajamento: +6, repercussao: +8, mobilizacao: +3, sentimento: +2, interesse: +10 },
      anomalyTrigger: "Aumento artificial de impressões institucionais."
    },
    {
      id: "key_endorsement",
      title: "Apoio de Grande Liderança Popular",
      icon: "bi-person-check-fill",
      color: "primary",
      description: "Transferência de capital político e engajamento cruzado de bases.",
      effects: { presenca: +14, engajamento: +16, repercussao: +18, mobilizacao: +15, sentimento: +10, interesse: +20 },
      anomalyTrigger: "Elevação de 40% nas menções positivas compartilhadas."
    }
  ],

  applyScenario(scenarioId, candidateId) {
    const scenario = this.scenarios.find(s => s.id === scenarioId);
    const data = window.AppState.get();
    const candidate = data.candidates.find(c => c.id === candidateId);
    if (!scenario || !candidate) return;

    const oldIDE = candidate.ide;
    const s = candidate.subIndices;

    const newSubindices = {
      presenca: Math.min(100, Math.max(0, parseFloat((s.presenca + scenario.effects.presenca).toFixed(1)))),
      engajamento: Math.min(100, Math.max(0, parseFloat((s.engajamento + scenario.effects.engajamento).toFixed(1)))),
      repercussao: Math.min(100, Math.max(0, parseFloat((s.repercussao + scenario.effects.repercussao).toFixed(1)))),
      mobilizacao: Math.min(100, Math.max(0, parseFloat((s.mobilizacao + scenario.effects.mobilizacao).toFixed(1)))),
      sentimento: Math.min(100, Math.max(0, parseFloat((s.sentimento + scenario.effects.sentimento).toFixed(1)))),
      interesse: Math.min(100, Math.max(0, parseFloat((s.interesse + scenario.effects.interesse).toFixed(1))))
    };

    const newAnomaly = {
      id: `anom_sim_${Date.now()}`,
      severity: scenario.color === "danger" ? "alta" : (scenario.color === "warning" ? "media" : "baixa"),
      severityLabel: `Simulação: ${scenario.title}`,
      severityColor: scenario.color,
      candidate: candidate.name,
      candidateId: candidate.id,
      timeAgo: "Agora (Simulado)",
      title: `[Simulação] ${scenario.title}`,
      summary: `Impacto simulado: ${scenario.anomalyTrigger}`,
      metrics: {
        volumeSpike: `${scenario.effects.repercussao > 0 ? '+' : ''}${scenario.effects.repercussao * 5}%`,
        mainTheme: candidate.topTheme || "Assuntos Gerais",
        negativeShare: scenario.effects.sentimento < 0 ? "65%" : "20%",
        positiveShare: scenario.effects.sentimento > 0 ? "60%" : "25%",
        neutralShare: "15%",
        platforms: ["X", "Instagram", "TikTok", "YouTube"],
        triggerContent: `Evento: ${scenario.title}`
      },
      investigation: `Choque de campanha aplicado. O reflexo em pesquisas de opinião possui defasagem estimada de 8 a 10 dias.`
    };

    window.AppState.addAnomaly(newAnomaly);
    window.AppState.updateCandidateSubindices(candidateId, newSubindices);

    const newIDE = candidate.ide;
    const diff = (newIDE - oldIDE).toFixed(1);

    return {
      candidate: candidate.name,
      oldIDE,
      newIDE,
      diff: diff > 0 ? `+${diff}` : diff,
      scenario: scenario.title
    };
  }
};

window.ScenarioSimulator = ScenarioSimulator;