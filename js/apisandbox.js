const ApiSandbox = {
  endpoints: [
    {
      id: "ep_ide", method: "GET", path: "/api/v1/elections/ide-ranking", title: "Ranking Geral de Dinâmica (IDE)",
      handler: () => {
        const data = window.AppState.get();
        return { status: "success", timestamp: new Date().toISOString(), ranking: data.candidates.map(c => ({ name: c.name, ide: c.ide, delta_30d: c.ideDelta30d, trend: c.trendLabel })) };
      }
    },
    {
      id: "ep_subindices", method: "GET", path: "/api/v1/candidates/subindices", title: "Decomposição dos 6 Sub-Índices",
      handler: () => ({ status: "success", candidates: window.AppState.get().candidates.map(c => ({ name: c.name, subindices: c.subIndices })) })
    },
    {
      id: "ep_anomalies", method: "GET", path: "/api/v1/radar/anomalies/active", title: "Radar de Anomalias Ativas",
      handler: () => ({ status: "success", total: window.AppState.get().anomalyRadar.length, anomalies: window.AppState.get().anomalyRadar })
    },
    {
      id: "ep_leadlag", method: "GET", path: "/api/v1/leadlag/correlation-curve", title: "Curva de Validação Empírica (Lead-Lag)",
      handler: () => ({ status: "success", analysis: LeadLagEngine.analyzeLags() })
    }
  ],

  renderApiSandbox() {
    const container = document.getElementById("apiSandboxContainer");
    if (!container) return;

    container.innerHTML = `
      <div class="row g-4 fade-in">
        <div class="col-lg-5">
          <div class="glass-card p-4 h-100">
            <h5 class="card-title-custom mb-3 fs-6"><i class="bi bi-code-slash text-brand"></i> Endpoints da API REST (v1)</h5>
            <div class="list-group list-group-flush mb-3">
              ${this.endpoints.map(ep => `
                <button class="list-group-item list-group-item-action bg-dark text-white border-secondary p-3 mb-2 rounded" onclick="ApiSandbox.testEndpoint('${ep.id}')">
                  <div class="d-flex align-items-center gap-2 mb-1">
                    <span class="badge bg-success font-monospace">${ep.method}</span>
                    <strong class="text-white font-monospace small">${ep.path}</strong>
                  </div>
                  <div class="small text-muted">${ep.title}</div>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="glass-card p-4 h-100">
            <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3">
              <span class="badge bg-primary text-uppercase" id="apiEndpointTitle">Resposta HTTP</span>
              <span class="badge bg-dark border border-secondary text-brand">HTTP 200 OK</span>
            </div>
            <pre class="bg-dark p-3 rounded border border-secondary text-success small mb-0" id="apiResponseOutput" style="height: 380px; overflow-y: auto; font-family: monospace;"></pre>
          </div>
        </div>
      </div>
    `;
    this.testEndpoint("ep_ide");
  },

  testEndpoint(endpointId) {
    const ep = this.endpoints.find(e => e.id === endpointId);
    if (!ep) return;
    const title = document.getElementById("apiEndpointTitle");
    const output = document.getElementById("apiResponseOutput");
    if (title) title.textContent = `${ep.method} ${ep.path}`;
    if (output) output.textContent = JSON.stringify(ep.handler(), null, 2);
  }
};
window.ApiSandbox = ApiSandbox;