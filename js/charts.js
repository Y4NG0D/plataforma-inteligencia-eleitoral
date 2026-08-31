const ChartsManager = {
  instances: {},

  setupDefaults() {
    if (typeof Chart === "undefined") return;
    Chart.defaults.color = "#94a3b8";
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.borderColor = "#334155";
  },

  initIdeTrendChart(canvasId = "chartIdeTrend") {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (this.instances[canvasId]) this.instances[canvasId].destroy();

    const datasets = ELECTION_DATA.candidates.map(cand => ({
      label: `${cand.name} (${cand.party})`,
      data: ELECTION_DATA.timeSeries.ideHistory[cand.id],
      borderColor: cand.color,
      backgroundColor: cand.color + "15",
      borderWidth: 2.5,
      tension: 0.35,
      pointRadius: 2,
      fill: false
    }));

    this.instances[canvasId] = new Chart(ctx, {
      type: "line",
      data: { labels: ELECTION_DATA.timeSeries.dates, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 40, max: 90, title: { display: true, text: "Índice de Dinâmica (0-100)" } }
        }
      }
    });
  },

  initRadarComparisonChart(canvasId = "chartSubindicesRadar") {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (this.instances[canvasId]) this.instances[canvasId].destroy();

    const labels = ["Presença", "Engajamento", "Repercussão", "Mobilização", "Sentimento", "Interesse"];
    const datasets = ELECTION_DATA.candidates.map(cand => ({
      label: cand.name,
      data: [
        cand.subIndices.presenca,
        cand.subIndices.engajamento,
        cand.subIndices.repercussao,
        cand.subIndices.mobilizacao,
        cand.subIndices.sentimento,
        cand.subIndices.interesse
      ],
      backgroundColor: cand.color + "25",
      borderColor: cand.color,
      pointBackgroundColor: cand.color,
      borderWidth: 2
    }));

    this.instances[canvasId] = new Chart(ctx, {
      type: "radar",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { r: { min: 30, max: 100 } }
      }
    });
  },

  initLeadLagChart(canvasId = "chartLeadLag") {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (this.instances[canvasId]) this.instances[canvasId].destroy();

    const series = ELECTION_DATA.pollingComparison.leadLagAnalysis.series;
    const labels = series.map(s => s.date);
    const ideData = series.map(s => s.ide);
    const pollData = series.map(s => parseFloat(s.poll.replace("%", "")));

    this.instances[canvasId] = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Índice Digital (IDE) - Gabriel Mendes",
            data: ideData,
            borderColor: "#10b981",
            yAxisID: "yDigital",
            borderWidth: 3,
            tension: 0.3
          },
          {
            label: "Intenção de Voto (%) - Média das Pesquisas",
            data: pollData,
            borderColor: "#f59e0b",
            yAxisID: "yPoll",
            borderWidth: 3,
            borderDash: [5, 5],
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yDigital: { type: "linear", position: "left", min: 50, max: 85, title: { display: true, text: "Índice Digital (IDE)", color: "#10b981" } },
          yPoll: { type: "linear", position: "right", min: 20, max: 45, title: { display: true, text: "Pesquisa (%)", color: "#f59e0b" }, grid: { drawOnChartArea: false } }
        }
      }
    });
  },

  initThemesChart(canvasId = "chartThemes") {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (this.instances[canvasId]) this.instances[canvasId].destroy();

    const labels = ELECTION_DATA.themes.map(t => t.name);
    const data = ELECTION_DATA.themes.map(t => parseFloat(t.volumeShare.replace("%", "")));

    this.instances[canvasId] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{ data, backgroundColor: ["#ef4444", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"] }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: { legend: { position: "right", labels: { font: { size: 10 } } } }
      }
    });
  }
};

window.ChartsManager = ChartsManager;