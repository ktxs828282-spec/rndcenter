const gauge = document.querySelector('#gauge');
const gaugeSlider = document.querySelector('#gaugeSlider');
const valueButtons = document.querySelectorAll('[data-value]');
const brandButtons = document.querySelectorAll('[data-brand]');

const BRAND_DATA = {
  '9win': {
    imageTable: './assets/9win/imageTable.png',
    loadingBar: './assets/9win/loadingBar.png',
    gaugeRing: './assets/9win/gaugeRing.png',
    color: '#28c9d7',
  },
  kplay: {
    imageTable: './assets/kplay/imageTable.png',
    loadingBar: './assets/kplay/loadingBar.png',
    gaugeRing: './assets/kplay/gaugeRing.png',
    color: '#2578ff',
  },
  sena: {
    imageTable: './assets/sena/imageTable.png',
    loadingBar: './assets/sena/loadingBar.png',
    gaugeRing: './assets/sena/gaugeRing.png',
    color: '#343434',
  },
};

let currentProgress = 0;
let currentBrand = '9win';
let animationId = null;

function clampProgress(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue)
    ? Math.max(0, Math.min(100, numericValue))
    : 0;
}

function renderGauge(value) {
  const progress = clampProgress(value);
  gauge.style.setProperty('--progress', `${progress}%`);
  gaugeSlider.value = Math.round(progress);
}

function setGauge(targetProgress, duration = 700) {
  const target = clampProgress(targetProgress);

  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  if (duration <= 0) {
    currentProgress = target;
    renderGauge(currentProgress);
    animationId = null;
    return;
  }

  const startProgress = currentProgress;
  const delta = target - startProgress;
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const ratio = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - ratio, 3);

    currentProgress = startProgress + delta * eased;
    renderGauge(currentProgress);

    if (ratio < 1) {
      animationId = requestAnimationFrame(animate);
    } else {
      currentProgress = target;
      renderGauge(currentProgress);
      animationId = null;
    }
  }

  animationId = requestAnimationFrame(animate);
}

function setBrand(brand) {
  const data = BRAND_DATA[brand];
  if (!data) return;

  currentBrand = brand;

  gauge.style.setProperty('--image-table', `url("${data.imageTable}")`);
  gauge.style.setProperty('--loading-bar', `url("${data.loadingBar}")`);
  gauge.style.setProperty('--gauge-ring', `url("${data.gaugeRing}")`);
  gauge.style.setProperty('--brand-color', data.color);

  brandButtons.forEach((button) => {
    const isActive = button.dataset.brand === brand;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

valueButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setGauge(button.dataset.value);
  });
});

brandButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setBrand(button.dataset.brand);
  });
});

gaugeSlider.addEventListener('input', (event) => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  currentProgress = clampProgress(event.target.value);
  renderGauge(currentProgress);
});

renderGauge(0);
setBrand('9win');

// 페이지 로드 후 기본값(73%)까지 자동 애니메이션
setTimeout(() => setGauge(73, 1000), 250);

// 외부 연동용 API
window.setGauge = setGauge;
window.setGaugeBrand = setBrand;
window.getGaugeState = () => ({
  brand: currentBrand,
  progress: Math.round(currentProgress),
});
