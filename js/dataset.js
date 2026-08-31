const DatasetManager = {
  renderDatasetHub() {
    const container = document.getElementById("datasetHubContainer");
    if (!container) return;
    const data = window.AppState.get();
    const jsonPreview = JSON.stringify(data, null, 2).substring(0, 700) + "\n  ... [dados completos]";

    container.innerHTML = `
      <div class="row g-4 fade-in">
        <div class="col-lg-6">
          <div class="glass-card p-4 h-100">
            <h5 class="card-title-custom mb-3 fs-6"><i class="bi bi-cloud-arrow-down-fill text-brand"></i> Exportação do Dataset</h5>
            <p class="small text-muted mb-3">Baixe a base completa com séries de 30 dias, 6 sub-índices e pesquisas registradas.</p>
            <div class="d-flex flex-wrap gap-2 mb-4">
              <button class="btn btn-primary btn-sm" onclick="DatasetManager.exportFullJSON()"><i class="bi bi-file-earmark-code me-1"></i> Base Completa (JSON)</button>
              <button class="btn btn-outline-info btn-sm" onclick="DatasetManager.exportTimeSeriesCSV()"><i class="bi bi-filetype-csv me-1"></i> Séries Temporais (CSV)</button>
              <button class="btn btn-outline-warning btn-sm" onclick="DatasetManager.exportPollsCSV()"><i class="bi bi-table me-1"></i> Pesquisas (CSV)</button>
            </div>
            <pre class="bg-dark p-3 rounded border border-secondary text-success small mb-0" style="max-height: 220px; overflow-y: auto;">${jsonPreview}</pre>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="glass-card p-4 h-100">
            <h5 class="card-title-custom mb-3 fs-6"><i class="bi bi-cloud-arrow-up-fill text-success"></i> Importação de Cenários</h5>
            <p class="small text-muted mb-3">Carregue um arquivo JSON ou cole dados para testar outros pleitos.</p>
            <input type="file" id="inputDatasetFile" class="form-control form-control-sm bg-dark text-white border-secondary mb-3" accept=".json" onchange="DatasetManager.handleFileUpload(event)">
            <textarea id="textareaDatasetInput" class="form-control bg-dark text-white border-secondary small mb-3" rows="4" placeholder='Cole o JSON da eleição aqui...'></textarea>
            <div class="d-flex justify-content-between">
              <button class="btn btn-success btn-sm" onclick="DatasetManager.importFromTextarea()"><i class="bi bi-check2-circle me-1"></i> Aplicar Dataset</button>
              <button class="btn btn-outline-danger btn-sm" onclick="DatasetManager.resetToFactory()"><i class="bi bi-arrow-counterclockwise me-1"></i> Restaurar Original</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  exportFullJSON() {
    const a = document.createElement("a");
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.AppState.get(), null, 2));
    a.download = `dataset_eleitoral_${Date.now()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
  },
  exportTimeSeriesCSV() {
    const data = window.AppState.get();
    let csv = "Data," + data.candidates.map(c => `"${c.name} (IDE)"`).join(",") + "\n";
    data.timeSeries.dates.forEach((d, idx) => {
      csv += `"${d}",` + data.candidates.map(c => data.timeSeries.ideHistory[c.id][idx]).join(",") + "\n";
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    a.download = `series_temporais_30d_${Date.now()}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
  },
  exportPollsCSV() {
    const data = window.AppState.get();
    let csv = "ID,Instituto,Data,Amostra,Helena_Prado,Gabriel_Mendes,Clarice_Silveira,Rodrigo_Tavares\n";
    data.pollingComparison.polls.forEach(p => {
      csv += `"${p.id}","${p.institute}","${p.date}","${p.sampleSize}",${p.results.cand_a},${p.results.cand_b},${p.results.cand_c},${p.results.cand_d}\n`;
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    a.download = `pesquisas_registradas_${Date.now()}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
  },
  handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.candidates && parsed.metadata) {
          window.AppState.data = parsed;
          window.AppState.notify();
          alert("Dataset importado com sucesso!");
          this.renderDatasetHub();
        }
      } catch (err) { alert("Erro ao ler arquivo: " + err.message); }
    };
    reader.readAsText(file);
  },
  importFromTextarea() {
    const txt = document.getElementById("textareaDatasetInput").value;
    if (!txt) return;
    try {
      const parsed = JSON.parse(txt);
      if (parsed.candidates && parsed.metadata) {
        window.AppState.data = parsed;
        window.AppState.notify();
        alert("Dataset importado com sucesso!");
        this.renderDatasetHub();
      }
    } catch (err) { alert("JSON inválido: " + err.message); }
  },
  resetToFactory() {
    if (confirm("Restaurar dados de fábrica?")) {
      window.AppState.resetToDefault();
      this.renderDatasetHub();
    }
  }
};
window.DatasetManager = DatasetManager;