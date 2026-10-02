# motion

Remotion videos.

## MorningMenu — 朝ココ チーズナンプレート (CoCo壱番屋 JR五反田駅東口店)

Vertical 1080×1920 / 30fps reel (~29s) for the morning menu (5:00〜10:30).
Assets in `public/menu/` were extracted from the menu flyer PDF.

```bash
npm install
npm run dev      # open Remotion Studio
npm run render   # -> out/morning-menu.mp4
```

Scenes live in `src/MorningMenu/scenes/`; timing and transitions are set in `src/MorningMenu/index.tsx`.
