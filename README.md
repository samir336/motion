# motion

Remotion videos.

## MorningMenu — 朝ココ チーズナンプレート (CoCo壱番屋 JR五反田駅東口店)

Vertical 1080×1920 / 30fps reel (~34s) for the morning menu (5:00〜10:30).
Assets in `public/menu/` were extracted from the menu flyer PDF.

```bash
npm install
npm run dev      # open Remotion Studio
npm run render   # -> out/morning-menu.mp4
```

Scenes live in `src/MorningMenu/scenes/`; timing and transitions are set in `src/MorningMenu/index.tsx`.

### Voiceover

Japanese narration, one line per scene, in `public/voice/vo1.mp3`–`vo9.mp3` (script: `public/voice/script.txt`).
Generated with [Open JTalk](https://open-jtalk.sourceforge.net/) using the HTS voice
[tohoku-f01 (happy)](https://github.com/icn-lab/htsvoice-tohoku-f01) © 2015 Intelligent Communication Network (Ito-Nose)
Laboratory, Tohoku University, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

To regenerate a line:

```bash
echo "おはようございます！" | open_jtalk -x /var/lib/mecab/dic/open-jtalk/naist-jdic \
  -m tohoku-f01-happy.htsvoice -r 1.25 -fm 1.5 -a 0.53 -ow vo1.wav
```
