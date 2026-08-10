const gauges = [...document.querySelectorAll('.gauge')];
let groupAnimationId = null;

function clampProgress(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue)
    ? Math.max(0, Math.min(100, numericValue))
    : 0;
}

function renderGauge(gauge, progress) {
  gauge.style.setProperty('--progress', `${clampProgress(progress)}%`);
}

function animateGauge(gauge, targetProgress, duration = 1600, delay = 0) {
  const target = clampProgress(targetProgress);

  window.setTimeout(() => {
    const startTime = performance.now();

    function tick(now) {
      const ratio = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      renderGauge(gauge, target * eased);

      if (ratio < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, delay);
}

function setAllGauges(targetProgress, duration = 1200) {
  const target = clampProgress(targetProgress);

  if (groupAnimationId) {
    cancelAnimationFrame(groupAnimationId);
  }

  const starts = gauges.map((gauge) =>
    parseFloat(getComputedStyle(gauge).getPropertyValue('--progress')) || 0
  );
  const startTime = performance.now();

  function tick(now) {
    const ratio = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - ratio, 3);

    gauges.forEach((gauge, index) => {
      renderGauge(gauge, starts[index] + (target - starts[index]) * eased);
    });

    if (ratio < 1) {
      groupAnimationId = requestAnimationFrame(tick);
    } else {
      groupAnimationId = null;
    }
  }

  groupAnimationId = requestAnimationFrame(tick);
}

function initializeImages() {
  document.querySelectorAll('.benefit-image img').forEach((image) => {
    image.addEventListener(
      'error',
      () => {
        image.style.display = 'none';
      },
      { once: true }
    );
  });
}

function initializeGauges() {
  gauges.forEach((gauge, index) => {
    renderGauge(gauge, 0);
    animateGauge(gauge, gauge.dataset.progress, 1600, 180 + index * 140);
  });
}

initializeImages();
initializeGauges();

// External integration API
window.setGauge = (progress, duration = 1200) =>
  setAllGauges(progress, duration);

window.getGaugeState = () => ({
  brand: '9win',
  gauges: gauges.map((gauge) => ({
    value: gauge.dataset.value,
    unit: gauge.dataset.unit,
    progress: Math.round(
      parseFloat(getComputedStyle(gauge).getPropertyValue('--progress')) || 0
    ),
  })),
});
