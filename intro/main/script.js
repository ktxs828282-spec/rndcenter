const providerData = {
  a: {
    name: "Inplay Sports",
    category: "SPORTS",
    body: "실시간으로 진행되는 경기 흐름에 맞춰 빠르게 베팅을 즐길 수 있는 인플레이 스포츠입니다. 경기 중 변화하는 상황과 흐름을 확인하며 다양한 마켓에 즉시 참여할 수 있고, 실시간 방송과 통계 프로그램을 통해 더욱 생생하고 정확한 경기 정보를 제공합니다. 빠른 배당 변동과 현장감 있는 베팅 환경을 통해 스포츠의 긴장감과 재미를 더욱 높여주는 실시간으로 생생하고 긴장감있는 베팅 환경을 제공합니다.",
    image: "./asset/image/game/sports/char/liveSports.webp",
    fallbackImage: "./asset/image/game/sports/char/liveSports.gif",
    imageAlt: "인플레이 스포츠 게임 이미지",
    provider: "inplay"
  },

  b: {
    name: "Royal Sports",
    category: "SPORTS",
    body: "경기 시작 전 다양한 리그와 종목을 미리 확인하고 원하는 경기를 선택할 수 있는 로얄 스포츠입니다. 축구, 농구, 야구 등 여러 스포츠의 경기 일정과 배당 정보를 한눈에 확인할 수 있으며, 경기 시작 전 충분한 분석을 바탕으로 여유롭게 베팅을 준비할 수 있습니다. 안정적이고 편리한 구성으로 스포츠 베팅을 처음 이용하는 회원도 쉽게 접근할 수 있는 사전 베팅 환경을 제공합니다.",
    image: "./asset/image/game/sports/char/royalSports.webp",
    fallbackImage: "./asset/image/game/sports/char/royalSports.gif",
    imageAlt: "로얄 스포츠 게임 이미지",
    provider: "royalSports"
  },

  c: {
    name: "BTI Sports",
    category: "SPORTS",
    body: "BTI 스포츠 전용 환경에서 다양한 스포츠 경기와 마켓을 빠르게 확인할 수 있는 서비스입니다. 직관적인 화면 구성과 빠른 경기 검색 기능을 통해 원하는 종목과 리그를 손쉽게 찾을 수 있으며, 폭넓은 베팅 옵션과 안정적인 스포츠 데이터를 제공합니다. 다양한 경기 정보와 마켓을 효율적으로 탐색할 수 있어 더욱 편리하고 전문적인 스포츠 베팅 경험을 제공합니다.",
    image: "./asset/image/game/sports/char/btiSports.webp",
    fallbackImage: "./asset/image/game/sports/char/btiSports.gif",
    imageAlt: "BTI 스포츠 게임 이미지",
    provider: "btiSports"
  }
};

const tabs = [...document.querySelectorAll(".providerTab")];

const providerPanel = document.querySelector("#providerPanel");
const providerImage = document.querySelector("#providerImage");
const providerName = document.querySelector("#providerName");
const providerCategory = document.querySelector("#providerCategory");
const providerBody = document.querySelector("#providerBody");
const enterButton = document.querySelector("#enterButton");

const preloadedImages = new Map();

let selectedProviderKey = null;
let animationTimer = null;

/**
 * 이미지를 브라우저 캐시에 미리 로드합니다.
 */
function preloadImage(src, priority = "auto") {
  if (!src || preloadedImages.has(src)) {
    return preloadedImages.get(src);
  }

  const image = new Image();

  image.decoding = "async";
  image.fetchPriority = priority;

  const ready = new Promise((resolve) => {
    const complete = () => {
      resolve(image);
    };

    image.addEventListener("load", complete, {
      once: true
    });

    image.addEventListener("error", complete, {
      once: true
    });

    image.src = src;
  });

  const preloadItem = {
    image,
    ready
  };

  preloadedImages.set(src, preloadItem);

  ready.then(() => {
    if (typeof image.decode === "function") {
      image.decode().catch(() => {
        // decode 실패 시에도 기본 브라우저 로딩을 사용합니다.
      });
    }
  });

  return preloadItem;
}

/**
 * 모든 게임사 이미지를 페이지 진입 시 미리 불러옵니다.
 */
function preloadProviderImages() {
  Object.entries(providerData).forEach(([key, provider]) => {
    preloadImage(
      provider.image,
      key === "a" ? "high" : "auto"
    );
  });
}

/**
 * 탭 전환 애니메이션을 즉시 실행합니다.
 * 콘텐츠 교체를 기다리지 않습니다.
 */
