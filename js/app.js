document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  init() {
    ChartsManager.setupDefaults();
    this.renderKPIs();
    this.renderCandidateRankingTable();
    this.renderSubIndicesBreakdown();
    this.renderAnomalyRadar();
    this.renderThemes();
    this.renderPollingTable();
    this.renderClassifierPresets();
    this.renderPredictiveLayer();
    this.initCharts();
    this.bindEvents();
    ReportGenerator.renderReport();
  },

  renderKPIs() {
    const cands = ELECTION_DATA.candidates;
    const leader = cands[0];
    const fastest = cands;

    document.getElementById("kpiLeader").innerHTML = `
      <div class="kpi-value text-primary">${leader.name}</div>
      <div class="small text-muted mt-1">IDE: <strong>${leader.ide.toFixed(1)}</strong> (${leader.shareOfVoice} SoV)</div>
    `;

    document.getElementById("kpiFastest").innerHTML = `
      <div class="kpi-value text-success">${fastest.name}</div>
      <div class="small text-success mt-1 fw-bold">
        <span class="trend-badge up-strong">↑↑ +${fastest.ideDelta30d.toFixed(1)}%</span> em 30 dias
      </div>
    `;

    document.getElementById("kpiAnomaliesCount").innerHTML = `
      <div class="kpi-value text-amber">${ELECTION_DATA.anomalyRadar.length} Detectadas</div>
      <div class="small text-muted mt-1">1 Alerta Crítico nas últimas 24h</div>
    `;
  },

  renderCandidateRankingTable() {
    const tbody = document.getElementById("candidateRankingTableBody");
    if (!tbody) return;

    tbody.innerHTML = ELECTION_DATA.candidates.map(cand => `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-2">
            <div class="candidate-avatar" style="background-color: ${cand.color};">${cand.avatar}</div>
            <div>
              <div class="fw-bold text-white">${cand.name}</div>
              <div class="small text-muted">${cand.party} • Nº ${cand.number}</div>
            </div>
          </div>
        </td>
        <td><span class="h5 fw-bold mb-0 text-brand">${cand.ide.toFixed(1)}</span>/100</td>
        <td>
          <span class="trend-badge ${cand.trend === 'strong_up' ? 'up-strong' : (cand.trend === 'down' ? 'down' : 'up')}">
            ${cand.trendSymbol} ${cand.ideDelta30d >= 0 ? '+' : ''}${cand.ideDelta30d.toFixed(1)}%
          </span>
        </td>
        <td><span class="badge ${cand.trend === 'strong_up' ? 'bg-success' : 'bg-dark border border-secondary'}">${cand.trendLabel}</span></td>
        <td>
          <div class="small text-light">${cand.mentionsTotal.toLocaleString('pt-BR')}</div>
          <div class="small text-dim">${cand.shareOfVoice}</div>
        </td>
        <td><span class="badge ${cand.netSentiment >= 0 ? 'bg-success' : 'bg-danger'}">${cand.netSentiment >= 0 ? '+' : ''}${cand.netSentiment.toFixed(1)}%</span></td>
        <td>
          <button class="btn btn-sm btn-outline-info" onclick="App.focusCandidate('${cand.id}')">
            <i class="bi bi-graph-up me-1"></i> Analisar
          </button>
        </td>
      </tr>
    `).join("");
  },

  renderSubIndicesBreakdown() {
    const container = document.getElementById("subIndicesContainer");
    if (!container) return;

    container.innerHTML = ELECTION_DATA.candidates.map(cand => `
      <div class="col-md-6 col-lg-3">
        <div class="glass-card p-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-3 border-bottom border-secondary pb-2">
            <strong class="text-white">${cand.name}</strong>
            <span class="badge bg-dark border border-secondary text-brand">${cand.ide.toFixed(1)} IDE</span>
          </div>
          ${Object.entries(cand.subIndices).map(([key, val]) => `
            <div class="subindex-bar-wrapper">
              <div class="subindex-label"><span class="text-capitalize">${key}</span><strong>${val}</strong></div>
              <div class="subindex-bar"><div class="subindex-fill" style="width: ${val}%; background: ${cand.color};"></div></div>
            </div>
          `).join('')}
          <div class="small text-muted mt-2 border-top border-secondary pt-2 fst-italic">${cand.statusSummary}</div>
        </div>
      </div>
    `).join("");
  },

  renderAnomalyRadar(filterCandidate = "all", filterSeverity = "all") {
    const container = document.getElementById("anomalyRadarList");
    if (!container) return;

    let list = ELECTION_DATA.anomalyRadar;
    if (filterCandidate !== "all") list = list.filter(i => i.candidateId === filterCandidate || i.candidateId === "all");
    if (filterSeverity !== "all") list = list.filter(i => i.severity === filterSeverity);

    container.innerHTML = list.map(a => `
      <div class="anomaly-item border-${a.severityColor}">
        <div class="d-flex justify-content-between mb-2">
          <span class="badge bg-${a.severityColor}">${a.severityLabel} •${a.candidate}</span>
          <span class="small text-dim"><i class="bi bi-clock me-1"></i>${a.timeAgo}</span>
        </div>
        <h5 class="text-white">${a.title}</h5>
        <p class="text-muted small">${a.summary}</p>
        <div class="p-2 rounded bg-dark border border-secondary mb-2 small text-light">
          <i class="bi bi-lightning-charge-fill text-warning me-1"></i> <strong>Gatilho:</strong> ${a.metrics.triggerContent}
        </div>
        <div class="small text-muted p-2 rounded" style="background: rgba(255,255,255,0.03);">
          <strong class="text-brand">Diagnóstico IA:</strong> ${a.investigation}
        </div>
      </div>
    `).join("");
  },

  renderThemes() {
    const list = document.getElementById("themesListGroup");
    if (!list) return;
    list.innerHTML = ELECTION_DATA.themes.map(t => `
      <div class="d-flex justify-content-between align-items-center py-2 border-bottom border-secondary">
        <div><div class="fw-bold text-white">${t.name}</div><div class="small text-dim">${t.dominantCandidate}</div></div>
        <div class="text-end"><div class="badge bg-secondary">${t.volumeShare}</div><div class="small text-success">${t.trend}</div></div>
      </div>
    `).join("");
  },

  renderPollingTable() {
    const tbody = document.getElementById("pollingTableBody");
    if (!tbody) return;
    tbody.innerHTML = ELECTION_DATA.pollingComparison.leadLagAnalysis.series.map(row => `
      <tr>
        <td><strong>${row.date}</strong></td>
        <td><span class="badge bg-success">${row.ide}</span></td>
        <td><span class="badge bg-warning text-dark">${row.poll}</span></td>
        <td class="small text-muted">${row.note}</td>
      </tr>
    `).join("");
  },

  renderClassifierPresets() {
    const container = document.getElementById("classifierPresetsContainer");
    if (!container) return;
    container.innerHTML = ELECTION_DATA.classifierSamples.map((sample, idx) => `
      <button class="btn btn-sm btn-outline-secondary text-start mb-2 d-block w-100" onclick="App.runClassifierPreset(${idx})">
        <i class="bi bi-chat-left-quote text-brand me-1"></i> "${sample.text.substring(0, 60)}..."
      </button>
    `).join("");
  },

  runClassifierPreset(index) {
    const sample = ELECTION_DATA.classifierSamples[index];
    const input = document.getElementById("classifierInputText");
    if (input) input.value = sample.text;
    this.executeClassification(sample.text);
  },

  executeClassification(customText) {
    const text = customText || (document.getElementById("classifierInputText") ? document.getElementById("classifierInputText").value : "");
    if (!text || text.trim() === "") return;

    const result = AIClassifier.classifyText(text);
    const outputArea = document.getElementById("classifierOutputCard");
    if (!outputArea || !result) return;

    outputArea.innerHTML = `
      <div class="classifier-result-card">
        <div class="d-flex justify-content-between mb-3 border-bottom border-primary pb-2">
          <span class="ai-badge"><i class="bi bi-cpu-fill me-1"></i> Classificação via IA</span>
          <span class="small text-dim">${result.processedAt}</span>
        </div>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="small text-muted">Candidato</div>
            <div class="h5 fw-bold text-white mb-2">${result.candidate}</div>
            <div class="small text-muted">Tema</div>
            <div class="fw-semibold text-brand mb-2">${result.theme}</div>
            <div class="small text-muted">Tipo</div>
            <div class="fw-semibold text-light">${result.type}</div>
          </div>
          <div class="col-md-6">
            <div class="small text-muted">Sentimento</div>
            <div class="mb-2"><span class="badge ${result.badgeClass}">${result.sentiment} (${result.sentimentScore})</span></div>
            <div class="small text-muted">Intensidade</div>
            <div class="fw-semibold text-white mb-2">${result.intensity}</div>
            <div class="small text-muted">Probabilidade de Apoio</div>
            <div class="small text-warning fw-bold">${result.supportProbability}</div>
          </div>
        </div>
      </div>
    `;
  },

  renderPredictiveLayer() {
    const container = document.getElementById("predictiveCardsContainer");
    if (!container) return;
    container.innerHTML = ELECTION_DATA.predictiveInsights.projections.map(p => `
      <div class="col-md-6 col-lg-3">
        <div class="glass-card p-3 h-100">
          <div class="fw-bold text-white mb-1">${p.candidate}</div>
          <span class="badge bg-primary mb-2">${p.trendDirection}</span>
          <div class="small text-dim">Probabilidade de Alta: <strong class="text-brand">${p.growthProbability}</strong></div>
          <div class="small text-muted mt-2"><strong>Driver:</strong> ${p.keyDriver}</div>
        </div>
      </div>
    `).join("");
  },

  initCharts() {
    ChartsManager.initIdeTrendChart();
    ChartsManager.initRadarComparisonChart();
    ChartsManager.initLeadLagChart();
    ChartsManager.initThemesChart();
  },

  focusCandidate(candId) {
    const tabBtn = document.getElementById("pills-dashboard-tab");
    if (tabBtn) new bootstrap.Tab(tabBtn).show();
    const el = document.getElementById("chartsSection");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  },

  bindEvents() {
    const filterCand = document.getElementById("filterAnomalyCandidate");
    const filterSev = document.getElementById("filterAnomalySeverity");
    if (filterCand && filterSev) {
      const update = () => this.renderAnomalyRadar(filterCand.value, filterSev.value);
      filterCand.addEventListener("change", update);
      filterSev.addEventListener("change", update);
    }

    const btnClassify = document.getElementById("btnExecuteClassify");
    if (btnClassify) btnClassify.addEventListener("click", () => this.executeClassification());

    document.querySelectorAll('button[data-bs-toggle="pill"]').forEach(tabEl => {
      tabEl.addEventListener("shown.bs.tab", (e) => {
        const target = e.target.getAttribute("data-bs-target");
        if (target === "#pills-dashboard") {
          ChartsManager.initIdeTrendChart();
          ChartsManager.initRadarComparisonChart();
          ChartsManager.initThemesChart();
        } else if (target === "#pills-polling") {
          ChartsManager.initLeadLagChart();
        } else if (target === "#pills-report") {
          ReportGenerator.renderReport();
        }
      });
    });

    const btnUpdate = document.getElementById("btnUpdateReport");
    if (btnUpdate) {
      btnUpdate.addEventListener("click", () => {
        const instituteName = document.getElementById("inputReportInstitute").value;
        const period = document.getElementById("inputReportPeriod").value;
        ReportGenerator.renderReport({ instituteName, period });
      });
    }

    const btnPrint = document.getElementById("btnPrintReport");
    if (btnPrint) btnPrint.addEventListener("click", () => ReportGenerator.printReport());
  }
};

window.App = App;