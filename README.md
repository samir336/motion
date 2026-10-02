# motion

Remotion videos.

## MorningMenu — 朝ココ チーズナンプレート (CoCo壱番屋 JR五反田駅東口店)

Vertical 1080×1920 / 30fps reel (~35s) for the morning menu (5:00〜10:30).
Assets in `public/menu/` were extracted from the menu flyer PDF.

```bash
npm install
npm run dev      # open Remotion Studio
npm run render   # -> out/morning-menu.mp4
```

Scenes live in `src/MorningMenu/scenes/`; timing and transitions are set in `src/MorningMenu/index.tsx`.

### Voiceover

Japanese narration, one line per scene, in `public/voice/vo1.mp3`–`vo9.mp3` (script: `public/voice/script.txt`).
Voice: Cartesia "Aiko" (sonic-3.6, ja-JP, speed 1.1), split per line at the pauses and loudness-normalized.
Each clip starts 8 frames into its scene (see `VOICE_DELAY` in `src/MorningMenu/index.tsx`).
