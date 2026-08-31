const TopicsEngine = {
  selectedTopicId: "seguranca",

  renderTopicsExplorer(topicId = null) {
    if (topicId) this.selectedTopicId = topicId;
    const data = window.AppState.get();
    const topic = data.themes.find(t => t.id === this.selectedTopicId) || data.themes[0];
    const container = document.getElementById("topicsExplorerContainer");
    if (!container) return;

    const buttonsHtml = data.themes.map(t => `
      <button class="btn btn-sm ${t.id === topic.id ? 'btn-primary fw-bold' : 'btn-outline-secondary'} me-2 mb-2" onclick="TopicsEngine.renderTopicsExplorer('${t.id}')">
        ${t.name} <span class="badge ${t.id === topic.id ? 'bg-dark' : 'bg-secondary'} ms-1">${t.volumeShare}</span>
      </button>
    `).join("");

    const ownershipHtml = Object.entries(topic.candidateShares).map(([candId, share]) => {
      const cand = data.candidates.find(c => c.id === candId);
      if (!cand) return '';
      return `
        <div class="mb-2">
          <div class="d-flex justify-content-between small mb-1">
            <span class="text-light fw-bold">${cand.name}</span>
            <span class="text-brand fw-bold">${share}% de menções</span>
          </div>
          <div class="progress" style="height: 8px;">
            <div class="progress-bar" style="width: ${share}%; background-color: ${cand.color};"></div>
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div class="mb-3">
        <label class="small text-muted d-block mb-2 fw-bold text-uppercase">Selecione o Tema para Investigação:</label>
        <div>${buttonsHtml}</div>
      </div>

      <div class="row g-4 fade-in">
        <div class="col-lg-7">
          <div class="glass-card p-4 h-100">
            <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3">
              <div>
                <h4 class="text-white mb-1">${topic.name}</h4>
                <div class="small text-muted">Volume Total: <strong>${topic.volumeNumber.toLocaleString('pt-BR')} menções</strong> (${topic.volumeShare})</div>
              </div>
              <div class="text-end">
                <span class="badge bg-dark border border-secondary text-brand fs-6">${topic.trend} semana</span>
                <div class="small text-dim mt-1">Líder na pauta: <strong class="text-light">${topic.dominantCandidate}</strong></div>
              </div>
            </div>

            <div class="mb-4">
              <label class="small text-muted fw-bold d-block mb-1">Balanço Qualitativo de Sentimento neste Tema:</label>
              <div class="progress" style="height: 18px; border-radius: 6px;">
                <div class="progress-bar bg-success" style="width: ${topic.sentiment.positive}%;">${topic.sentiment.positive}% Positivo</div>
                <div class="progress-bar bg-secondary" style="width: ${topic.sentiment.neutral}%;">${topic.sentiment.neutral}% Neutro</div>
                <div class="progress-bar bg-danger" style="width: ${topic.sentiment.negative}%;">${topic.sentiment.negative}% Negativo</div>
              </div>
              <div class="small text-dim mt-1 fst-italic">${topic.sentimentSummary}</div>
            </div>

            <div class="p-3 bg-dark-surface rounded border border-secondary">
              <div class="small text-brand fw-bold mb-1"><i class="bi bi-lightbulb-fill me-1"></i> Inteligência Estratégica de Pauta:</div>
              <p class="small text-light mb-0">${topic.strategicNote}</p>
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="glass-card p-4 h-100">
            <h5 class="card-title-custom mb-3 fs-6"><i class="bi bi-pie-chart-fill text-brand"></i> Issue Ownership (Apropriação da Pauta)</h5>
            ${ownershipHtml}
            <div class="mt-4 border-top border-secondary pt-3">
              <label class="small text-muted fw-bold d-block mb-2">Termos e Gatilhos Mais Frequentes:</label>
              <div class="d-flex flex-wrap gap-1">
                ${topic.keywords.map(kw => `<span class="badge bg-dark border border-secondary text-light p-2">${kw}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

window.TopicsEngine = TopicsEngine;