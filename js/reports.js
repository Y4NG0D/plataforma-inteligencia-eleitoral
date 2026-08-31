const ReportGenerator = {
  renderReport(options = {}) {
    const instituteName = options.instituteName || "Instituto Nexus de Pesquisa e Inteligência";
    const reportPeriod = options.period || "24 a 30 de Agosto de 2026";
    const container = document.getElementById("reportOutputArea");
    if (!container) return;

    container.innerHTML = `
      <div class="report-paper">
        <div class="report-header d-flex justify-content-between align-items-center">
          <div>
            <span class="badge bg-primary text-uppercase px-2 py-1 mb-2">Documento Confidencial</span>
            <h2 class="mb-1">${instituteName}</h2>
            <h4 class="text-muted fw-normal">Relatório de Inteligência e Dinâmica Eleitoral</h4>
          </div>
          <div class="text-end">
            <div class="fw-bold">Eleição para Governador - 2026</div>
            <div class="small text-muted">Período: <strong>${reportPeriod}</strong></div>
          </div>
        </div>

        <section class="report-section">
          <h4 class="border-bottom pb-2 text-primary">1. Panorama Geral</h4>
          <p>Durante o período, foram processadas <strong>${ELECTION_DATA.metadata.totalSignalsProcessed}</strong> manifestações públicas. O ambiente digital registrou forte reconfiguração com avanço nas pautas de segurança pública e aceleração do Candidato B.</p>
        </section>

        <section class="report-section">
          <h4 class="border-bottom pb-2 text-primary">2. Ranking dos Candidatos (IDE)</h4>
          <table class="report-table">
            <thead>
              <tr><th>Candidato</th><th>Partido</th><th>IDE</th><th>Variação 30d</th><th>Tendência</th></tr>
            </thead>
            <tbody>
              ${ELECTION_DATA.candidates.map(c => `
                <tr>
                  <td><strong>${c.name}</strong></td>
                  <td>${c.party}</td>
                  <td>${c.ide.toFixed(1)}</td>
                  <td class="${c.ideDelta30d >= 0 ? 'text-success' : 'text-danger'}">${c.ideDelta30d >= 0 ? '+' : ''}${c.ideDelta30d.toFixed(1)}%</td>
                  <td>${c.trendLabel}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </section>

        <section class="report-section">
          <h4 class="border-bottom pb-2 text-primary">3. Evolução dos 6 Sub-Índices</h4>
          <table class="report-table">
            <thead>
              <tr><th>Candidato</th><th>Presença</th><th>Engajamento</th><th>Repercussão</th><th>Mobilização</th><th>Sentimento</th><th>Interesse</th></tr>
            </thead>
            <tbody>
              ${ELECTION_DATA.candidates.map(c => `
                <tr>
                  <td>${c.name}</td>
                  <td>${c.subIndices.presenca}</td>
                  <td>${c.subIndices.engajamento}</td>
                  <td>${c.subIndices.repercussao}</td>
                  <td>${c.subIndices.mobilizacao}</td>
                  <td>${c.subIndices.sentimento}</td>
                  <td>${c.subIndices.interesse}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </section>

        <section class="report-section">
          <h4 class="border-bottom pb-2 text-primary">4. Principais Narrativas e Temas</h4>
          <p>Segurança Pública consolidou-se como tema dominante (38.5% do volume), seguida por Saúde Pública (24.2%) e Economia (18.8%).</p>
        </section>

        <section class="report-section">
          <h4 class="border-bottom pb-2 text-primary">5. Sentimento</h4>
          <p>Clarice Silveira lidera em sentimento positivo líquido (+36.4%), enquanto Gabriel Mendes apresenta maior polarização (-15.2%), porém com elevado ganho em buscas espontâneas.</p>
        </section>

        <section class="report-section">
          <h4 class="border-bottom pb-2 text-primary">6. Conteúdos de Maior Repercussão</h4>
          <ul>
            ${ELECTION_DATA.topContent.map(c => `<li><strong>${c.title}</strong> (${c.platform}) - ${c.views} visualizações</li>`).join('')}
          </ul>
        </section>

        <section class="report-section">
          <h4 class="border-bottom pb-2 text-primary">7. Alterações Detectadas</h4>
          ${ELECTION_DATA.anomalyRadar.map(a => `
            <div class="p-2 border rounded bg-light mb-2">
              <strong>${a.title}</strong>: ${a.summary}
            </div>
          `).join('')}
        </section>

        <section class="report-section">
          <h4 class="border-bottom pb-2 text-primary">8. Comparação com Pesquisas (Lead-Lag)</h4>
          <p>Validação empírica demonstrou correlação r = 0.94 para Gabriel Mendes, com os sinais de aceleração digital antecipando em 8 a 10 dias as variações observadas nas pesquisas de opinião registradas.</p>
        </section>

        <section class="report-section">
          <h4 class="border-bottom pb-2 text-primary">9. Tendências</h4>
          <p class="small text-muted">${ELECTION_DATA.predictiveInsights.disclaimer}</p>
        </section>

        <section class="report-section">
          <h4 class="border-bottom pb-2 text-primary">10. Metodologia</h4>
          <p class="small text-muted">A plataforma processa dados públicos de redes, portais e buscas, transformando dados não estruturados via NLP calibrado em 6 indicadores compostos auditáveis.</p>
        </section>
      </div>
    `;
  },

  printReport() {
    window.print();
  }
};

window.ReportGenerator = ReportGenerator;