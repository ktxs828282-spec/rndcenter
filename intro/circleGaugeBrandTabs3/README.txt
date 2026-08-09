Gauge Demo - PNG layer corrected version

Gauge size
- 128 x 128px fixed

PNG layer order (bottom -> top)
1. gaugeRing.png   - base
2. loadingBar.png  - progress (conic mask)
3. imageTable.png  - frame
4. center text

Important
- All three PNG assets are 512 x 512 canvases.
- They are all rendered at the same 128 x 128 size.
- Do not resize gaugeRing/loadingBar to 98px; that sizing applies to the separate cropped WebP reference assets, not these PNG assets.

Center text
- 99: 30px / 800
- + : 14px / 700

Brand colors
- 9WIN: #28C9D7
- KPLAY: #2578FF
- SENA: #343434

External API
- setGauge(progress, duration)
- setGaugeBrand('9win' | 'kplay' | 'sena')
- getGaugeState()
