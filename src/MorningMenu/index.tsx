import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Sequence, cancelRender, continueRender, delayRender, staticFile } from "remotion";
import { TransitionPresentation, TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";
import { FONT_HEAVY, FONT_ROUND } from "./theme";
import { Intro } from "./scenes/Intro";
import { Title } from "./scenes/Title";
import { Hero } from "./scenes/Hero";
import { PriceScene } from "./scenes/PriceScene";
import { Sauce } from "./scenes/Sauce";
import { Drinks } from "./scenes/Drinks";
import { Toppings } from "./scenes/Toppings";
import { Plates } from "./scenes/Plates";
import { Outro } from "./scenes/Outro";

// Each scene's voiceover line lives in public/voice/vo<n>.mp3 (script in public/voice/script.txt).
const SCENES: { Comp: React.FC; frames: number }[] = [
  { Comp: Intro, frames: 75 },
  { Comp: Title, frames: 95 },
  { Comp: Hero, frames: 140 },
  { Comp: PriceScene, frames: 100 },
  { Comp: Sauce, frames: 155 },
  { Comp: Drinks, frames: 115 },
  { Comp: Toppings, frames: 110 },
  { Comp: Plates, frames: 150 },
  { Comp: Outro, frames: 200 },
];

// Voice starts once the incoming transition has mostly settled.
const VOICE_DELAY = 8;

// Alternate punchy transitions between scenes, like a fast-cut food reel.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TRANSITIONS: TransitionPresentation<any>[] = [
  wipe({ direction: "from-bottom" }),
  slide({ direction: "from-right" }),
  slide({ direction: "from-bottom" }),
  wipe({ direction: "from-left" }),
  slide({ direction: "from-right" }),
  slide({ direction: "from-bottom" }),
  wipe({ direction: "from-top-left" }),
  fade(),
];

const TRANSITION_FRAMES = 12;

export const MORNING_MENU_DURATION =
  SCENES.reduce((sum, s) => sum + s.frames, 0) - TRANSITIONS.length * TRANSITION_FRAMES;

// Every glyph the video uses, so the font subsets are fetched before frames are captured.
const ALL_TEXT =
  "GOOD MORNING!朝限定5:00〜10:30JR五反田駅東口店限定朝ココモーニングメニューチーズナンプレートとろ〜りチーズナンと、カレー、サラダのうれしい朝プレート。サラダで野菜をプラススパイス香るカレー税抜税込円()（）0123456789ドリンク付き！カレーソースは、ポーク甘口ココイチベジソースからお選びいただけます。写真はです下記より1つお選びください。アイスコーヒーミルクカフェ・オ・レオレンジホットラッシープレーンコカ・コーラおすすめトッピングゆでタマゴ半分2個ハーフスクランブルエッグソーセージ本他にもトッピングがいっぱい！メニューブックをご覧下さい！ナンもえらべる！ガーリック追加モーニングソース44gサラダ朝をもっと、おいしく、もっと前向きに。";

const useFonts = () => {
  const [handle] = useState(() => delayRender("Loading Japanese fonts"));
  useEffect(() => {
    Promise.all([
      document.fonts.load(`900 100px ${FONT_HEAVY}`, ALL_TEXT),
      document.fonts.load(`700 100px ${FONT_HEAVY}`, ALL_TEXT),
      document.fonts.load(`800 100px ${FONT_ROUND}`, ALL_TEXT),
    ])
      .then(() => document.fonts.ready)
      .then(() => continueRender(handle))
      .catch((err) => cancelRender(err));
  }, [handle]);
};

export const MorningMenu: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFF6DC" }}>
      <TransitionSeries>
        {SCENES.map(({ Comp, frames }, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={frames}>
              <Comp />
              <Sequence from={i === 0 ? 4 : VOICE_DELAY} layout="none">
                <Audio src={staticFile(`voice/vo${i + 1}.mp3`)} />
              </Sequence>
            </TransitionSeries.Sequence>
            {i < TRANSITIONS.length ? (
              <TransitionSeries.Transition
                presentation={TRANSITIONS[i]}
                timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES })}
              />
            ) : null}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
