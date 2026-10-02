import { AbsoluteFill, Img, interpolate } from "remotion";
import { Background, Pill, Price, Sparkles, SunRays, menuImg, usePop } from "../components";
import { COLORS, FONT_HEAVY, FONT_ROUND } from "../theme";

const TOPPINGS = [
  { name: "ゆでタマゴ（半分2個）", img: "boiled-egg", ex: 130, inc: 143 },
  { name: "ハーフスクランブルエッグ", img: "scrambled-egg", ex: 110, inc: 121 },
  { name: "ソーセージ（2本）", img: "sausage", ex: 180, inc: 198 },
];

export const Toppings: React.FC = () => {
  const head = usePop(0);
  const foot = usePop(40);
  return (
    <Background>
      <SunRays x={1000} y={200} opacity={0.25} />
      <Sparkles color={COLORS.sunLight} count={10} seed={17} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 190 }}>
        <div style={{ transform: `scale(${head})` }}>
          <Pill bg={COLORS.red} style={{ fontSize: 90, borderRadius: 20, padding: "16px 60px" }}>
            おすすめトッピング
          </Pill>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 40, marginTop: 70 }}>
          {TOPPINGS.map((t, i) => {
            const s = usePop(10 + i * 8, 12, 150);
            return (
              <div
                key={t.name}
                style={{
                  width: 920,
                  height: 300,
                  background: COLORS.white,
                  borderRadius: 40,
                  border: `5px solid ${COLORS.red}`,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 40px",
                  gap: 40,
                  transform: `translateX(${interpolate(s, [0, 1], [1200, 0])}px) rotate(${interpolate(s, [0, 1], [8, 0])}deg)`,
                  boxShadow: "0 12px 0 rgba(0,0,0,0.08)",
                }}
              >
                <div style={{ width: 260, height: 220, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Img src={menuImg(t.img)} style={{ width: 260, height: 220, objectFit: "contain", filter: "drop-shadow(0 12px 10px rgba(0,0,0,0.2))" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                  <div style={{ fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 44, color: COLORS.ink, whiteSpace: "nowrap" }}>{t.name}</div>
                  <Price ex={t.ex} inc={t.inc} size={120} />
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 70,
            textAlign: "center",
            fontFamily: FONT_ROUND,
            fontWeight: 800,
            fontSize: 50,
            lineHeight: 1.5,
            color: COLORS.ink,
            opacity: foot,
            transform: `translateY(${interpolate(foot, [0, 1], [40, 0])}px)`,
          }}
        >
          他にもトッピングがいっぱい！
          <br />
          <span style={{ color: COLORS.red }}>メニューブックをご覧下さい！</span>
        </div>
      </AbsoluteFill>
    </Background>
  );
};
