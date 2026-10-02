import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background, Pill, PopText, Sparkles, SunRays, usePop } from "../components";
import { COLORS, FONT_HEAVY } from "../theme";

const outline = (w: number, c: string) =>
  [`${w}px 0 ${c}`, `-${w}px 0 ${c}`, `0 ${w}px ${c}`, `0 -${w}px ${c}`, `${w}px ${w}px ${c}`, `-${w}px -${w}px ${c}`, `${w}px -${w}px ${c}`, `-${w}px ${w}px ${c}`].join(",");

export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const pill = usePop(26);
  // little camera shake when 朝ココ lands
  const shake = frame > 6 && frame < 18 ? Math.sin(frame * 3) * (18 - frame) * 1.2 : 0;

  return (
    <Background>
      <SunRays x={900} y={250} opacity={0.3} />
      <Sparkles color={COLORS.sunLight} count={12} seed={7} />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(${shake}px, ${shake * 0.6}px)`,
          fontFamily: FONT_HEAVY,
          fontWeight: 900,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", color: COLORS.red, textShadow: `${outline(8, COLORS.white)}, 0 18px 0 rgba(120,0,0,0.25)` }}>
          <span style={{ fontSize: 400, lineHeight: 1 }}>
            <PopText text="朝" from="scale" />
          </span>
          <span style={{ fontSize: 280, lineHeight: 1.05 }}>
            <PopText text="ココ" delay={5} stagger={3} from="scale" />
          </span>
        </div>
        <div style={{ transform: `scale(${pill}) rotate(-4deg)`, margin: "40px 0 60px" }}>
          <Pill style={{ fontSize: 66 }}>モーニングメニュー</Pill>
        </div>
        <div style={{ fontSize: 190, lineHeight: 1.1, color: COLORS.ink, textAlign: "center", textShadow: outline(6, COLORS.white) }}>
          <PopText text="チーズナン" delay={34} stagger={3} />
          <br />
          <PopText text="プレート" delay={48} stagger={3} />
        </div>
        <div
          style={{
            marginTop: 40,
            height: 16,
            width: interpolate(frame, [60, 75], [0, 760], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            background: COLORS.yellow,
            borderRadius: 8,
          }}
        />
      </AbsoluteFill>
    </Background>
  );
};
