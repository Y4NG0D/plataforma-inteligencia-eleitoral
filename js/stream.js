const SignalStream = {
  isRunning: true,
  intervalId: null,
  speedMs: 3500,

  sampleFeedBank: [
    { platform: "X (Twitter)", icon: "bi-twitter-x", author: "@eleitor_sp", text: "O Gabriel Mendes foi muito assertivo na proposta de segurança para as cidades metropolitanas! #Eleicoes2026" },
    { platform: "Instagram", icon: "bi-instagram", author: "@prof_mariasilva", text: "Achei a proposta da Clarice Silveira para o piso dos professores excelente e realista. Meu voto é dela." },
    { platform: "YouTube", icon: "bi-youtube", author: "Comentário em Podcast", text: "A Helena Prado já provou na prática que sabe cuidar das contas públicas e trazer investimento." },
    { platform: "TikTok", icon: "bi-tiktok", author: "@jovens_politica", text: "Olhem esse corte do debate onde o Mendes rebate a acusação sobre as viaturas policiais 🚨" },
    { platform: "Portais de Notícias", icon: "bi-newspaper", author: "G1 / Folha", text: "Novo levantamento aponta segurança e saúde como principais preocupações do eleitorado paulista." },
    { platform: "X (Twitter)", icon: "bi-twitter-x", author: "@roberto_sampaio", text: "Cadê o Rodrigo Tavares? Campanha fraca demais, não conseguiu se posicionar em nenhum debate." }
  ],

  init() {
    this.start();
  },

  start() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.isRunning = true;
    this.intervalId = setInterval(() => this.tick(), this.speedMs);
  },

  pause() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.isRunning = false;
    this.intervalId = null;
  },

  toggle() {
    if (this.isRunning) this.pause();
    else this.start();
    return this.isRunning;
  },

  tick() {
    const randomIndex = Math.floor(Math.random() * this.sampleFeedBank.length);
    const item = this.sampleFeedBank[randomIndex];
    const classified = AIClassifier.classifyText(item.text);

    window.AppState.incrementSignalCount(Math.floor(Math.random() * 8) + 3);
    const elSignals = document.getElementById("metaTotalSignals");
    if (elSignals) {
      elSignals.textContent = window.AppState.get().metadata.totalSignalsProcessed.toLocaleString("pt-BR");
    }

    this.renderSignalItem(item, classified);
  },

  renderSignalItem(item, classified) {
    const container = document.getElementById("liveSignalsFeed");
    if (!container) return;

    const timeStr = new Date().toLocaleTimeString("pt-BR");
    const div = document.createElement("div");
    div.className = "p-2 mb-2 rounded bg-dark border border-secondary fade-in";
    div.style.fontSize = "0.85rem";

    div.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-1">
        <div class="d-flex align-items-center gap-1">
          <i class="bi ${item.icon} text-brand"></i>
          <span class="fw-bold text-light">${item.author}</span>
          <span class="badge bg-secondary ms-1" style="font-size:0.7rem;">${item.platform}</span>
        </div>
        <span class="text-dim small">${timeStr}</span>
      </div>
      <p class="text-white mb-2" style="font-size:0.82rem;">"${item.text}"</p>
      <div class="d-flex flex-wrap gap-1">
        <span class="badge bg-dark border border-primary text-primary">${classified.candidate}</span>
        <span class="badge bg-dark border border-info text-info">${classified.theme}</span>
        <span class="badge ${classified.badgeClass}">${classified.sentiment}</span>
        <span class="badge bg-dark border border-secondary text-light">${classified.type}</span>
      </div>
    `;

    container.insertBefore(div, container.firstChild);
    while (container.children.length > 15) {
      container.removeChild(container.lastChild);
    }
  }
};

window.SignalStream = SignalStream;