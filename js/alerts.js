const AlertCenter = {
  rules: [
    { id: "rule_1", name: "Sentinela de Crise de Sentimento", candidate: "Gabriel Mendes", condition: "Sentimento Negativo > 60% em janela de 12h", severity: "danger", severityLabel: "Crítico", active: true, lastTriggered: "Hoje às 17:30" },
    { id: "rule_2", name: "Sentinela de Desaceleração", candidate: "Helena Prado", condition: "Repercussão cair mais de 25% em 7 dias", severity: "warning", severityLabel: "Atenção", active: true, lastTriggered: "Ontem às 10:15" },
    { id: "rule_3", name: "Sentinela de Viralização Juvenil", candidate: "Clarice Silveira", condition: "Compartilhamentos no Instagram subirem > 40%", severity: "success", severityLabel: "Oportunidade", active: true, lastTriggered: "Há 2 dias" }
  ],

  renderAlertsPanel() {
    const container = document.getElementById("alertsPanelContainer");
    if (!container) return;

    container.innerHTML = `
      <div class="row g-4 fade-in">
        <div class="col-lg-7">
          <div class="glass-card p-4 h-100">
            <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3">
              <div>
                <h5 class="card-title-custom fs-6 text-white mb-0"><i class="bi bi-bell-fill text-brand me-1"></i> Sentinelas Estatísticos Ativos</h5>
                <p class="small text-muted mb-0 mt-1">Regras configuradas para notificar a coordenação de campanha.</p>
              </div>
              <button class="btn btn-sm btn-primary" onclick="AlertCenter.openAddRuleModal()"><i class="bi bi-plus-circle me-1"></i> Nova Regra</button>
            </div>

            <div class="list-group list-group-flush">
              ${this.rules.map(r => `
                <div class="list-group-item bg-dark text-white border-secondary p-3 mb-2 rounded">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span class="badge bg-${r.severity} me-2">${r.severityLabel}</span>
                      <strong class="text-white">${r.name}</strong>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" ${r.active ? 'checked' : ''} onchange="AlertCenter.toggleRule('${r.id}')">
                    </div>
                  </div>
                  <div class="small text-brand mb-1"><i class="bi bi-cpu me-1"></i> ${r.condition} (${r.candidate})</div>
                  <div class="small text-dim"><i class="bi bi-clock-history me-1"></i> Último acionamento: ${r.lastTriggered}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="glass-card p-4 h-100">
            <h5 class="card-title-custom mb-3 fs-6"><i class="bi bi-broadcast text-danger"></i> Log de Disparos Recentes</h5>
            <div class="p-3 bg-dark-surface rounded border border-danger mb-2">
              <div class="d-flex justify-content-between small text-danger fw-bold mb-1"><span>[ALERTA CRÍTICO] Gabriel Mendes</span><span>Há 4h</span></div>
              <p class="small text-light mb-1">Gatilho: Sentimento negativo atingiu 68% após debate.</p>
              <button class="btn btn-sm btn-outline-danger py-0 px-2" onclick="App.openWarRoom('anom_01')"><i class="bi bi-shield-exclamation me-1"></i> Abrir Sala de Crise</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  toggleRule(id) {
    const r = this.rules.find(x => x.id === id);
    if (r) { r.active = !r.active; this.renderAlertsPanel(); }
  },
  openAddRuleModal() {
    const name = prompt("Nome da sentinela:", "Sentinela de Buscas");
    if (!name) return;
    const cond = prompt("Condição:", "Buscas Google > 50% em 24h");
    if (!cond) return;
    this.rules.push({ id: `rule_${Date.now()}`, name, candidate: "Gabriel Mendes", condition: cond, severity: "warning", severityLabel: "Personalizado", active: true, lastTriggered: "Criado agora" });
    this.renderAlertsPanel();
  }
};
window.AlertCenter = AlertCenter;