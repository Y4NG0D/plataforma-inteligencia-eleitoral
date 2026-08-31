const ElectionSelector = {
  elections: {
    governo_sp: { id: "governo_sp", title: "Eleição para Governador - SP 2026", state: "SP", period: "Últimos 30 Dias (01/08 - 30/08/2026)", totalSignalsProcessed: 4821940 },
    presidencia_br: { id: "presidencia_br", title: "Eleição Presidencial - Brasil 2026", state: "BR", period: "Últimos 30 Dias (Nacional)", totalSignalsProcessed: 18450000 },
    prefeitura_cap: { id: "prefeitura_cap", title: "Eleição Municipal - Capital 2028", state: "Capital", period: "Últimos 30 Dias (Local)", totalSignalsProcessed: 2190000 }
  },

  switchElection(electionKey) {
    const target = this.elections[electionKey];
    if (!target) return;

    const data = window.AppState.get();
    data.metadata.title = target.title;
    data.metadata.state = target.state;
    data.metadata.period = target.period;
    data.metadata.totalSignalsProcessed = target.totalSignalsProcessed;

    window.AppState.notify();
    alert(`Cenário eleitoral alterado para: ${target.title}`);
  }
};

window.ElectionSelector = ElectionSelector;