const PresentationMode = {
  isActive: false,
  timerId: null,
  currentSlideIndex: 0,
  slideTabs: ["pills-dashboard-tab", "pills-radar-tab", "pills-polling-tab", "pills-compare-tab", "pills-ai-tab"],

  start() {
    this.isActive = true;
    this.currentSlideIndex = 0;
    this.showOverlayControls();
    this.goToSlide(0);
    this.timerId = setInterval(() => this.nextSlide(), 12000);
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
  },
  stop() {
    this.isActive = false;
    if (this.timerId) clearInterval(this.timerId);
    this.hideOverlayControls();
    if (document.exitFullscreen && document.fullscreenElement) document.exitFullscreen().catch(() => {});
  },
  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slideTabs.length;
    this.goToSlide(this.currentSlideIndex);
  },
  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slideTabs.length) % this.slideTabs.length;
    this.goToSlide(this.currentSlideIndex);
  },
  goToSlide(index) {
    const btn = document.getElementById(this.slideTabs[index]);
    if (btn) new bootstrap.Tab(btn).show();
    const ind = document.getElementById("presentationSlideIndicator");
    if (ind) ind.textContent = `Slide ${index + 1} de ${this.slideTabs.length}`;
  },
  showOverlayControls() {
    let overlay = document.getElementById("presentationOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "presentationOverlay";
      overlay.className = "position-fixed bottom-0 end-0 m-4 p-2 bg-dark bg-opacity-90 rounded border border-secondary shadow-lg d-flex align-items-center gap-2";
      overlay.style.zIndex = "9999";
      overlay.innerHTML = `
        <span class="badge bg-danger live-pulse me-1"></span>
        <span class="small text-white fw-bold me-2" id="presentationSlideIndicator">Slide 1 de 5</span>
        <button class="btn btn-sm btn-outline-light" onclick="PresentationMode.prevSlide()"><i class="bi bi-chevron-left"></i></button>
        <button class="btn btn-sm btn-outline-light" onclick="PresentationMode.nextSlide()"><i class="bi bi-chevron-right"></i></button>
        <button class="btn btn-sm btn-danger ms-2" onclick="PresentationMode.stop()"><i class="bi bi-x-lg me-1"></i> Sair do Telão</button>
      `;
      document.body.appendChild(overlay);
    }
    overlay.style.display = "flex";
  },
  hideOverlayControls() {
    const overlay = document.getElementById("presentationOverlay");
    if (overlay) overlay.style.display = "none";
  }
};
window.PresentationMode = PresentationMode;