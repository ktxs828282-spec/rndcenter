const assets = {
  hexStar: './assets/stats/hexStar.webp',
  hexAll: './assets/stats/hexAll.webp',
  hexClock: './assets/stats/hexClock.webp',
  hexBall: './assets/stats/hexBall.webp',
  avatar: 'https://www.figma.com/api/mcp/asset/d4712736-9065-4b66-b754-43729150ea59',
  logo: 'https://www.figma.com/api/mcp/asset/380daa59-d279-4eff-8e72-7d60e29744a5',
  basketballPrimary: 'https://www.figma.com/api/mcp/asset/0df662c5-73b8-482d-89a9-61ac6569fb94',
  crown: 'https://www.figma.com/api/mcp/asset/92c2a45e-41fb-470b-9b99-4bf9c24d6e78',
  cherry: 'https://www.figma.com/api/mcp/asset/81f2a912-068e-42f6-b55d-75694e8204ba',
  gameConsole: 'https://www.figma.com/api/mcp/asset/96f1fedf-b1a4-4af4-a8f1-84b6ac2f54f7',
  dice: 'https://www.figma.com/api/mcp/asset/5b2ed26f-4f53-4010-93a1-288f38a2e205',
  chevronLeft: 'https://www.figma.com/api/mcp/asset/74bb1987-db73-4685-aa65-3813f309561c',
  chevronRight: 'https://www.figma.com/api/mcp/asset/b31ff2dc-8875-467b-809d-95102eda5cab',
  user: 'https://www.figma.com/api/mcp/asset/1f73b3ed-02c1-4326-95b4-ebcbb38b885f',
  provider: 'https://www.figma.com/api/mcp/asset/33912c67-3cbc-43d1-81a8-3ebf8b1b390d',
  footerLogo: 'https://www.figma.com/api/mcp/asset/2191facf-f518-452b-ba3c-f21daf0ef0b6',
  send: 'https://www.figma.com/api/mcp/asset/cda37965-29a2-4933-88e7-22c1055ed1a3',
  headset: 'https://www.figma.com/api/mcp/asset/1522dd34-f6fd-48a5-af95-02cc42e7da84'
};

document.querySelectorAll('[data-asset]').forEach((image) => {
  const key = image.dataset.asset;
  if (assets[key]) image.src = assets[key];
});

const createChecker = () => '<div class="cardChecker" aria-hidden="true"></div>';

const createCardImage = (src, alt) => `<img class="cardMedia" src="${src}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">`;

const liveGames = Array.from({ length: 10 }, (_, index) => ({
  name: `바카라게임명 ${index + 1}`,
  viewers: 100 + index * 12,
  amount: 1000 + index * 100,
  image: `./assets/dummy/liveCard${String((index % 5) + 1).padStart(2, '0')}.webp`
}));

const slotGames = Array.from({ length: 10 }, (_, index) => ({
  name: `슬롯게임이름 ${index + 1}`,
  company: index % 2 ? '게임사명 PLUS' : '게임사명',
  image: `./assets/dummy/slotCard${String((index % 6) + 1).padStart(2, '0')}.png`
}));

const events = Array.from({ length: 6 }, (_, index) => ({
  label: `이벤트 배너 ${index + 1}`,
  image: `./assets/dummy/eventBanner${String((index % 4) + 1).padStart(2, '0')}.webp`
}));

/*
 * 제공사 로고 관리
 * image: 로컬 이미지 경로 또는 외부 URL
 * showInCard: providerCard 노출 여부
 * showInMarquee: 푸터 marqueeItem 노출 여부
 *
 * 예시
 * { name: 'Evolution', image: './assets/providers/evolution.png', showInCard: true, showInMarquee: true }
 */