function playProviderTransition() {
  if (!providerPanel) return;

  window.clearTimeout(animationTimer);

  providerPanel.classList.remove("isChanging");

  // 같은 클래스를 연속 적용해도 애니메이션이 다시 실행되도록 강제 리플로우
  void providerPanel.offsetWidth;

  providerPanel.classList.add("isChanging");

  animationTimer = window.setTimeout(() => {
    providerPanel.classList.remove("isChanging");
  }, 150);
}

/**
 * 선택한 게임사 콘텐츠를 즉시 화면에 적용합니다.
 */
function renderProvider(key) {
  const provider = providerData[key];

  if (!provider) return;

  if (providerName) {
    providerName.textContent = provider.name;
  }

  if (providerCategory) {
    providerCategory.textContent = provider.category;
  }

  if (providerBody) {
    providerBody.textContent = provider.body;
  }

  if (providerImage) {
    providerImage.dataset.providerKey = key;
    providerImage.dataset.fallbackApplied = "false";

    providerImage.alt = provider.imageAlt;
    providerImage.decoding = "async";
    providerImage.loading = "eager";
    providerImage.fetchPriority = "high";

    const currentImage = providerImage.getAttribute("src");

    if (currentImage !== provider.image) {
      providerImage.setAttribute("src", provider.image);
    }
  }
}

/**
 * 탭의 활성 상태를 변경합니다.
 */
function updateActiveTab(activeTab) {
  tabs.forEach((tab) => {
    const isSelected = tab === activeTab;

    tab.classList.toggle("isActive", isSelected);
    tab.setAttribute(
      "aria-selected",
      String(isSelected)
    );

    tab.tabIndex = isSelected ? 0 : -1;
  });
}

/**
 * 게임사를 선택합니다.
 */
function selectProvider(tab, options = {}) {
  if (!tab) return;

  const {
    focus = false,
    animate = true
  } = options;

  const key = tab.dataset.provider;
  const provider = providerData[key];

  if (!provider) return;

  // 이미 선택된 탭을 다시 클릭하면 콘텐츠를 재로딩하지 않습니다.
  if (selectedProviderKey === key) {
    if (focus) {
      tab.focus();
    }

    return;
  }

  selectedProviderKey = key;

  updateActiveTab(tab);

  if (providerPanel) {
    providerPanel.setAttribute(
      "aria-labelledby",
      tab.id
    );
  }

  // 지연 없이 즉시 변경
  renderProvider(key);

  if (animate) {
    playProviderTransition();
  } else if (providerPanel) {
    providerPanel.classList.remove("isChanging");
  }

  if (focus) {
    tab.focus();
  }
}

/**
 * Animated WebP 로딩 실패 시 GIF를 사용합니다.
 */
if (providerImage) {
  providerImage.addEventListener("error", () => {
    const providerKey =
      providerImage.dataset.providerKey;

    const provider =
      providerData[providerKey];

    if (!provider?.fallbackImage) return;

    if (
      providerImage.dataset.fallbackApplied ===
      "true"
    ) {
      return;
    }

    providerImage.dataset.fallbackApplied = "true";
    providerImage.src = provider.fallbackImage;
  });
}

/**
 * 탭 클릭 및 키보드 이동
 */
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    selectProvider(tab);
  });

  tab.addEventListener("keydown", (event) => {
    const isPrevious =
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp";

    const isNext =
      event.key === "ArrowRight" ||
      event.key === "ArrowDown";

    const isHome = event.key === "Home";
    const isEnd = event.key === "End";

    if (
      !isPrevious &&
      !isNext &&
      !isHome &&
      !isEnd
    ) {
      return;
    }

    event.preventDefault();

    let nextIndex = index;

    if (isPrevious) {
      nextIndex =
        (index - 1 + tabs.length) %
        tabs.length;
    }

    if (isNext) {
      nextIndex =
        (index + 1) %
        tabs.length;
    }

    if (isHome) {
      nextIndex = 0;
    }

    if (isEnd) {
      nextIndex = tabs.length - 1;
    }

    selectProvider(tabs[nextIndex], {
      focus: true
    });
  });
});

/**
 * 게임입장 버튼 이벤트
 */
if (enterButton) {
  enterButton.addEventListener("click", () => {
    const provider =
      providerData[selectedProviderKey];

    if (!provider) return;

    document.dispatchEvent(
      new CustomEvent("sportsProviderEnter", {
        detail: {
          key: selectedProviderKey,
          provider: provider.provider,
          name: provider.name
        }
      })
    );
  });
}

/**
 * 초기 실행
 */
function initializeSportsProviders() {
  preloadProviderImages();

  const initialTab =
    tabs.find((tab) =>
      tab.classList.contains("isActive")
    ) || tabs[0];

  if (!initialTab) return;

  selectProvider(initialTab, {
    animate: false
  });
}

initializeSportsProviders();