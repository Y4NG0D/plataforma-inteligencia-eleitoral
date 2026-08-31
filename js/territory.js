const CandidateComparer = {
  renderComparison(candId1 = "cand_a", candId2 = "cand_b") {
    const data = window.AppState.get();
    const c1 = data.candidates.find(c => c.id === candId1) || data.candidates[0];
    const c2 = data.candidates.find(c => c.id === candId2) || data.candidates;
    const container = document.getElementById("compareContainer");
    if (!container) return;

    const ideDiff = (c1.ide - c2.ide).toFixed(1);
    const subkeys = [
      { key: "presenca", label: "Presença Digital" },
      { key: "engajamento", label: "Engajamento" },
      { key: "repercussao", label: "Repercussão" },
      { key: "mobilizacao", label: "Mobilização" },
      { key: "sentimento", label: "Sentimento" },
      { key: "interesse", label: "Interesse / Buscas" }
    ];

    let subindicesHtml = subkeys.map(item => {
      const v1 = c1.subIndices[item.key];
      const v2 = c2.subIndices[item.key];
      return `
        <div class="p-2 border-bottom border-secondary mb-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="fw-bold" style="color: ${c1.color}">${v1}</span>
            <span class="small text-muted fw-semibold text-uppercase">${item.label}</span>
            <span class="fw-bold" style="color: ${c2.color}">${v2}</span>
          </div>
          <div class="d-flex gap-1" style="height: 6px;">
            <div class="rounded-start" style="width: ${(v1 / (v1 + v2) * 100)}%; background-color: ${c1.color};"></div>
            <div class="rounded-end" style="width: ${(v2 / (v1 + v2) * 100)}%; background-color: ${c2.color};"></div>
          </div>
        </div>
      `;
    }).join("");

    const projected2nd1 = (38.0 + (16.0 * 0.55) + (10.0 * 0.40)).toFixed(1);
    const projected2nd2 = (36.0 + (16.0 * 0.45) + (10.0 * 0.60)).toFixed(1);

    container.innerHTML = `
      <div class="row g-4 fade-in">
        <div class="col-md-5">
          <div class="glass-card p-3 text-center border-top border-4" style="border-top-color: ${c1.color} !important;">
            <div class="candidate-avatar mx-auto mb-2" style="background-color: ${c1.color}; width: 48px; height: 48px;">${c1.avatar}</div>
            <h4 class="text-white mb-1">${c1.name}</h4>
            <div class="small text-muted mb-3">${c1.party} • Nº ${c1.number}</div>
            <div class="h2 fw-bold text-brand mb-1">${c1.ide.toFixed(1)} <span class="fs-6 text-muted">IDE</span></div>
            <div class="small ${c1.ideDelta30d >= 0 ? 'text-success' : 'text-danger'} fw-bold mb-3">
              ${c1.trendSymbol} ${c1.ideDelta30d >= 0 ? '+' : ''}${c1.ideDelta30d.toFixed(1)}% em 30d
            </div>
            <div class="p-2 rounded bg-dark border border-secondary text-start small">
              <div><strong>Sentimento Líquido:</strong> <span class="${c1.netSentiment >= 0 ? 'text-success' : 'text-danger'}">${c1.netSentiment >= 0 ? '+' : ''}${c1.netSentiment.toFixed(1)}%</span></div>
              <div><strong>Share of Voice:</strong> ${c1.shareOfVoice}</div>
              <div><strong>Tema Forte:</strong> ${c1.topTheme}</div>
            </div>
          </div>
        </div>

        <div class="col-md-2 d-flex flex-column align-items-center justify-content-center text-center">
          <span class="badge bg-danger fs-6 px-3 py-2 mb-2">VS</span>
          <div class="small text-muted mb-1">Diferencial IDE</div>
          <div class="h4 fw-bold ${ideDiff >= 0 ? 'text-primary' : 'text-success'}">${Math.abs(ideDiff)} pts</div>
          <div class="small text-dim">${ideDiff > 0 ? `${c1.name} à frente` : `${c2.name} à frente`}</div>
        </div>

        <div class="col-md-5">
          <div class="glass-card p-3 text-center border-top border-4" style="border-top-color: ${c2.color} !important;">
            <div class="candidate-avatar mx-auto mb-2" style="background-color: ${c2.color}; width: 48px; height: 48px;">${c2.avatar}</div>
            <h4 class="text-white mb-1">${c2.name}</h4>
            <div class="small text-muted mb-3">${c2.party} • Nº ${c2.number}</div>
            <div class="h2 fw-bold text-brand mb-1">${c2.ide.toFixed(1)} <span class="fs-6 text-muted">IDE</span></div>
            <div class="small ${c2.ideDelta30d >= 0 ? 'text-success' : 'text-danger'} fw-bold mb-3">
              ${c2.trendSymbol} ${c2.ideDelta30d >= 0 ? '+' : ''}${c2.ideDelta30d.toFixed(1)}% em 30d
            </div>
            <div class="p-2 rounded bg-dark border border-secondary text-start small">
              <div><strong>Sentimento Líquido:</strong> <span class="${c2.netSentiment >= 0 ? 'text-success' : 'text-danger'}">${c2.netSentiment >= 0 ? '+' : ''}${c2.netSentiment.toFixed(1)}%</span></div>
              <div><strong>Share of Voice:</strong> ${c2.shareOfVoice}</div>
              <div><strong>Tema Forte:</strong> ${c2.topTheme}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4 mt-2">
        <div class="col-lg-6">
          <div class="glass-card p-3 h-100">
            <h5 class="card-title-custom mb-3 fs-6"><i class="bi bi-bar-chart-line text-brand"></i> Confronto nos 6 Sub-Índices</h5>
            ${subindicesHtml}
          </div>
        </div>
        <div class="col-lg-6">
          <div class="glass-card p-3 h-100">
            <h5 class="card-title-custom mb-3 fs-6"><i class="bi bi-pie-chart text-warning"></i> Projeção de Cenário de 2º Turno</h5>
            <div class="p-3 bg-dark-surface rounded border border-secondary mb-3">
              <div class="d-flex justify-content-between fw-bold mb-1">
                <span style="color: ${c1.color}">${c1.name}: ${projected2nd1}%</span>
                <span style="color: ${c2.color}">${c2.name}: ${projected2nd2}%</span>
              </div>
              <div class="progress" style="height: 12px;">
                <div class="progress-bar" style="width: ${projected2nd1}%; background-color: ${c1.color};"></div>
                <div class="progress-bar" style="width: ${projected2nd2}%; background-color: ${c2.color};"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

window.CandidateComparer = CandidateComparer;