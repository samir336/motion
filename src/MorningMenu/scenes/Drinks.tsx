import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { Background, Pill, Sparkles, SunRays, menuImg, usePop } from "../components";
import { COLORS, FONT_HEAVY, FONT_ROUND } from "../theme";

const DRINKS = [
  { name: "アイスコーヒー", img: "drink-iced-coffee" },
  { name: "アイスミルク", img: "drink-iced-milk" },
  { name: "アイスカフェ・オ・レ", img: "drink-cafe-au-lait" },
  { name: "オレンジドリンク", img: "drink-orange" },
  { name: "ホットコーヒー", img: "drink-hot-coffee" },
  { name: "ラッシー（プレーン）", img: "drink-lassi" },
  { name: "コカ・コーラ", img: "drink-cola" },
];

const Drink: React.FC<{ name: string; img: string; delay: number }> = ({ name, img, delay }) => {
  const frame = useCurrentFrame();
  const s = usePop(delay, 9, 170);
  const wiggle = Math.sin((frame + delay * 3) / 9) * 3;
  const hot = img === "drink-hot-coffee";
  return (
    <div
      style={{
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `translateY(${interpolate(s, [0, 1], [160, 0])}px) scale(${s})`,
      }}
    >
      <div
        style={{
          width: 250,
          height: 330,
          borderRadius: 40,
          background: "rgba(255,255,255,0.65)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 26,
        }}
      >
        <Img
          src={menuImg(img)}
          style={{
            height: hot ? 190 : 280,
            transform: `rotate(${wiggle}deg)`,
            filter: "drop-shadow(0 14px 12px rgba(0,0,0,0.25))",
          }}
        />
      </div>
      <div style={{ marginTop: 14, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 34, color: COLORS.ink, whiteSpace: "nowrap" }}>
        {name}
      </div>
    </div>
  );
};

export const Drinks: React.FC = () => {
  const head = usePop(0);
  const sub = usePop(10);
  return (
    <Background from={COLORS.yellow} to={COLORS.sunLight}>
      <SunRays x={540} y={300} color={COLORS.white} opacity={0.25} />
      <Sparkles count={14} seed={13} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 180 }}>
        <div style={{ transform: `scale(${head}) rotate(-3deg)` }}>
          <Pill bg={COLORS.red} style={{ fontSize: 110, padding: "20px 70px" }}>
            ドリンク付き
          </Pill>
        </div>
        <div style={{ marginTop: 40, fontFamily: FONT_ROUND, fontWeight: 800, fontSize: 60, color: COLORS.ink, opacity: sub }}>
          下記より1つお選びください。
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "50px 20px", marginTop: 90, width: 1040 }}>
          {DRINKS.map((d, i) => (
            <Drink key={d.img} {...d} delay={18 + i * 5} />
          ))}
        </div>
      </AbsoluteFill>
    </Background>
  );
};
