const MediaIntelligence = {
  pressOutlets: [
    {
      id: "portal_g1",
      name: "G1 / Grupo Globo",
      type: "Portal Nacional / Regional",
      totalArticles: 412,
      sentimentBalance: { cand_a: +12, cand_b: -8, cand_c: +18, cand_d: -4 },
      dominantFrame: "Propostas de Gestão e Debates Oficiais",
      topCandidateCovered: "Helena Prado (38%)"
    },
    {
      id: "portal_folha",
      name: "Folha de S.Paulo / UOL",
      type: "Jornal de Referência / Portal",
      totalArticles: 365,
      sentimentBalance: { cand_a: +6, cand_b: -15, cand_c: +22, cand_d: -10 },
      dominantFrame: "Economia, Segurança e Pesquisas de Opinião",
      topCandidateCovered: "Gabriel Mendes (35%)"
    },
    {
      id: "portal_estadao",
      name: "O Estado de S. Paulo",
      type: "Jornal de Referência",
      totalArticles: 290,
      sentimentBalance: { cand_a: +15, cand_b: -12, cand_c: +10, cand_d: -6 },
      dominantFrame: "Equilíbrio Fiscal e Propostas de Infraestrutura",
      topCandidateCovered: "Helena Prado (42%)"
    },
    {
      id: "portal_cnn",
      name: "CNN Brasil",
      type: "Emissora de Notícias / Digital",
      totalArticles: 245,
      sentimentBalance: { cand_a: +4, cand_b: +2, cand_c: +14, cand_d: -8 },
      dominantFrame: "Bastidores Políticos e Alianças Partidárias",
      topCandidateCovered: "Gabriel Mendes (39%)"
    },
    {
      id: "portal_jp",
      name: "Jovem Pan News",
      type: "Rede de Notícias / Rádio & Web",
      totalArticles: 280,
      sentimentBalance: { cand_a: -10, cand_b: +28, cand_c: -18, cand_d: -14 },
      dominantFrame: "Segurança Pública e Confronto Ideológico",
      topCandidateCovered: "Gabriel Mendes (56%)"
    }
  ],

  renderMediaHub() {
    const container = document.getElementById("mediaHubContainer");
    if (!container) return;
    const data = window.AppState.get();

    container.innerHTML = `
      <div class="row g-4 fade-in">
        <div class="col-lg-8">
          <div class="glass-card p-4 h-100">
            <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3">
              <div>
                <h4 class="text-white mb-1 fs-5"><i class="bi bi-newspaper text-warning me-2"></i>Radar da Cobertura de Imprensa & Portais</h4>
                <p class="small text-muted mb-0">Análise de enquadramento (framing) e saldo de favorabilidade nos principais veículos jornalísticos.</p>
              </div>
              <span class="badge bg-dark border border-secondary text-brand px-3 py-2">1.592 Artigos Monitorados</span>
            </div>

            <div class="table-responsive">
              <table class="table table-custom align-middle">
                <thead>
                  <tr>
                    <th>Veículo / Canal</th>
                    <th>Matérias</th>
                    <th>Enquadramento Dominante</th>
                    <th>Candidato Mais Pautado</th>
                    <th>Saldo Helena (UP)</th>
                    <th>Saldo Gabriel (FR)</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.pressOutlets.map(p => `
                    <tr>
                      <td>
                        <strong class="text-white">${p.name}</strong>
                        <div class="small text-dim">${p.type}</div>
                      </td>
                      <td><span class="badge bg-dark border border-secondary">${p.totalArticles}</span></td>
                      <td class="small text-light">${p.dominantFrame}</td>
                      <td><span class="badge bg-secondary">${p.topCandidateCovered}</span></td>
                      <td class="${p.sentimentBalance.cand_a >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}">
                        ${p.sentimentBalance.cand_a >= 0 ? '+' : ''}${p.sentimentBalance.cand_a}%
                      </td>
                      <td class="${p.sentimentBalance.cand_b >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}">
                        ${p.sentimentBalance.cand_b >= 0 ? '+' : ''}${p.sentimentBalance.cand_b}%
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="glass-card p-4 h-100">
            <h5 class="card-title-custom mb-3 fs-6"><i class="bi bi-broadcast-pin text-brand"></i> Share de Noticiabilidade</h5>
            <p class="small text-muted mb-3">Distribuição do espaço editorial espontâneo na imprensa formal:</p>

            ${data.candidates.map(cand => {
              const pressShare = cand.id === "cand_a" ? 38 : (cand.id === "cand_b" ? 36 : (cand.id === "cand_c" ? 16 : 10));
              return `
                <div class="mb-3">
                  <div class="d-flex justify-content-between small mb-1">
                    <span class="text-light fw-bold">${cand.name}</span>
                    <span class="text-brand fw-bold">${pressShare}% da pauta</span>
                  </div>
                  <div class="progress" style="height: 8px;">
                    <div class="progress-bar" style="width: ${pressShare}%; background-color: ${cand.color};"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }
};

window.MediaIntelligence = MediaIntelligence;