const providerLogos = [
  { name: 'Big Time Gaming', image: './assets/providers/bigTimeGaming.webp', showInCard: true, showInMarquee: true },
  { name: 'Choice Gaming', image: './assets/providers/choiceGaming.webp', showInCard: true, showInMarquee: true },
  { name: 'DB', image: './assets/providers/db.webp', showInCard: true, showInMarquee: true },
  { name: 'Dowin', image: './assets/providers/dowin.webp', showInCard: true, showInMarquee: true },
  { name: 'Dream Gaming', image: './assets/providers/dreamGaming.webp', showInCard: true, showInMarquee: true },
  { name: 'Evolution', image: './assets/providers/evolution.webp', showInCard: true, showInMarquee: true },
  { name: 'Ezugi', image: './assets/providers/ezugi.webp', showInCard: true, showInMarquee: true },
  { name: 'Gclub Live', image: './assets/providers/gclubLive.webp', showInCard: true, showInMarquee: true },
  { name: 'GPI', image: './assets/providers/gpi.webp', showInCard: true, showInMarquee: true },
  { name: 'Hilton', image: './assets/providers/hilton.webp', showInCard: true, showInMarquee: true },
  { name: 'Iconic21', image: './assets/providers/iconic21.webp', showInCard: true, showInMarquee: true },
  { name: 'Imagine Live', image: './assets/providers/imagineLive.webp', showInCard: true, showInMarquee: true },
  { name: 'Micro Gaming', image: './assets/providers/microGaming.webp', showInCard: false, showInMarquee: true },
  { name: 'Motivation', image: './assets/providers/motivation.webp', showInCard: false, showInMarquee: true },
  { name: 'Oriental Gaming', image: './assets/providers/orientalGaming.webp', showInCard: false, showInMarquee: true },
  { name: 'Play Ace', image: './assets/providers/playAce.webp', showInCard: false, showInMarquee: true },
  { name: 'Play Tech', image: './assets/providers/playTech.webp', showInCard: false, showInMarquee: true },
  { name: 'Pragmatic Play', image: './assets/providers/pragmaticPlay.webp', showInCard: false, showInMarquee: true },
  { name: 'Sexy Gaming', image: './assets/providers/sexyGaming.webp', showInCard: false, showInMarquee: true },
  { name: 'Sky Wind', image: './assets/providers/skyWind.webp', showInCard: false, showInMarquee: true },
  { name: 'TV Bet', image: './assets/providers/tvBet.webp', showInCard: false, showInMarquee: true },
  { name: 'Vota', image: './assets/providers/vota.webp', showInCard: false, showInMarquee: true },
  { name: 'XPG', image: './assets/providers/xpg.webp', showInCard: false, showInMarquee: true }
];

const providerCardItems = providerLogos.filter((provider) => provider.showInCard !== false);
const marqueeProviderItems = providerLogos.filter((provider) => provider.showInMarquee !== false);

function renderLiveCards() {
  const track = document.querySelector('[data-slider-track="live"]');
  track.innerHTML = liveGames.map((game) => `
    <article class="liveCard">
      <div class="cardImage">${createCardImage(game.image, game.name)}<span class="liveBadge">LIVE</span></div>
      <div class="cardDesc">
        <h3>${game.name}</h3>
        <div class="cardMeta">
          <span class="viewer"><img src="${assets.user}" alt="접속자">${game.viewers}</span>
          <span class="money">₩ ${game.amount.toLocaleString('ko-KR')}</span>
        </div>
      </div>
    </article>
  `).join('');
}

function renderSlotCards() {
  const track = document.querySelector('[data-slider-track="slots"]');
  track.innerHTML = slotGames.map((game) => `
    <article class="slotCard">
      <div class="cardImage">${createCardImage(game.image, game.name)}</div>
      <div class="cardDesc"><h3>${game.name}</h3><p class="company">${game.company}</p></div>
    </article>
  `).join('');
}

