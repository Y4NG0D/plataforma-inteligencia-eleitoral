const WarRoom = {
  activeCrisis: {
    candidate: "Gabriel Mendes",
    title: "Crise de Polarização em Segurança Pública (+187% Menções / 68% Críticas)",
    startTime: "Hoje às 17:00 (Há 4 horas)",
    botnetScore: "12% tráfego inautêntico / 88% engajamento orgânico",
    triggerSource: "Corte de debate televisivo no TikTok e X",
    status: "Em Contenção Ativa"
  },

  renderWarRoom() {
    const container = document.getElementById("warRoomContainer");
    if (!container) return;

    container.innerHTML = `
      <div class="p-4 glass-card border-danger fade-in">
        <div class="d-flex flex-wrap justify-content-between align-items-center bg-danger bg-opacity-25 p-3 rounded border border-danger mb-4">
          <div class="d-flex align-items-center gap-3">
            <i class="bi bi-shield-slash-fill text-danger fs-1"></i>
            <div>
              <span class="badge bg-danger text-uppercase">Sala de Situação / War Room Ativa</span>
              <h4 class="text-white mb-0 mt-1">${this.activeCrisis.title}</h4>
              <div class="small text-light mt-1">Candidato: <strong>${this.activeCrisis.candidate}</strong> • Início: ${this.activeCrisis.startTime}</div>
            </div>
          </div>
          <span class="badge bg-dark border border-danger text-danger fs-6 px-3 py-2">Status: ${this.activeCrisis.status}</span>
        </div>

        <div class="row g-4 mb-4">
          <div class="col-md-6 col-lg-3">
            <div class="p-3 bg-dark-surface rounded border border-secondary h-100">
              <div class="d-flex align-items-center gap-2 mb-2"><span class="badge bg-primary">Fase 1</span><strong class="text-white">Origem & Rede</strong></div>
              <p class="small text-muted mb-2">Auditoria de autenticidade:</p>
              <div class="p-2 rounded bg-dark small text-light mb-2"><strong>Autenticidade:</strong> ${this.activeCrisis.botnetScore}</div>
              <div class="small text-dim"><strong>Vetor:</strong> ${this.activeCrisis.triggerSource}</div>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="p-3 bg-dark-surface rounded border border-secondary h-100">
              <div class="d-flex align-items-center gap-2 mb-2"><span class="badge bg-warning text-dark">Fase 2</span><strong class="text-white">Reenquadramento</strong></div>
              <p class="small text-muted mb-2">Contra-narrativa:</p>
              <div class="p-2 rounded bg-dark small text-light mb-2">"Destacar valorização policial e tecnologia forense."</div>
              <button class="btn btn-sm btn-outline-warning w-100" onclick="alert('Briefing de reenquadramento disparado para os canais!')"><i class="bi bi-megaphone me-1"></i> Disparar Briefing</button>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="p-3 bg-dark-surface rounded border border-secondary h-100">
              <div class="d-flex align-items-center gap-2 mb-2"><span class="badge bg-success">Fase 3</span><strong class="text-white">Mobilização</strong></div>
              <p class="small text-muted mb-2">Ativação da base:</p>
              <div class="p-2 rounded bg-dark small text-light mb-2">Envio do corte completo desmentindo edições da oposição.</div>
              <button class="btn btn-sm btn-outline-success w-100" onclick="alert('Vídeos de esclarecimento enviados para a militância!')"><i class="bi bi-share me-1"></i> Mobilizar Rede</button>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="p-3 bg-dark-surface rounded border border-secondary h-100">
              <div class="d-flex align-items-center gap-2 mb-2"><span class="badge bg-info text-dark">Fase 4</span><strong class="text-white">Reversão</strong></div>
              <p class="small text-muted mb-2">Efeito em 12h:</p>
              <div class="p-2 rounded bg-dark small text-light mb-2">Sentimento Negativo: <span class="text-danger fw-bold">68%</span> → <span class="text-warning fw-bold">48%</span> (Em queda)</div>
              <div class="small text-success fw-bold"><i class="bi bi-arrow-up-right me-1"></i> Buscas Google positivas em alta (+120%)</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
window.WarRoom = WarRoom;