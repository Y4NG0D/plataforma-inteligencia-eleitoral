document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadElectoralData();

  setupNavigation();
  initDashboardView(data);
  initPollsView(data);
  initDuelView(data);
  initThemesView(data);
  initReportView(data);

  renderDynamicsTrendChart(data.timeline30d, data.candidates);
});

function setupNavigation() {
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const sections = document.querySelectorAll('.view-section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      sections.forEach(sec => sec.id === targetId ? sec.classList.remove('d-none') : sec.classList.add('d-none'));

      const currentData = getData();
      if (targetId === 'view-dashboard') setTimeout(() => renderDynamicsTrendChart(currentData.timeline30d, currentData.candidates), 50);
      if (targetId === 'view-polls') setTimeout(() => renderPollComparisonChart(currentData.digitalVsPolls), 50);
      if (targetId === 'view-duel') updateDuelComparison();
      if (targetId === 'view-themes') setTimeout(() => { renderThemesVolumeChart(currentData.themes); renderThemesSentimentChart(currentData.themes); }, 50);
      if (targetId === 'view-relatorio') renderExecutiveReportContent(currentData);
    });
  });
}

function initDashboardView(data) {
  const tbody = document.getElementById('rankingTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const sorted = [...data.candidates].sort((a, b) => b.ideScore - a.ideScore);
  sorted.forEach((cand, idx) => {
    const tr = document.createElement('tr');
    let badge = cand.trend === 'rapid_up' ? 
      `<span class="badge badge-trend-rapid-up px-2 py-1">↑↑ +${cand.change30d}%</span>` : 
      (cand.trend === 'up' ? `<span class="badge badge-trend-up px-2 py-1">↑ +${cand.change30d}%</span>` : `<span class="badge badge-trend-down px-2 py-1">↓ ${cand.change30d}%</span>`);

    tr.innerHTML = `
      <td class="fw-bold text-muted">${idx + 1}º</td>
      <td>
        <div class="candidate-tag">
          <span class="candidate-color-dot" style="background-color: ${cand.color}"></span>
          <div><div class="fw-bold text-dark">${cand.name}</div><small class="text-muted">${cand.party}</small></div>
        </div>
      </td>
      <td class="fw-bolder fs-5 text-dark">${cand.ideScore.toFixed(1)}</td>
      <td>${badge}</td>
      <td class="small text-secondary">${cand.acceleration}</td>
    `;
    tbody.appendChild(tr);
  });

  const radarEl = document.getElementById('radarAlertsContainer');
  if (radarEl) {
    radarEl.innerHTML = '';
    data.radarAlerts.forEach(alert => {
      const card = document.createElement('div');
      card.className = `alert-card alert-${alert.severity}-custom shadow-sm`;
      card.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="badge bg-danger">${alert.badge}</span>
          <small class="text-muted">${alert.timestamp}</small>
        </div>
        <div class="fw-bold text-dark mb-1">${alert.title}</div>
        <p class="small text-secondary mb-2">${alert.summary}</p>
        <div class="d-flex flex-wrap gap-2">
          <span class="badge bg-light text-dark border">Pico: <strong>${alert.metrics.spikePercent}</strong></span>
          <span class="badge bg-light text-dark border">Pauta: <strong>${alert.metrics.leadTopic}</strong></span>
          <span class="badge bg-light text-dark border">Críticas: <strong>${alert.metrics.negativeRatio}</strong></span>
        </div>
      `;
      radarEl.appendChild(card);
    });
  }
}

function initPollsView(data) {
  const tbody = document.getElementById('pollsTableBody');
  if (tbody) {
    tbody.innerHTML = '';
    data.digitalVsPolls.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="fw-semibold">${r.date}</td>
        <td class="fw-bold text-primary">${r.candA_digital}</td>
        <td class="text-primary">${r.candA_poll}%</td>
        <td class="fw-bold text-danger">${r.candB_digital}</td>
        <td class="text-danger">${r.candB_poll}%</td>
        <td class="small text-muted">${r.event}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  const insightEl = document.getElementById('leadLagInsightText');
  if (insightEl) {
    insightEl.innerHTML = `
      <div class="d-flex gap-3 mb-2">
        <span class="badge bg-success fs-6">Antecipação Média: ${data.leadLagAnalysis.averageLeadDays} dias</span>
        <span class="badge bg-dark fs-6">Correlação Temporal (R): ${data.leadLagAnalysis.correlationScore}</span>
      </div>
      <p class="small text-secondary mb-0">${data.leadLagAnalysis.insight}</p>
    `;
  }
}

function initDuelView(data) {
  const s1 = document.getElementById('selectDuelCandidate1');
  const s2 = document.getElementById('selectDuelCandidate2');
  if (!s1 || !s2) return;
  s1.innerHTML = ''; s2.innerHTML = '';
  data.candidates.forEach((c, idx) => {
    s1.add(new Option(c.name, c.id, false, idx === 0));
    s2.add(new Option(c.name, c.id, false, idx === 1));
  });
  s1.addEventListener('change', updateDuelComparison);
  s2.addEventListener('change', updateDuelComparison);
}

function updateDuelComparison() {
  const data = getData();
  const c1 = data.candidates.find(c => c.id === document.getElementById('selectDuelCandidate1').value) || data.candidates[0];
  const c2 = data.candidates.find(c => c.id === document.getElementById('selectDuelCandidate2').value) || data.candidates;

  renderDuelRadarChart(c1, c2);

  document.getElementById('duelCardCandidate1').innerHTML = `
    <div class="p-3 border rounded" style="border-top: 4px solid ${c1.color} !important;">
      <h5 class="fw-bold mb-1">${c1.name}</h5>
      <div class="display-6 fw-bold">${c1.ideScore.toFixed(1)}</div>
      <div class="small text-muted">${c1.acceleration}</div>
    </div>
  `;
  document.getElementById('duelCardCandidate2').innerHTML = `
    <div class="p-3 border rounded" style="border-top: 4px solid ${c2.color} !important;">
      <h5 class="fw-bold mb-1">${c2.name}</h5>
      <div class="display-6 fw-bold">${c2.ideScore.toFixed(1)}</div>
      <div class="small text-muted">${c2.acceleration}</div>
    </div>
  `;

  const tbody = document.getElementById('duelMetricsTableBody');
  if (tbody) {
    tbody.innerHTML = '';
    const metrics = [
      ['presenca', '1. Presença Digital'],
      ['engajamento', '2. Engajamento'],
      ['repercussao', '3. Repercussão'],
      ['mobilizacao', '4. Mobilização'],
      ['sentimento', '5. Sentimento'],
      ['interesse', '6. Interesse de Busca']
    ];
    metrics.forEach(([k, label]) => {
      const v1 = c1.subindices[k];
      const v2 = c2.subindices[k];
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="fw-semibold">${label}</td>
        <td class="text-center fw-bold ${v1 >= v2 ? 'text-primary' : 'text-muted'}">${v1}</td>
        <td class="text-center fw-bold ${v2 >= v1 ? 'text-danger' : 'text-muted'}">${v2}</td>
        <td class="text-center"><span class="badge ${v1 > v2 ? 'bg-primary' : 'bg-danger'}">${v1 > v2 ? c1.name : c2.name}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }
}

function initThemesView(data) {
  const tbody = document.getElementById('themesTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  data.themes.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${t.name}</strong><div class="small text-muted">${t.tone}</div></td>
      <td><span class="badge bg-secondary">${t.volumeShare}%</span> <span class="badge bg-success-subtle text-success">${t.growth}</span></td>
      <td class="fw-semibold text-primary">${t.dominantCandidate}</td>
      <td>
        <div class="small mb-1">${t.sentiment.positive}% pos / ${t.sentiment.negative}% neg</div>
        <div class="progress custom-progress">
          <div class="progress-bar bg-success" style="width: ${t.sentiment.positive}%"></div>
          <div class="progress-bar bg-secondary" style="width: ${t.sentiment.neutral}%"></div>
          <div class="progress-bar bg-danger" style="width: ${t.sentiment.negative}%"></div>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function initReportView(data) {
  document.getElementById('btnPrintReport')?.addEventListener('click', () => window.print());
  const input = document.getElementById('inputInstituteName');
  if (input) {
    input.value = data.meta.instituteName;
    input.addEventListener('input', (e) => {
      document.querySelectorAll('.report-institute-name').forEach(el => el.textContent = e.target.value);
    });
  }
}

function renderExecutiveReportContent(data) {
  const el = document.getElementById('reportDynamicContent');
  if (!el) return;
  el.innerHTML = `
    <div class="card p-4 shadow-sm border-0 mb-4 bg-white">
      <div class="d-flex justify-content-between border-bottom pb-3 mb-3">
        <div>
          <span class="badge bg-dark mb-1">RELATÓRIO DE INTELIGÊNCIA ELEITORAL</span>
          <h3 class="fw-bold text-dark report-institute-name">${data.meta.instituteName}</h3>
          <small class="text-muted">${data.meta.election} • Período: 30 dias</small>
        </div>
        <div class="text-end">
          <small class="text-muted d-block">Emissão</small>
          <strong>${new Date(data.meta.updatedAt).toLocaleDateString('pt-BR')}</strong>
        </div>
      </div>
      <h5 class="fw-bold border-bottom pb-1">1. Panorama e Diagnóstico de Aceleração</h5>
      <p class="small text-secondary">
        O Candidato A mantém o maior índice nominal (81,4), porém o Candidato B registrou crescimento de +18% nos últimos 30 dias, sinalizando aceleração e atração de pauta em Segurança Pública.
      </p>
      <h5 class="fw-bold border-bottom pb-1 mt-3">2. Validação Empírica contra Pesquisas</h5>
      <p class="small text-secondary">
        A série temporal confirmou correlação de R=0.89 com antecipação média de 9,2 dias em relação à manifestação do voto em pesquisas presenciais/telefônicas.
      </p>
    </div>
  `;
}