const RunoffSimulator = {
  params: { finalist1: "cand_a", finalist2: "cand_b", transferCto1: 55, transferDto1: 40 },

  renderRunoffSimulator() {
    const container = document.getElementById("runoffSimulatorContainer");
    if (!container) return;
    const data = window.AppState.get();
    const c1 = data.candidates.find(c => c.id === this.params.finalist1) || data.candidates[0];
    const c2 = data.candidates.find(c => c.id === this.params.finalist2) || data.candidates;

    const raw1 = 38.0 + (16.0 * (this.params.transferCto1 / 100)) + (10.0 * (this.params.transferDto1 / 100));
    const raw2 = 36.0 + (16.0 * ((100 - this.params.transferCto1) / 100)) + (10.0 * ((100 - this.params.transferDto1) / 100));
    const valid1 = ((raw1 / (raw1 + raw2)) * 100).toFixed(1);
    const valid2 = ((raw2 / (raw1 + raw2)) * 100).toFixed(1);

    container.innerHTML = `
      <div class="row g-4 fade-in">
        <div class="col-lg-6">
          <div class="glass-card p-4 h-100">
            <h5 class="card-title-custom mb-3 fs-6"><i class="bi bi-shuffle text-brand"></i> Matriz de Migração de Votos</h5>
            <div class="row g-2 mb-3">
              <div class="col-6">
                <label class="small text-muted">Finalista 1:</label>
                <select id="selectRunoffF1" class="form-select form-select-sm bg-dark text-white border-secondary" onchange="RunoffSimulator.updateFinalists()">
                  ${data.candidates.map(c => `<option value="${c.id}" ${c.id === c1.id ? 'selected' : ''}>${c.name}</option>`).join('')}
                </select>
              </div>
              <div class="col-6">
                <label class="small text-muted">Finalista 2:</label>
                <select id="selectRunoffF2" class="form-select form-select-sm bg-dark text-white border-secondary" onchange="RunoffSimulator.updateFinalists()">
                  ${data.candidates.map(c => `<option value="${c.id}" ${c.id === c2.id ? 'selected' : ''}>${c.name}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="p-3 bg-dark-surface rounded border border-secondary mb-3">
              <div class="d-flex justify-content-between small mb-1">
                <span class="text-white fw-bold">Eleitores de Clarice Silveira (AD):</span>
                <span class="text-brand fw-bold">${this.params.transferCto1}\% para${c1.name}</span>
              </div>
              <input type="range" class="form-range" id="rangeTransferC" min="10" max="90" step="5" value="${this.params.transferCto1}" oninput="RunoffSimulator.updateSliders()">
            </div>

            <div class="p-3 bg-dark-surface rounded border border-secondary">
              <div class="d-flex justify-content-between small mb-1">
                <span class="text-white fw-bold">Eleitores de Rodrigo Tavares (MC):</span>
                <span class="text-brand fw-bold">${this.params.transferDto1}\% para${c1.name}</span>
              </div>
              <input type="range" class="form-range" id="rangeTransferD" min="10" max="90" step="5" value="${this.params.transferDto1}" oninput="RunoffSimulator.updateSliders()">
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="glass-card p-4 h-100 text-center d-flex flex-column justify-content-between">
            <div>
              <span class="badge bg-primary text-uppercase px-3 py-1 mb-2">Projeção de Votos Válidos</span>
              <h4 class="text-white mb-3">Segundo Turno Simulado</h4>
              <div class="p-4 bg-dark-surface rounded border border-secondary mb-3">
                <div class="row">
                  <div class="col-6 border-end border-secondary">
                    <div class="candidate-avatar mx-auto mb-2" style="background-color: ${c1.color}; width: 42px; height: 42px;">${c1.avatar}</div>
                    <div class="fw-bold text-white">${c1.name}</div>
                    <div class="h2 fw-bold mt-2" style="color: ${c1.color}">${valid1}%</div>
                  </div>
                  <div class="col-6">
                    <div class="candidate-avatar mx-auto mb-2" style="background-color: ${c2.color}; width: 42px; height: 42px;">${c2.avatar}</div>
                    <div class="fw-bold text-white">${c2.name}</div>
                    <div class="h2 fw-bold mt-2" style="color: ${c2.color}">${valid2}%</div>
                  </div>
                </div>
                <div class="progress mt-3" style="height: 14px;">
                  <div class="progress-bar" style="width: ${valid1}\%; background-color:${c1.color};"></div>
                  <div class="progress-bar" style="width: ${valid2}\%; background-color:${c2.color};"></div>
                </div>
              </div>
            </div>
            <div class="p-3 bg-dark rounded border border-success text-start">
              <strong class="text-success"><i class="bi bi-trophy-fill me-1"></i> Vencedor Estimado:</strong>
              <span class="text-white">${parseFloat(valid1) > parseFloat(valid2) ? c1.name : c2.name}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  updateSliders() {
    this.params.transferCto1 = parseInt(document.getElementById("rangeTransferC").value);
    this.params.transferDto1 = parseInt(document.getElementById("rangeTransferD").value);
    this.renderRunoffSimulator();
  },
  updateFinalists() {
    const f1 = document.getElementById("selectRunoffF1").value;
    const f2 = document.getElementById("selectRunoffF2").value;
    if (f1 === f2) { alert("Escolha dois candidatos diferentes."); return; }
    this.params.finalist1 = f1;
    this.params.finalist2 = f2;
    this.renderRunoffSimulator();
  }
};
window.RunoffSimulator = RunoffSimulator;