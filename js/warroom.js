const WarRoom = {
  activeCrisis {
    id crisis_01,
    candidate Gabriel Mendes,
    title Crise de Polarização em Segurança Pública (+187% Menções  68% Críticas),
    startTime Hoje às 1700 (Há 4 horas),
    severity danger,
    botnetScore 12% inautêntico  88% engajamento orgânico,
    triggerSource Corte de debate televisivo no TikTok e X,
    status Em Contenção Ativa
  },

  renderWarRoom() {
    const container = document.getElementById(warRoomContainer);
    if (!container) return;

    container.innerHTML = `
      div class=p-4 glass-card border-danger fade-in
        div class=d-flex flex-wrap justify-content-between align-items-center bg-danger bg-opacity-25 p-3 rounded border border-danger mb-4
          div class=d-flex align-items-center gap-3
            i class=bi bi-shield-slash-fill text-danger fs-1i
            div
              span class=badge bg-danger text-uppercaseSala de Situação  War Room Ativaspan
              h4 class=text-white mb-0 mt-1${this.activeCrisis.title}h4
              div class=small text-light mt-1Candidato strong${this.activeCrisis.candidate}strong • Início ${this.activeCrisis.startTime}div
            div
          div
          span class=badge bg-dark border border-danger text-danger fs-6 px-3 py-2Status ${this.activeCrisis.status}span
        div

        div class=row g-4 mb-4
          div class=col-md-6 col-lg-3
            div class=p-3 bg-dark-surface rounded border border-secondary h-100
              div class=d-flex align-items-center gap-2 mb-2span class=badge bg-primaryFase 1spanstrong class=text-whiteOrigem & Redestrongdiv
              p class=small text-muted mb-2Auditoria de autenticidade e dispersãop
              div class=p-2 rounded bg-dark small text-light mb-2strongAutenticidadestrong ${this.activeCrisis.botnetScore}div
              div class=small text-dimstrongVetorstrong ${this.activeCrisis.triggerSource}div
            div
          div

          div class=col-md-6 col-lg-3
            div class=p-3 bg-dark-surface rounded border border-secondary h-100
              div class=d-flex align-items-center gap-2 mb-2span class=badge bg-warning text-darkFase 2spanstrong class=text-whiteReenquadramentostrongdiv
              p class=small text-muted mb-2Alinhamento da contra-narrativap
              div class=p-2 rounded bg-dark small text-light mb-2Destacar valorização policial e tecnologia forense.div
              button class=btn btn-sm btn-outline-warning w-100 onclick=alert('Briefing de reenquadramento disparado para os canais!')i class=bi bi-megaphone me-1i Disparar Briefingbutton
            div
          div

          div class=col-md-6 col-lg-3
            div class=p-3 bg-dark-surface rounded border border-secondary h-100
              div class=d-flex align-items-center gap-2 mb-2span class=badge bg-successFase 3spanstrong class=text-whiteMobilizaçãostrongdiv
              p class=small text-muted mb-2Ativação dos grupos de apoiop
              div class=p-2 rounded bg-dark small text-light mb-2Envio do corte completo desmentindo edições da oposição.div
              button class=btn btn-sm btn-outline-success w-100 onclick=alert('Pacote de cards e vídeos de esclarecimento enviado para a militância!')i class=bi bi-share me-1i Mobilizar Redebutton
            div
          div

          div class=col-md-6 col-lg-3
            div class=p-3 bg-dark-surface rounded border border-secondary h-100
              div class=d-flex align-items-center gap-2 mb-2span class=badge bg-info text-darkFase 4spanstrong class=text-whiteReversãostrongdiv
              p class=small text-muted mb-2Efeito nas 12h seguintesp
              div class=p-2 rounded bg-dark small text-light mb-2Sentimento Negativo span class=text-danger fw-bold68%span → span class=text-warning fw-bold48%span (Em queda)div
              div class=small text-success fw-boldi class=bi bi-arrow-up-right me-1i Buscas Google positivas em alta (+120%)div
            div
          div
        div
      div
    `;
  }
};

window.WarRoom = WarRoom;