function renderEvents() {
  const track = document.querySelector('[data-slider-track="events"]');
  track.innerHTML = events.map((event) => `<article class="eventCard" aria-label="${event.label}">${createCardImage(event.image, event.label)}</article>`).join('');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function createProviderImage(provider, lazy = true) {
  const image = escapeHtml(provider.image || assets.provider);
  const name = escapeHtml(provider.name || '게임 제공사');
  const loading = lazy ? ' loading="lazy"' : '';

  return `<img src="${image}" alt="${name}"${loading} decoding="async" onerror="this.onerror=null;this.src='${assets.provider}'">`;
}

function renderProviders() {
  const track = document.querySelector('[data-slider-track="providers"]');
  if (!track) return;

  track.innerHTML = providerCardItems.map((provider) => `
    <article class="providerCard" aria-label="${escapeHtml(provider.name)}">
      ${createProviderImage(provider)}
    </article>
  `).join('');
}

function renderMarquee() {
  const marquee = document.querySelector('[data-provider-marquee]');
  if (!marquee || marqueeProviderItems.length === 0) return;

  // 로고 수가 적어도 넓은 화면에서 빈 구간이 생기지 않도록
  // 각 그룹을 최소 24개 항목까지 반복한 뒤 동일 그룹을 2개 배치합니다.
  const minimumItemsPerGroup = 24;
  const repeatCount = Math.max(1, Math.ceil(minimumItemsPerGroup / marqueeProviderItems.length));
  const repeatedProviders = Array.from({ length: repeatCount }, () => marqueeProviderItems).flat();

  const items = repeatedProviders.map((provider) => `
    <span class="marqueeItem">
      ${createProviderImage(provider, false)}
    </span>
  `).join('');

  const duration = Math.max(30, repeatedProviders.length * 1.45);
  marquee.style.setProperty('--marqueeDuration', `${duration}s`);
  marquee.innerHTML = `
    <div class="marqueeGroup">${items}</div>
    <div class="marqueeGroup" aria-hidden="true">${items}</div>
  `;
}

class TrackSlider {
  constructor(name, options = {}) {
    this.name = name;
    this.track = document.querySelector(`[data-slider-track="${name}"]`);
    this.viewport = this.track?.parentElement;
    this.prevButton = document.querySelector(`[data-slider-prev="${name}"]`);
    this.nextButton = document.querySelector(`[data-slider-next="${name}"]`);
    this.loop = Boolean(options.loop);
    this.autoplayDelay = Number(options.autoplayDelay) || 0;
    this.originalCount = 0;
    this.index = 0;
    this.startX = 0;
    this.currentX = 0;
    this.dragging = false;
    this.animationTimer = null;
    this.autoplayTimer = null;

    if (!this.track || !this.viewport) return;
    if (this.loop) this.prepareLoop();
    this.bind();
    this.update(false);
    this.startAutoplay();
  }

  get cards() { return Array.from(this.track.children); }

  get metrics() {
    const first = this.cards[0];
    if (!first) return { step: 0, visible: 1, maxIndex: 0 };
    const gap = parseFloat(getComputedStyle(this.track).gap) || 0;
    const step = first.getBoundingClientRect().width + gap;
    const visible = Math.max(1, Math.floor((this.viewport.clientWidth + gap) / step));
    const maxIndex = Math.max(0, this.cards.length - visible);
    return { step, visible, maxIndex };
  }

  prepareLoop() {
    const originals = Array.from(this.track.children);
    this.originalCount = originals.length;
    if (this.originalCount < 2) {
      this.loop = false;
      return;
    }

    originals.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.dataset.sliderClone = 'true';
      clone.setAttribute('aria-hidden', 'true');
      this.track.appendChild(clone);
    });
  }

  bind() {
    this.prevButton?.addEventListener('click', () => this.move(-1, this.prevButton, true));
    this.nextButton?.addEventListener('click', () => this.move(1, this.nextButton, true));
    window.addEventListener('resize', () => this.update(false));

    this.track.addEventListener('transitionend', (event) => {
      if (event.target !== this.track || event.propertyName !== 'transform' || !this.loop) return;
      if (this.index >= this.originalCount) this.jumpTo(this.index - this.originalCount);
      if (this.index < 0) this.jumpTo(this.index + this.originalCount);
    });

    this.viewport.addEventListener('mouseenter', () => this.stopAutoplay());
    this.viewport.addEventListener('mouseleave', () => this.startAutoplay());
    this.viewport.addEventListener('focusin', () => this.stopAutoplay());
    this.viewport.addEventListener('focusout', () => this.startAutoplay());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stopAutoplay();
      else this.startAutoplay();
    });

    this.viewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      this.stopAutoplay();
      this.dragging = true;
      this.startX = event.clientX;
      this.currentX = event.clientX;
      this.track.style.transition = 'none';
      this.viewport.setPointerCapture?.(event.pointerId);
    });

    this.viewport.addEventListener('pointermove', (event) => {
      if (!this.dragging) return;
      this.currentX = event.clientX;
      const { step } = this.metrics;
      this.track.style.transform = `translate3d(${-(this.index * step) + (this.currentX - this.startX)}px,0,0)`;
    });

    const finishDrag = () => {
      if (!this.dragging) return;
      this.dragging = false;
      const delta = this.currentX - this.startX;
      this.track.style.transition = '';
      if (Math.abs(delta) > 48) this.move(delta < 0 ? 1 : -1, null, false);
      else this.update();
      this.startAutoplay();
    };

    this.viewport.addEventListener('pointerup', finishDrag);
    this.viewport.addEventListener('pointercancel', finishDrag);
  }

  move(direction, button = null, restartAutoplay = false) {
    if (this.loop) {
      if (direction < 0 && this.index <= 0) {
        this.jumpTo(this.originalCount);
      }
      this.index += direction;
      this.playSlideFeedback(button);
      this.update();
    } else {
      const { maxIndex } = this.metrics;
      const nextIndex = Math.min(maxIndex, Math.max(0, this.index + direction));
      if (nextIndex === this.index) return;
      this.index = nextIndex;
      this.playSlideFeedback(button);
      this.update();
    }

    if (restartAutoplay) this.restartAutoplay();
  }

  playSlideFeedback(button) {
    window.clearTimeout(this.animationTimer);
    this.track.classList.remove('isSliding');
    void this.track.offsetWidth;
    this.track.classList.add('isSliding');

    button?.classList.add('isPressed');
    window.setTimeout(() => button?.classList.remove('isPressed'), 180);

    this.animationTimer = window.setTimeout(() => {
      this.track.classList.remove('isSliding');
    }, 650);
  }

  jumpTo(index) {
    this.track.style.transition = 'none';
    this.index = index;
    this.update(false);
    void this.track.offsetWidth;
    this.track.style.transition = '';
  }

  update(animate = true) {
    const { step, maxIndex } = this.metrics;
    if (!animate) this.track.style.transition = 'none';

    if (!this.loop) this.index = Math.min(this.index, maxIndex);
    this.track.style.transform = `translate3d(${-this.index * step}px,0,0)`;

    if (this.loop) {
      if (this.prevButton) this.prevButton.disabled = false;
      if (this.nextButton) this.nextButton.disabled = false;
    } else {
      if (this.prevButton) this.prevButton.disabled = this.index === 0;
      if (this.nextButton) this.nextButton.disabled = this.index >= maxIndex;
    }

    if (!animate) {
      void this.track.offsetWidth;
      this.track.style.transition = '';
    }
  }

  startAutoplay() {
    if (!this.autoplayDelay || this.autoplayTimer || document.hidden || this.dragging) return;
    this.autoplayTimer = window.setInterval(() => this.move(1), this.autoplayDelay);
  }

  stopAutoplay() {
    window.clearInterval(this.autoplayTimer);
    this.autoplayTimer = null;
  }

  restartAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
}

