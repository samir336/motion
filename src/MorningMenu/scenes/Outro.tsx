import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { Background, PopText, Sparkles, SunRays, menuImg, usePop } from "../components";
import { COLORS, FONT_HEAVY, FONT_ROUND } from "../theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const logo = usePop(0);
  const sun = usePop(18, 10, 140);
  const store = usePop(34);
  const fade = interpolate(frame, [95, 105], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Background from={COLORS.sunLight} to={COLORS.sun}>
      <SunRays x={540} y={1000} color={COLORS.yellow} opacity={0.35} rays={30} speed={0.7} />
      <Sparkles count={20} seed={23} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 200, opacity: fade }}>
        <div
          style={{
            transform: `scale(${logo})`,
            background: COLORS.white,
            borderRadius: 999,
            padding: "30px 70px",
            boxShadow: "0 14px 0 rgba(0,0,0,0.12)",
          }}
        >
          <Img src={menuImg("logo")} style={{ width: 600 }} />
        </div>
        <div style={{ marginTop: 80, fontFamily: FONT_ROUND, fontWeight: 800, fontSize: 60, color: COLORS.white, textShadow: "0 6px 0 rgba(0,0,0,0.15)" }}>
          <PopText text="朝をもっと、おいしく、" delay={8} stagger={1} />
          <br />
          <PopText text="もっと前向きに。" delay={18} stagger={1} />
        </div>
        <div
          style={{
            marginTop: 90,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: COLORS.white,
            color: COLORS.sun,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            transform: `scale(${sun}) rotate(${interpolate(sun, [0, 1], [-90, 0])}deg)`,
            boxShadow: "0 20px 0 rgba(0,0,0,0.12)",
          }}
        >
          <div style={{ fontSize: 110, color: COLORS.red, lineHeight: 1.1 }}>朝ココ</div>
          <div style={{ fontSize: 140, lineHeight: 1.1 }}>朝限定</div>
          <div style={{ fontSize: 74 }}>5:00〜10:30</div>
        </div>
        <div
          style={{
            marginTop: 90,
            transform: `translateY(${interpolate(store, [0, 1], [300, 0])}px)`,
            opacity: store,
            background: COLORS.red,
            color: COLORS.white,
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            fontSize: 70,
            borderRadius: 20,
            padding: "20px 56px",
          }}
        >
          JR五反田駅東口店限定
        </div>
      </AbsoluteFill>
    </Background>
  );
};
