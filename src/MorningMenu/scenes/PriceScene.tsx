import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { Background, Price, Sparkles, SunRays, menuImg, usePop } from "../components";
import { COLORS, FONT_HEAVY, FONT_ROUND } from "../theme";

export const PriceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const head = usePop(0);
  const priceIn = usePop(6, 9, 160);
  const stamp = usePop(36, 8, 220);
  const plate = usePop(14, 14, 100);
  const beat = 1 + Math.max(0, Math.sin(((frame - 30) / 15) * Math.PI)) * 0.04 * (frame > 30 ? 1 : 0);

  return (
    <Background from={COLORS.red} to="#A80C22">
      <SunRays x={540} y={820} color={COLORS.white} opacity={0.1} rays={20} speed={0.8} />
      <Sparkles color={COLORS.yellow} count={18} seed={5} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 300, fontFamily: FONT_HEAVY, fontWeight: 900, color: COLORS.white }}>
        <div style={{ fontSize: 84, transform: `translateY(${interpolate(head, [0, 1], [-200, 0])}px)`, opacity: head }}>
          朝ココ チーズナンプレート
        </div>
        <div style={{ marginTop: 70, transform: `scale(${interpolate(priceIn, [0, 1], [0.2, 1]) * beat})` }}>
          <Price ex={537} inc={590} size={330} color={COLORS.yellow} subColor={COLORS.white} count delay={6} />
        </div>
        <div
          style={{
            marginTop: 60,
            transform: `scale(${interpolate(stamp, [0, 1], [3, 1])}) rotate(-8deg)`,
            opacity: interpolate(stamp, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
            background: COLORS.yellow,
            color: COLORS.red,
            fontFamily: FONT_ROUND,
            fontWeight: 800,
            fontSize: 80,
            borderRadius: 24,
            padding: "16px 54px",
            boxShadow: "0 12px 0 rgba(0,0,0,0.2)",
          }}
        >
          ドリンク付き！
        </div>
      </AbsoluteFill>
      <Img
        src={menuImg("hero-plate")}
        style={{
          position: "absolute",
          width: 980,
          left: 50,
          bottom: interpolate(plate, [0, 1], [-700, 70]),
          transform: `rotate(${interpolate(frame, [0, 90], [-6, 4])}deg)`,
          filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.35))",
        }}
      />
    </Background>
  );
};
