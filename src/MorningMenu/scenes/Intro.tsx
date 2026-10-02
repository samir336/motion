import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background, PopText, Sparkles, SunRays, usePop } from "../components";
import { COLORS, FONT_HEAVY, FONT_ROUND } from "../theme";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = usePop(0, 16, 80);
  const box = usePop(22);
  const sunY = interpolate(rise, [0, 1], [1500, 960]);
  const pulse = 1 + Math.sin(frame / 6) * 0.015;

  return (
    <Background>
      <SunRays x={540} y={sunY} color={COLORS.sunLight} opacity={0.35} rays={28} speed={0.6} />
      <Sparkles color={COLORS.sun} count={10} seed={3} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 210 }}>
        <div
          style={{
            fontFamily: FONT_ROUND,
            fontWeight: 800,
            fontSize: 64,
            letterSpacing: 12,
            color: COLORS.sun,
          }}
        >
          <PopText text="GOOD MORNING!" delay={4} stagger={1} />
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 540 - 380,
          top: sunY - 380,
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: `radial-gradient(circle at 40% 35%, ${COLORS.sunLight}, ${COLORS.sun} 70%)`,
          boxShadow: `0 0 120px ${COLORS.sunLight}`,
          transform: `scale(${pulse})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.white,
          fontFamily: FONT_HEAVY,
          fontWeight: 900,
        }}
      >
        <div style={{ fontSize: 220, lineHeight: 1.05, textShadow: "0 8px 0 rgba(0,0,0,0.15)" }}>
          <PopText text="朝限定" delay={14} stagger={4} from="scale" />
        </div>
        <div style={{ fontSize: 96, marginTop: 10, opacity: interpolate(frame, [28, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          5:00〜10:30
        </div>
      </div>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 250 }}>
        <div
          style={{
            transform: `translateY(${interpolate(box, [0, 1], [300, 0])}px)`,
            background: COLORS.white,
            border: `5px solid ${COLORS.sunLight}`,
            borderRadius: 20,
            padding: "26px 60px",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 72, color: COLORS.sun }}>
            JR五反田駅東口店限定
          </div>
        </div>
      </AbsoluteFill>
    </Background>
  );
};