class HeroSlider {
  constructor() {
    this.root = document.querySelector('.heroSlider');
    this.track = document.querySelector('.heroTrack');
    this.originalSlides = Array.from(document.querySelectorAll('.heroSlide'));
    this.dots = document.querySelector('.heroDots');
    this.index = 0;
    this.position = 1;
    this.timer = null;
    this.autoplayDelay = 4500;
    this.init();
  }

  init() {
    if (!this.root || !this.track || this.originalSlides.length === 0) return;

    const firstClone = this.originalSlides[0].cloneNode(true);
    const lastClone = this.originalSlides[this.originalSlides.length - 1].cloneNode(true);
    firstClone.classList.add('isClone');
    lastClone.classList.add('isClone');
    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');
    this.track.prepend(lastClone);
    this.track.append(firstClone);

    this.originalSlides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `${index + 1}번 배너 보기`);
      dot.addEventListener('click', () => this.goTo(index, true));
      this.dots.appendChild(dot);
    });

    this.track.addEventListener('transitionend', (event) => this.handleLoopReset(event));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
      else this.start();
    });

    this.setPosition(1, false);
    this.updateState();
    this.start();
  }

  step(direction, restart = false) {
    const count = this.originalSlides.length;
    this.index = (this.index + direction + count) % count;
    this.position += direction;
    this.setPosition(this.position, true);
    this.updateState();
    if (restart) this.restart();
  }

  goTo(index, restart = false) {
    const count = this.originalSlides.length;
    this.index = (index + count) % count;
    this.position = this.index + 1;
    this.setPosition(this.position, true);
    this.updateState();
    if (restart) this.restart();
  }

  setPosition(position, animate) {
    this.track.classList.toggle('isInstant', !animate);
    if (!animate) void this.track.offsetWidth;
    this.track.style.transform = `translate3d(${-position * 100}%,0,0)`;
    if (!animate) {
      void this.track.offsetWidth;
      this.track.classList.remove('isInstant');
    }
  }

  handleLoopReset(event) {
    if (event.propertyName !== 'transform') return;
    const count = this.originalSlides.length;

    if (this.position === 0) {
      this.position = count;
      this.setPosition(this.position, false);
    } else if (this.position === count + 1) {
      this.position = 1;
      this.setPosition(this.position, false);
    }
  }

  updateState() {
    Array.from(this.dots.children).forEach((dot, dotIndex) => {
      const active = dotIndex === this.index;
      dot.classList.toggle('isActive', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });

    this.originalSlides.forEach((slide, slideIndex) => {
      slide.setAttribute('aria-hidden', slideIndex === this.index ? 'false' : 'true');
    });
  }


  start() {
    if (this.timer || document.hidden || this.originalSlides.length < 2) return;
    this.timer = window.setInterval(() => this.step(1), this.autoplayDelay);
  }

  stop() {
    window.clearInterval(this.timer);
    this.timer = null;
  }

  restart() {
    this.stop();
    this.start();
  }
}
function initStatSlotMachine() {
  const statsGrid = document.querySelector('.statsGrid');
  const numbers = Array.from(document.querySelectorAll('[data-stat-value]'));
  if (!statsGrid || numbers.length === 0) return;

  const digitHeight = 38;
  const reelLength = 24;

  numbers.forEach((numberElement, numberIndex) => {
    const target = numberElement.dataset.statValue || '0';
    const suffix = numberElement.querySelector('small');
    const fragment = document.createDocumentFragment();

    target.split('').forEach((targetDigit, digitIndex) => {
      const reel = document.createElement('span');
      const track = document.createElement('span');
      const sequence = ['0'];

      reel.className = 'slotDigit';
      reel.setAttribute('aria-hidden', 'true');
      track.className = 'slotDigitTrack';

      for (let index = 1; index < reelLength - 1; index += 1) {
        sequence.push(String((index * 7 + numberIndex * 3 + digitIndex * 5) % 10));
      }
      sequence.push(targetDigit);

      sequence.forEach((digit) => {
        const item = document.createElement('span');
        item.className = 'slotDigitItem';
        item.textContent = digit;
        track.appendChild(item);
      });

      reel.dataset.stopIndex = String(sequence.length - 1);
      reel.dataset.cardIndex = String(numberIndex);
      reel.dataset.digitIndex = String(digitIndex);
      reel.appendChild(track);
      fragment.appendChild(reel);
    });

    numberElement.replaceChildren(fragment, suffix);
  });

  const play = () => {
    const reels = Array.from(statsGrid.querySelectorAll('.slotDigit'));

    reels.forEach((reel) => {
      const track = reel.querySelector('.slotDigitTrack');
      if (!track) return;

      const cardIndex = Number(reel.dataset.cardIndex || 0);
      const digitIndex = Number(reel.dataset.digitIndex || 0);
      const stopIndex = Number(reel.dataset.stopIndex || 0);
      const delay = 120 + cardIndex * 130 + digitIndex * 170;
      const duration = 1350 + digitIndex * 260;
      const distance = stopIndex * digitHeight;

      window.setTimeout(() => {
        track.style.transition = `transform ${duration}ms cubic-bezier(.12,.72,.16,1)`;
        track.style.transform = `translate3d(0, -${distance}px, 0)`;

        window.setTimeout(() => {
          reel.classList.add('isSettling');
          window.setTimeout(() => reel.classList.remove('isSettling'), 380);
        }, duration - 20);
      }, delay);
    });
  };

  let hasPlayed = false;
  const playOnce = () => {
    if (hasPlayed) return;
    hasPlayed = true;
    play();
  };

  if (!('IntersectionObserver' in window)) {
    window.setTimeout(playOnce, 300);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    window.setTimeout(playOnce, 180);
  }, { threshold: 0.2, rootMargin: '0px 0px -4% 0px' });

  observer.observe(statsGrid);

  window.requestAnimationFrame(() => {
    const rect = statsGrid.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      window.setTimeout(playOnce, 350);
    }
  });
}

renderLiveCards();
renderSlotCards();
renderEvents();
renderProviders();
renderMarquee();
initStatSlotMachine();

new HeroSlider();
['live', 'slots', 'events'].forEach((name) => new TrackSlider(name));
new TrackSlider('providers', { loop: true, autoplayDelay: 2600 });
