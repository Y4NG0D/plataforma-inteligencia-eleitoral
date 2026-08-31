const MediaIntelligence = {
  pressOutlets: [
    { name: "G1 / Grupo Globo", type: "Portal Nacional / Regional", totalArticles: 412, sentimentBalance: { cand_a: +12, cand_b: -8 }, dominantFrame: "Propostas e Debates Oficiais", topCandidateCovered: "Helena Prado (38%)" },
    { name: "Folha de S.Paulo / UOL", type: "Jornal de Referência", totalArticles: 365, sentimentBalance: { cand_a: +6, cand_b: -15 }, dominantFrame: "Economia e Pesquisas", topCandidateCovered: "Gabriel Mendes (35%)" },
    { name: "O Estado de S. Paulo", type: "Jornal de Referência", totalArticles: 290, sentimentBalance: { cand_a: +15, cand_b: -12 }, dominantFrame: "Equilíbrio Fiscal", topCandidateCovered: "Helena Prado (42%)" },
    { name: "CNN Brasil", type: "Emissora de Notícias", totalArticles: 245, sentimentBalance: { cand_a: +4, cand_b: +2 }, dominantFrame: "Bastidores Políticos", topCandidateCovered: "Gabriel Mendes (39%)" },
    { name: "Jovem Pan News", type: "Rede de Notícias / Rádio", totalArticles: 280, sentimentBalance: { cand_a: -10, cand_b: +28 }, dominantFrame: "Segurança Pública", topCandidateCovered: "Gabriel Mendes (56%)" }
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
                <h4 class="text-white mb-1 fs-5"><i class="bi bi-newspaper text-warning me-2"></i>Radar da Cobertura de Imprensa</h4>
                <p class="small text-muted mb-0">Análise de enquadramento (framing) e saldo de favorabilidade nos veículos jornalísticos.</p>
              </div>
              <span class="badge bg-dark border border-secondary text-brand px-3 py-2">1.592 Artigos</span>
            </div>

            <div class="table-responsive">
              <table class="table table-custom align-middle">
                <thead>
                  <tr>
                    <th>Veículo</th>
                    <th>Matérias</th>
                    <th>Enquadramento</th>
                    <th>Candidato Mais Pautado</th>
                    <th>Saldo Helena</th>
                    <th>Saldo Gabriel</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.pressOutlets.map(p => `
                    <tr>
                      <td><strong class="text-white">${p.name}</strong><div class="small text-dim">${p.type}</div></td>
                      <td><span class="badge bg-dark border border-secondary">${p.totalArticles}</span></td>
                      <td class="small text-light">${p.dominantFrame}</td>
                      <td><span class="badge bg-secondary">${p.topCandidateCovered}</span></td>
                      <td class="${p.sentimentBalance.cand_a >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}">${p.sentimentBalance.cand_a >= 0 ? '+' : ''}${p.sentimentBalance.cand_a}%</td>
                      <td class="${p.sentimentBalance.cand_b >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}">${p.sentimentBalance.cand_b >= 0 ? '+' : ''}${p.sentimentBalance.cand_b}%</td>
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