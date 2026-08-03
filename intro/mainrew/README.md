# Figma Main Renewal

## 실행

`index.html`을 브라우저에서 열거나 Live Server로 실행합니다.

## 이번 수정 내용

- 기존 레이아웃과 카드 크기 유지
- Pretendard 및 영역별 font-weight 유지
- 히어로 배너 자동 슬라이드 유지
- 배너, 라이브 카드, 슬롯 카드, 이벤트 카드 더미 이미지를 로컬 PNG로 추가
- `statsGrid` 숫자 슬롯의 위·아래 및 좌우 글자 잘림 수정
- 브라우저의 `동작 줄이기` 설정이 켜져 있어도 숫자 슬롯 애니메이션 실행
- 인기 제공사 카드가 2.6초마다 자동 슬라이드되며 마지막 이후 처음으로 무한 반복
- 마우스 hover, 포커스, 드래그 중에는 제공사 자동 슬라이드 일시 정지
- 푸터 제공사 로고가 빈 구간 없이 계속 흐르는 무한 마키 적용
- `providerCard`와 `marqueeItem`에 서로 다른 이미지 여러 개 등록 가능

## 더미 PNG 교체

더미 이미지는 `assets/dummy/`에 있습니다.

- `heroBanner01.png` ~ `heroBanner03.png`
- `liveCard01.png` ~ `liveCard05.png`
- `slotCard01.png` ~ `slotCard06.png`
- `eventBanner01.png` ~ `eventBanner04.png`

동일한 파일명으로 PNG를 덮어쓰면 코드 수정 없이 교체됩니다.

## 제공사 이미지 추가

1. 이미지를 `assets/providers/`에 넣습니다.
2. `script.js`의 `providerLogos` 배열에 항목을 추가합니다.

```js
{
  name: 'Evolution',
  image: './assets/providers/evolution.png',
  showInCard: true,
  showInMarquee: true
}
```

- `showInCard`: 인기 제공사 카드 노출
- `showInMarquee`: 하단 푸터 롤링 노출
- 이미지 비율은 `object-fit: contain`으로 유지됩니다.
- 이미지 로드 실패 시 기본 제공사 이미지로 대체됩니다.

## 2026-08-04 Figma reference update

- Reference: Figma node `1666:21668`
- Rebuilt the trust-stat slot animation as a real vertical reel instead of a shaking digit.
- Matched the Figma typography: number 30/34 Regular, suffix 24/28 Regular, labels 13/16, captions 10/12.
- Preserved 80px hex icons, 288px desktop cards, 16px gaps, and the light border/gradient card surface.
- Added extra reel viewport height so numerals and Korean suffixes do not clip during or after the animation.
- Existing PNG dummy banners/cards and 2.6-second provider autoplay remain enabled.
