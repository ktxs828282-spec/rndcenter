(() => {
  "use strict";

  const POPUP_IDS = ["popup-1", "popup-2", "popup-3", "popup-4"];
  const STORAGE_NAMESPACE = "figmaPopupBanner:animateCss:bounceBackOutDown:v1:";

  const ENTER_ANIMATION_CLASS = "animate__bounceIn";
  const EXIT_ANIMATION_CLASS = "animate__backOutDown";

  const DESKTOP_CONTENT_WIDTH = 1660;
  const DESKTOP_CONTENT_HEIGHT = 692;
  const DESKTOP_SIDE_PADDING = 40;
  const DESKTOP_VERTICAL_PADDING = 40;
  const CLOSE_DURATION = 650;
  const CLOSE_FALLBACK_DELAY = CLOSE_DURATION + 150;

  const ANIMATION_CLASSES = [
    "animate__animated",
    ENTER_ANIMATION_CLASS,
    EXIT_ANIMATION_CLASS
  ];

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
      // 저장소 접근이 막혀도 닫기 기능은 유지합니다.
    }
  };

  const clearDismissedToday = () => {
    try {
      POPUP_IDS.forEach((popupId) => {
        localStorage.removeItem(storageKey(popupId));
      });
    } catch (_) {
      // 저장소 접근이 막힌 환경에서는 무시합니다.
    }
  };

  const availablePopupIds = () => {
    return POPUP_IDS.filter((popupId) => {
      return (
        !sessionClosedIds.has(popupId) &&
        !isDismissedToday(popupId)
      );
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

  const removeAnimationClasses = (popup) => {
    popup.classList.remove(...ANIMATION_CLASSES);
  };

  const animatePopupIn = async (popup) => {
    if (!popup || popup.classList.contains("is-closing")) {
      return;
    }

    removeAnimationClasses(popup);
    popup.classList.remove("is-closing");
    popup.style.removeProperty("--animate-duration");

    await nextFrame();

    popup.classList.add(
      "animate__animated",
      ENTER_ANIMATION_CLASS
    );
  };

  const animateVisiblePopupsIn = async () => {
    const popups = [
      ...document.querySelectorAll(".popup-card:not(.is-closing)")
    ];

    popups.forEach((popup) => {
      removeAnimationClasses(popup);
      popup.style.removeProperty("--animate-duration");
    });

    await nextFrame();

    popups.forEach((popup) => {
      popup.classList.add(
        "animate__animated",
        ENTER_ANIMATION_CLASS
      );
    });
  };

  const createPopup = (popupId) => {
    const popup = dom.template.content.firstElementChild.cloneNode(true);
    popup.dataset.popupId = popupId;

    popup
      .querySelector(".close-button")
      .addEventListener("click", () => {
        closePopup(popup, false);
      });

    popup
      .querySelector(".hide-today-button")
      .addEventListener("click", () => {
        closePopup(popup, true);
      });

    return popup;
  };

  const createSlot = (popupId, includePopup = true) => {
    const slot = document.createElement("div");

    slot.className = "popup-slot";
    slot.dataset.popupSlot = popupId;

    if (includePopup) {
      slot.appendChild(createPopup(popupId));
    }

    return slot;
  };

  const removePopupCopyWithoutAnimation = (copy) => {
    const slot = copy.closest(".popup-slot");

    if (!slot) {
      copy.remove();
      return;
    }

    /*
      데스크톱에서는 슬롯을 남겨야 오른쪽 카드가 왼쪽으로 이동하지 않습니다.
      모바일에서는 한 장만 렌더링하므로 슬롯 전체를 제거합니다.
    */
    if (slot.closest("#desktopPopupRow")) {
      copy.remove();
      slot.classList.add("is-empty-slot");
      return;
    }

    slot.remove();
  };

  const removeCopiesWithoutAnimation = (popupId, exceptPopup) => {
    document
      .querySelectorAll(`.popup-card[data-popup-id="${popupId}"]`)
      .forEach((copy) => {
        if (copy === exceptPopup) {
          return;
        }

        removePopupCopyWithoutAnimation(copy);
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

    const slot = createSlot(nextPopupId, true);
    const popup = slot.querySelector(".popup-card");

    dom.mobileWrap.appendChild(slot);
    await animatePopupIn(popup);
  };

  const updateEmptyState = () => {
    dom.page.classList.toggle(
      "is-empty",
      availablePopupIds().length === 0
    );
  };

  const finishClose = async (popup, popupId) => {
    const slot = popup.closest(".popup-slot");

    removeCopiesWithoutAnimation(popupId, popup);

    if (slot && slot.closest("#desktopPopupRow")) {
      popup.remove();
      slot.classList.add("is-empty-slot");
    } else if (slot) {
      slot.remove();
    } else {
      popup.remove();
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

    /*
      등장: bounceIn
      종료: backOutDown

      카드만 아래로 빠져나가며, 부모 .popup-slot은 제거하지 않습니다.
      따라서 오른쪽 카드들의 그리드 위치는 그대로 유지됩니다.
    */
    removeAnimationClasses(popup);
    popup.classList.add("is-closing");
    popup.style.setProperty(
      "--animate-duration",
      `${CLOSE_DURATION}ms`
    );

    // 같은 요소에서 진입 애니메이션과 종료 애니메이션을 확실히 분리합니다.
    void popup.offsetWidth;

    popup.classList.add(
      "animate__animated",
      EXIT_ANIMATION_CLASS
    );

    let completed = false;

    const complete = () => {
      if (completed) {
        return;
      }

      completed = true;
      finishClose(popup, popupId);
    };

    popup.addEventListener(
      "animationend",
      (event) => {
        if (
          event.target === popup &&
          event.animationName === "backOutDown"
        ) {
          complete();
        }
      },
      { once: true }
    );

    window.setTimeout(complete, CLOSE_FALLBACK_DELAY);
  };

  const closeLeftmostDesktopPopup = () => {
    const leftmostPopup = dom.desktopRow.querySelector(
      ".popup-card:not(.is-closing)"
    );

    if (leftmostPopup) {
      closePopup(leftmostPopup, false);
    }
  };

  const closeCurrentMobilePopup = () => {
    const mobilePopup = dom.mobileWrap.querySelector(
      ".popup-card:not(.is-closing)"
    );

    if (mobilePopup) {
      closePopup(mobilePopup, false);
    }
  };

  const handleDesktopScrimClick = (event) => {
    if (event.target.closest(".popup-card")) {
      return;
    }

    closeLeftmostDesktopPopup();
  };

  const handleMobileScrimClick = (event) => {
    if (event.target.closest(".popup-card")) {
      return;
    }

    closeCurrentMobilePopup();
  };

  const renderInitialPopups = async () => {
    const availableIds = new Set(availablePopupIds());

    /*
      네 개 슬롯은 항상 생성합니다.
      숨겨진 팝업이 있어도 빈 슬롯이 남으므로 카드 위치가 재정렬되지 않습니다.
    */
    POPUP_IDS.forEach((popupId) => {
      dom.desktopRow.appendChild(
        createSlot(popupId, availableIds.has(popupId))
      );
    });

    const firstMobilePopupId = availablePopupIds()[0];

    if (firstMobilePopupId) {
      dom.mobileWrap.appendChild(
        createSlot(firstMobilePopupId, true)
      );
    }

    updateEmptyState();
    await animateVisiblePopupsIn();
  };

  const bindEvents = () => {
    dom.desktopView.addEventListener(
      "click",
      handleDesktopScrimClick
    );

    dom.mobileView.addEventListener(
      "click",
      handleMobileScrimClick
    );

    window.addEventListener(
      "resize",
      fitDesktop,
      { passive: true }
    );
  };

  const handleResetQuery = () => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get("reset") === "1") {
      clearDismissedToday();
      searchParams.delete("reset");

      const nextQuery = searchParams.toString();
      const nextUrl = `${window.location.pathname}${
        nextQuery ? `?${nextQuery}` : ""
      }${window.location.hash}`;

      window.history.replaceState({}, "", nextUrl);
    }
  };

  const init = async () => {
    handleResetQuery();
    fitDesktop();
    bindEvents();
    await renderInitialPopups();
  };

  window.resetPopupBanner = () => {
    clearDismissedToday();
    window.location.reload();
  };

  init();
})();
