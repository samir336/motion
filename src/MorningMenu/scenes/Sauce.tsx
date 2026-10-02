import { AbsoluteFill, interpolate } from "remotion";
import { Background, Bob, PopText, Sparkles, SunRays, menuImg, usePop } from "../components";
import { COLORS, FONT_HEAVY, FONT_ROUND } from "../theme";

const SAUCES = ["ポーク", "ポーク甘口", "ココイチベジソース"];

export const Sauce: React.FC = () => {
  const tail = usePop(46);
  const bowl = usePop(10, 12, 120);
  return (
    <Background>
      <SunRays x={540} y={1450} opacity={0.25} />
      <Sparkles color={COLORS.sunLight} count={10} seed={9} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 220, fontFamily: FONT_HEAVY, fontWeight: 900 }}>
        <div style={{ fontSize: 120, color: COLORS.red }}>
          <PopText text="カレーソースは、" stagger={2} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 50, width: 860 }}>
          {SAUCES.map((name, i) => {
            const s = usePop(14 + i * 9, 13, 170);
            const dir = i % 2 === 0 ? -1 : 1;
            return (
              <div
                key={name}
                style={{
                  transform: `translateX(${interpolate(s, [0, 1], [dir * 1100, 0])}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 30,
                  background: COLORS.white,
                  border: `6px solid ${COLORS.red}`,
                  borderRadius: 30,
                  padding: "22px 36px",
                  boxShadow: "0 10px 0 rgba(208,17,43,0.25)",
                }}
              >
                <div
                  style={{
                    width: 92,
                    height: 92,
                    borderRadius: "50%",
                    background: COLORS.red,
                    color: COLORS.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 58,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontSize: name.length > 6 ? 68 : 84, color: COLORS.ink }}>{name}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 50, fontSize: 76, color: COLORS.red, opacity: tail, transform: `translateY(${interpolate(tail, [0, 1], [40, 0])}px)` }}>
          からお選びいただけます。
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 110 }}>
        <div style={{ transform: `scale(${bowl})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Bob src={menuImg("curry-sauce")} width={500} />
          <div
            style={{
              marginTop: 16,
              background: COLORS.red,
              color: COLORS.white,
              fontFamily: FONT_ROUND,
              fontWeight: 800,
              fontSize: 34,
              borderRadius: 12,
              padding: "6px 24px",
            }}
          >
            写真はココイチベジソースです。
          </div>
        </div>
      </AbsoluteFill>
    </Background>
  );
};
