const MethodologyLab = {
  renderMethodology() {
    const data = window.AppState.get();
    const w = data.metadata.weights;
    const container = document.getElementById("methodologyContainer");
    if (!container) return;

    container.innerHTML = `
      <div class="row g-4 fade-in">
        <div class="col-lg-6">
          <div class="glass-card p-4 h-100">
            <h5 class="card-title-custom mb-3 fs-6"><i class="bi bi-sliders2 text-brand"></i> Calibração de Pesos do IDE</h5>
            <p class="small text-muted mb-3">Ajuste os pesos percentuais de cada dimensão e recalcule todo o modelo instantaneamente.</p>

            ${[
              { id: 'Presenca', label: '1. Presença Digital', val: w.presenca },
              { id: 'Engajamento', label: '2. Engajamento', val: w.engajamento },
              { id: 'Repercussao', label: '3. Repercussão Espontânea', val: w.repercussao },
              { id: 'Mobilizacao', label: '4. Mobilização de Base', val: w.mobilizacao },
              { id: 'Sentimento', label: '5. Sentimento Qualitativo', val: w.sentimento },
              { id: 'Interesse', label: '6. Interesse / Buscas', val: w.interesse }
            ].map(item => `
              <div class="mb-3">
                <div class="d-flex justify-content-between small mb-1">
                  <span>${item.label}</span>
                  <span class="text-brand fw-bold" id="labelWeight${item.id}">${(item.val * 100).toFixed(0)}%</span>
                </div>
                <input type="range" class="form-range" id="rangeWeight${item.id}" min="5" max="40" step="5" value="${(item.val * 100).toFixed(0)}">
              </div>
            `).join('')}

            <div class="d-flex gap-2 mt-4">
              <button class="btn btn-primary btn-sm flex-grow-1" id="btnApplyWeights">
                <i class="bi bi-check2-circle me-1"></i> Aplicar Novos Pesos
              </button>
              <button class="btn btn-outline-secondary btn-sm" id="btnResetWeights">Padrão</button>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="glass-card p-4 h-100">
            <h5 class="card-title-custom mb-3 fs-6"><i class="bi bi-journal-code text-success"></i> Modelos Metodológicos Pré-Configurados</h5>
            <div class="list-group list-group-flush mb-3">
              <button class="list-group-item list-group-item-action bg-dark text-white border-secondary p-3 mb-2 rounded" onclick="MethodologyLab.applyPreset('balanced')">
                <div class="d-flex justify-content-between"><strong class="text-brand">1. Modelo Padrão Balanceado</strong><span class="badge bg-primary">Oficial</span></div>
                <div class="small text-muted mt-1">Presença (20%), Engajamento (20%), Repercussão (20%), Mobilização (15%), Sentimento (10%), Interesse (15%).</div>
              </button>
              <button class="list-group-item list-group-item-action bg-dark text-white border-secondary p-3 mb-2 rounded" onclick="MethodologyLab.applyPreset('viral')">
                <div class="d-flex justify-content-between"><strong class="text-success">2. Modelo de Tracionamento Orgânico</strong><span class="badge bg-success">Redes</span></div>
                <div class="small text-muted mt-1">Mobilização (30%), Engajamento (25%), Repercussão (15%), Sentimento (10%), Interesse (10%), Presença (10%).</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  },

  applyPreset(presetName) {
    if (presetName === 'balanced') {
      window.AppState.setWeights({ presenca: 0.20, engajamento: 0.20, repercussao: 0.20, mobilizacao: 0.15, sentimento: 0.10, interesse: 0.15 });
    } else if (presetName === 'viral') {
      window.AppState.setWeights({ presenca: 0.10, engajamento: 0.25, repercussao: 0.15, mobilizacao: 0.30, sentimento: 0.10, interesse: 0.10 });
    }
    this.renderMethodology();
  },

  bindEvents() {
    const ids = ["Presenca", "Engajamento", "Repercussao", "Mobilizacao", "Sentimento", "Interesse"];
    ids.forEach(name => {
      const range = document.getElementById(`rangeWeight${name}`);
      const label = document.getElementById(`labelWeight${name}`);
      if (range && label) range.addEventListener("input", (e) => label.textContent = `${e.target.value}%`);
    });

    const btnApply = document.getElementById("btnApplyWeights");
    if (btnApply) {
      btnApply.addEventListener("click", () => {
        const vP = parseInt(document.getElementById("rangeWeightPresenca").value) || 20;
        const vE = parseInt(document.getElementById("rangeWeightEngajamento").value) || 20;
        const vR = parseInt(document.getElementById("rangeWeightRepercussao").value) || 20;
        const vM = parseInt(document.getElementById("rangeWeightMobilizacao").value) || 15;
        const vS = parseInt(document.getElementById("rangeWeightSentimento").value) || 10;
        const vI = parseInt(document.getElementById("rangeWeightInteresse").value) || 15;

        const total = vP + vE + vR + vM + vS + vI;
        window.AppState.setWeights({
          presenca: vP / total, engajamento: vE / total, repercussao: vR / total,
          mobilizacao: vM / total, sentimento: vS / total, interesse: vI / total
        });
        alert("Pesos atualizados com sucesso!");
        this.renderMethodology();
      });
    }

    const btnReset = document.getElementById("btnResetWeights");
    if (btnReset) btnReset.addEventListener("click", () => this.applyPreset('balanced'));
  }
};

window.MethodologyLab = MethodologyLab;