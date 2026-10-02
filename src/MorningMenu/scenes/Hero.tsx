import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { Background, Sparkles, SunRays, menuImg, usePop } from "../components";
import { COLORS, FONT_HEAVY, FONT_ROUND } from "../theme";

const FEATURES = [
  { label: "とろ〜り\nチーズナン", img: "hero-plate", bg: "88% 72%", size: "380%" },
  { label: "サラダで\n野菜をプラス", img: "salad", bg: "center", size: "cover" },
  { label: "スパイス\n香るカレー", img: "curry-sauce", bg: "center", size: "cover" },
];

export const Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const plate = usePop(0, 14, 90);
  const bubble = usePop(16);
  const zoom = interpolate(frame, [0, 120], [1, 1.12]);

  return (
    <Background from={COLORS.butter} to={COLORS.yellow}>
      <SunRays x={540} y={900} opacity={0.22} color={COLORS.white} />
      <Sparkles count={14} seed={11} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 170 }}>
        <div
          style={{
            transform: `scale(${bubble})`,
            background: COLORS.white,
            borderRadius: 40,
            padding: "36px 56px",
            fontFamily: FONT_ROUND,
            fontWeight: 800,
            fontSize: 58,
            lineHeight: 1.45,
            color: COLORS.ink,
            textAlign: "center",
            boxShadow: "0 14px 0 rgba(0,0,0,0.08)",
            position: "relative",
          }}
        >
          とろ〜りチーズナンと、
          <br />
          カレー、サラダの
          <br />
          <span style={{ color: COLORS.red }}>うれしい朝プレート。</span>
          <div
            style={{
              position: "absolute",
              bottom: -36,
              left: "50%",
              marginLeft: -30,
              borderLeft: "30px solid transparent",
              borderRight: "30px solid transparent",
              borderTop: `40px solid ${COLORS.white}`,
            }}
          />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 120 }}>
        <Img
          src={menuImg("hero-plate")}
          style={{
            width: 1180,
            transform: `translateX(${interpolate(plate, [0, 1], [1100, 0])}px) rotate(${interpolate(plate, [0, 1], [35, 0])}deg) scale(${zoom})`,
            filter: "drop-shadow(0 40px 40px rgba(80,40,0,0.3))",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "flex-end", paddingBottom: 150 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 46 }}>
          {FEATURES.map((f, i) => {
            const s = usePop(40 + i * 8);
            return (
              <div key={f.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${s})` }}>
                <div
                  style={{
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    border: `8px solid ${COLORS.white}`,
                    backgroundColor: COLORS.white,
                    backgroundImage: `url(${menuImg(f.img)})`,
                    backgroundSize: f.size,
                    backgroundPosition: f.bg,
                    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
                  }}
                />
                <div
                  style={{
                    marginTop: 18,
                    fontFamily: FONT_HEAVY,
                    fontWeight: 900,
                    fontSize: 44,
                    lineHeight: 1.25,
                    textAlign: "center",
                    whiteSpace: "pre",
                    color: COLORS.ink,
                  }}
                >
                  {f.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Background>
  );
};
