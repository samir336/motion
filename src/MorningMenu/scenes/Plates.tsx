import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { Background, Price, Sparkles, SunRays, menuImg, usePop } from "../components";
import { COLORS, FONT_HEAVY, FONT_ROUND } from "../theme";

const PLATES = [
  { name: "プレーンナン\nプレート", img: "plain-naan-plate", ex: 428, inc: 470 },
  { name: "ガーリックチーズナン\nプレート", img: "garlic-cheese-naan-plate", ex: 573, inc: 630 },
];

const EXTRAS = [
  { name: "追加モーニングソース44g", img: "curry-sauce", ex: 76, inc: 83 },
  { name: "追加モーニングサラダ", img: "salad", ex: 91, inc: 100 },
];

export const Plates: React.FC = () => {
  const frame = useCurrentFrame();
  const head = usePop(0);
  const band = usePop(52, 14, 120);
  return (
    <Background>
      <SunRays x={540} y={700} opacity={0.2} />
      <Sparkles color={COLORS.sunLight} count={10} seed={21} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 170 }}>
        <div style={{ fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 96, color: COLORS.red, transform: `scale(${head})` }}>
          ナンもえらべる！
        </div>
        {PLATES.map((p, i) => {
          const s = usePop(10 + i * 14, 13, 120);
          const fromLeft = i === 0;
          const spin = interpolate(frame, [0, 150], [0, fromLeft ? 6 : -6]);
          return (
            <div
              key={p.img}
              style={{
                display: "flex",
                flexDirection: fromLeft ? "row" : "row-reverse",
                alignItems: "center",
                width: 1080,
                marginTop: i === 0 ? 40 : 10,
                transform: `translateX(${interpolate(s, [0, 1], [fromLeft ? -1100 : 1100, 0])}px)`,
              }}
            >
              <Img
                src={menuImg(p.img)}
                style={{
                  width: 620,
                  margin: fromLeft ? "0 0 0 -60px" : "0 -60px 0 0",
                  transform: `rotate(${spin}deg)`,
                  filter: "drop-shadow(0 24px 24px rgba(80,40,0,0.25))",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div
                  style={{
                    fontFamily: FONT_HEAVY,
                    fontWeight: 900,
                    fontSize: p.name.length > 12 ? 50 : 62,
                    lineHeight: 1.25,
                    whiteSpace: "pre",
                    textAlign: "center",
                    color: COLORS.ink,
                    marginBottom: 14,
                  }}
                >
                  {p.name}
                </div>
                <Price ex={p.ex} inc={p.inc} size={120} />
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: interpolate(band, [0, 1], [-500, 0]),
          background: COLORS.yellow,
          padding: "36px 40px 70px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {EXTRAS.map((e) => (
          <div key={e.name} style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <Img src={menuImg(e.img)} style={{ width: 170, filter: "drop-shadow(0 8px 8px rgba(0,0,0,0.2))" }} />
            <div style={{ fontFamily: FONT_ROUND, fontWeight: 800 }}>
              <div style={{ fontSize: 50, color: COLORS.ink }}>{e.name}</div>
              <div style={{ fontSize: 46, color: COLORS.red }}>
                税抜{e.ex}円 <span style={{ color: COLORS.ink, fontSize: 38 }}>（税込{e.inc}円）</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Background>
  );
};
