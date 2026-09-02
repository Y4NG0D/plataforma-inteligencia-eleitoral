let dynamicsChartInstance = null;
let pollsChartInstance = null;
let duelRadarChartInstance = null;
let themesVolumeChartInstance = null;
let themesSentimentChartInstance = null;

function renderDynamicsTrendChart(timelineData, candidates) {
  const ctx = document.getElementById('chartDynamicsTrend');
  if (!ctx) return;
  if (dynamicsChartInstance) dynamicsChartInstance.destroy();

  const datasets = candidates.map(cand => ({
    label: `${cand.name} (${cand.party})`,
    data: timelineData[cand.id] || [],
    borderColor: cand.color,
    borderWidth: cand.id === 'cand_b' ? 3.5 : 2,
    tension: 0.35,
    fill: false
  }));

  dynamicsChartInstance = new Chart(ctx, {
    type: 'line',
    data: { labels: timelineData.dates, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { min: 40, max: 90, title: { display: true, text: 'Índice de Dinâmica Eleitoral (0-100)' } }
      }
    }
  });
}

function renderPollComparisonChart(comparisonData) {
  const ctx = document.getElementById('chartDigitalVsPolls');
  if (!ctx) return;
  if (pollsChartInstance) pollsChartInstance.destroy();

  pollsChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: comparisonData.map(i => i.date),
      datasets: [
        {
          label: 'Cand. B - Índice Digital (IDE)',
          data: comparisonData.map(i => i.candB_digital),
          borderColor: '#ea580c',
          yAxisID: 'yDigital',
          borderWidth: 3
        },
        {
          label: 'Cand. B - Pesquisa (% Intenção)',
          data: comparisonData.map(i => i.candB_poll),
          borderColor: '#c2410c',
          borderDash: [5, 5],
          pointRadius: 6,
          yAxisID: 'yPoll',
          borderWidth: 2.5
        },
        {
          label: 'Cand. A - Índice Digital (IDE)',
          data: comparisonData.map(i => i.candA_digital),
          borderColor: '#1d4ed8',
          yAxisID: 'yDigital',
          borderWidth: 2
        },
        {
          label: 'Cand. A - Pesquisa (% Intenção)',
          data: comparisonData.map(i => i.candA_poll),
          borderColor: '#1e40af',
          borderDash: [5, 5],
          pointRadius: 6,
          yAxisID: 'yPoll',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yDigital: { type: 'linear', position: 'left', min: 50, max: 95, title: { display: true, text: 'Índice Digital (0-100)' } },
        yPoll: { type: 'linear', position: 'right', min: 20, max: 50, title: { display: true, text: 'Pesquisas Amostrais (%)' }, grid: { drawOnChartArea: false } }
      }
    }
  });
}

function renderDuelRadarChart(cand1, cand2) {
  const ctx = document.getElementById('chartDuelRadar');
  if (!ctx) return;
  if (duelRadarChartInstance) duelRadarChartInstance.destroy();

  const labels = ['Presença', 'Engajamento', 'Repercussão', 'Mobilização', 'Sentimento', 'Interesse (Buscas)'];
  const getSub = c => [c.subindices.presenca, c.subindices.engajamento, c.subindices.repercussao, c.subindices.mobilizacao, c.subindices.sentimento, c.subindices.interesse];

  duelRadarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [
        { label: cand1.name, data: getSub(cand1), borderColor: cand1.color, backgroundColor: cand1.color + '26' },
        { label: cand2.name, data: getSub(cand2), borderColor: cand2.color, backgroundColor: cand2.color + '26' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { r: { suggestedMin: 30, suggestedMax: 100 } }
    }
  });
}

function renderThemesVolumeChart(themes) {
  const ctx = document.getElementById('chartThemesVolume');
  if (!ctx) return;
  if (themesVolumeChartInstance) themesVolumeChartInstance.destroy();

  themesVolumeChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: themes.map(t => t.name),
      datasets: [{ label: '% Share', data: themes.map(t => t.volumeShare), backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#8b5cf6'], borderRadius: 6 }]
    },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
  });
}

function renderThemesSentimentChart(themes) {
  const ctx = document.getElementById('chartThemesSentiment');
  if (!ctx) return;
  if (themesSentimentChartInstance) themesSentimentChartInstance.destroy();

  themesSentimentChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: themes.map(t => t.name),
      datasets: [
        { label: 'Positivo', data: themes.map(t => t.sentiment.positive), backgroundColor: '#10b981' },
        { label: 'Neutro', data: themes.map(t => t.sentiment.neutral), backgroundColor: '#94a3b8' },
        { label: 'Crítico', data: themes.map(t => t.sentiment.negative), backgroundColor: '#ef4444' }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true, max: 100 } } }
  });
}