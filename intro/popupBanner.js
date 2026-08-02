(() => {
  "use strict";

  const POPUP_IDS = ["popup-1", "popup-2", "popup-3", "popup-4"];

  // v11로 올려 이전 테스트에서 남아 있던 v10 숨김 기록과 분리합니다.
  const STORAGE_NAMESPACE = "figmaPopupBanner:v11:";

  const DESKTOP_CONTENT_WIDTH = 1660;
  const DESKTOP_CONTENT_HEIGHT = 692;
  const DESKTOP_SIDE_PADDING = 40;
  const DESKTOP_VERTICAL_PADDING = 40;
  const CLOSE_DURATION = 300;

  const sessionClosedIds = new Set();

  const dom = {
    page: document.querySelector("#popupPage"),
    desktopView: document.querySelector(".desktop-view"),
    desktopStage: document.querySelector("#desktopStage"),
    desktopRow: document.querySelector("#desktopPopupRow"),
    mobileView: document.querySelector(".mobile-view"),
    mobileWrap: document.querySelector("#mobilePopupWrap"),
    template: document.querySelector("#popupTemplate")
  };

  const nextFrame = () => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });
  };

  const getToday = () => {
    const now = new Date();

    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");
  };

  const storageKey = (popupId) => {
    return `${STORAGE_NAMESPACE}${popupId}`;
  };

  const clearDismissedStorage = () => {
    try {
      POPUP_IDS.forEach((popupId) => {
        localStorage.removeItem(storageKey(popupId));
      });
    } catch (_) {
      // 저장소 접근이 막힌 환경에서는 무시합니다.
    }
  };

  const applyResetQuery = () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("reset") !== "1") {
      return;
    }

    clearDismissedStorage();

    params.delete("reset");
    const query = params.toString();
    const cleanUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;

    window.history.replaceState(null, "", cleanUrl);
  };

  const isDismissedToday = (popupId) => {
    try {
      return localStorage.getItem(storageKey(popupId)) === getToday();
    } catch (_) {
      return false;
    }
  };

  const saveDismissedToday = (popupId) => {
    try {
      localStorage.setItem(storageKey(popupId), getToday());
    } catch (_) {
      // localStorage를 사용할 수 없는 환경에서도 닫기는 동작합니다.
    }
  };

  const availablePopupIds = () => {
    return POPUP_IDS.filter((popupId) => {
      return !sessionClosedIds.has(popupId) && !isDismissedToday(popupId);
    });
  };

  const fitDesktop = () => {
    const availableWidth = Math.max(
      window.innerWidth - DESKTOP_SIDE_PADDING,
      320
    );

    const availableHeight = Math.max(
      window.innerHeight - DESKTOP_VERTICAL_PADDING,
      320
    );

    const widthScale = availableWidth / DESKTOP_CONTENT_WIDTH;
    const heightScale = availableHeight / DESKTOP_CONTENT_HEIGHT;
    const scale = Math.min(1, widthScale, heightScale);

    dom.desktopStage.style.setProperty(
      "--desktop-scale",
      scale.toFixed(4)
    );
  };

  const createPopup = (popupId) => {
    const popup = dom.template.content.firstElementChild.cloneNode(true);

    popup.dataset.popupId = popupId;

    popup.querySelector(".close-button").addEventListener("click", () => {
      closePopup(popup, false);
    });

    popup.querySelector(".hide-today-button").addEventListener("click", () => {
      closePopup(popup, true);
    });

    return popup;
  };

  const createSlot = (popupId) => {
    const slot = document.createElement("div");

    slot.className = "popup-slot";
    slot.dataset.popupSlot = popupId;
    slot.appendChild(createPopup(popupId));

    return slot;
  };

  const removeCopiesWithoutAnimation = (popupId, exceptPopup) => {
    document
      .querySelectorAll(`.popup-card[data-popup-id="${popupId}"]`)
      .forEach((copy) => {
        if (copy === exceptPopup) {
          return;
        }

        const slot = copy.closest(".popup-slot");
        copy.remove();

        if (slot && slot.closest("#mobilePopupWrap")) {
          slot.remove();
        }
      });
  };

  const enterPopup = async (popup) => {
    await nextFrame();
    popup.classList.add("is-entered");
  };

  const enterAllPopups = async () => {
    await nextFrame();

    document.querySelectorAll("[data-popup-entry]").forEach((popup) => {
      popup.classList.add("is-entered");
    });
  };

  const renderNextMobilePopup = async () => {
    if (dom.mobileWrap.querySelector(".popup-card")) {
      return;
    }

    const nextPopupId = availablePopupIds()[0];

    if (!nextPopupId) {
      return;
    }

    const slot = createSlot(nextPopupId);
    const popup = slot.querySelector(".popup-card");

    dom.mobileWrap.appendChild(slot);
    await enterPopup(popup);
  };

  const updateEmptyState = () => {
    dom.page.classList.toggle(
      "is-empty",
      availablePopupIds().length === 0
    );
  };

  const finishClose = async (popup, popupId) => {
    const slot = popup.closest(".popup-slot");

    popup.remove();
    removeCopiesWithoutAnimation(popupId, popup);

    if (slot && slot.closest("#mobilePopupWrap")) {
      slot.remove();
    }

    await renderNextMobilePopup();
    updateEmptyState();
  };

  const closePopup = (popup, dismissToday) => {
    if (!popup || popup.classList.contains("is-closing")) {
      return;
    }

    const popupId = popup.dataset.popupId;

    if (!popupId || sessionClosedIds.has(popupId)) {
      return;
    }

    if (dismissToday) {
      saveDismissedToday(popupId);
    }

    sessionClosedIds.add(popupId);
    popup.classList.add("is-closing");

    let completed = false;

    const complete = () => {
      if (completed) {
        return;
      }

      completed = true;
      finishClose(popup, popupId);
    };

    popup.addEventListener(
      "transitionend",
      (event) => {
        if (event.target === popup && event.propertyName === "opacity") {
          complete();
        }
      },
      { once: true }
    );

    window.setTimeout(complete, CLOSE_DURATION + 80);
  };

  const closeLeftmostDesktopPopup = () => {
    const leftmostPopup = dom.desktopRow.querySelector(
      ".popup-card:not(.is-closing)"
    );

    if (!leftmostPopup) {
      return;
    }

    closePopup(leftmostPopup, false);
  };

  const handleDesktopScrimClick = (event) => {
    // 실제 모달 카드 내부를 클릭한 경우에만 닫지 않습니다.
    // 카드 바깥의 회색 배경과 카드 사이 간격은 모두 스크림으로 처리합니다.
    if (event.target.closest(".popup-card")) {
      return;
    }

    closeLeftmostDesktopPopup();
  };

  const handleMobileScrimClick = (event) => {
    if (event.target.closest(".mobile-popup-wrap")) {
      return;
    }

    const currentPopup = dom.mobileWrap.querySelector(
      ".popup-card:not(.is-closing)"
    );

    if (!currentPopup) {
      return;
    }

    closePopup(currentPopup, false);
  };

  const renderInitialPopups = () => {
    const ids = availablePopupIds();

    ids.forEach((popupId) => {
      dom.desktopRow.appendChild(createSlot(popupId));
    });

    if (ids[0]) {
      dom.mobileWrap.appendChild(createSlot(ids[0]));
    }

    updateEmptyState();
  };

  const validateDom = () => {
    const required = Object.entries(dom).filter(([, element]) => !element);

    if (required.length === 0) {
      return true;
    }

    console.error(
      "Popup Banner 초기화 실패:",
      required.map(([name]) => name).join(", ")
    );

    return false;
  };

  const init = async () => {
    if (!validateDom()) {
      return;
    }

    applyResetQuery();
    fitDesktop();

    // 이 클래스가 붙기 전까지는 CSS 기본값으로 카드가 항상 보입니다.
    dom.page.classList.add("is-js-ready");

    renderInitialPopups();
    await enterAllPopups();

    dom.desktopView.addEventListener("click", handleDesktopScrimClick);
    dom.mobileView.addEventListener("click", handleMobileScrimClick);

    window.addEventListener(
      "resize",
      fitDesktop,
      { passive: true }
    );
  };

  window.resetPopupBanner = () => {
    clearDismissedStorage();
    location.reload();
  };

  init();
})();
