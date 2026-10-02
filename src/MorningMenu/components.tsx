import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_HEAVY, FONT_ROUND } from "./theme";

export const menuImg = (name: string) => staticFile(`menu/${name}.png`);

/** Spring that starts at `delay` frames into the current sequence. */
export const usePop = (delay = 0, damping = 12, stiffness = 180) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness } });
};

/** Rotating sunburst used behind most scenes. */
export const SunRays: React.FC<{
  color?: string;
  opacity?: number;
  x?: number;
  y?: number;
  rays?: number;
  speed?: number;
}> = ({ color = COLORS.sunLight, opacity = 0.25, x = 540, y = 960, rays = 24, speed = 0.25 }) => {
  const frame = useCurrentFrame();
  const r = 2400;
  const step = 360 / rays;
  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width={1080} height={1920}>
        <g transform={`translate(${x} ${y}) rotate(${frame * speed})`}>
          {new Array(rays).fill(0).map((_, i) => {
            const a1 = ((i * step - step / 4) * Math.PI) / 180;
            const a2 = ((i * step + step / 4) * Math.PI) / 180;
            return (
              <path
                key={i}
                d={`M0 0 L${Math.cos(a1) * r} ${Math.sin(a1) * r} L${Math.cos(a2) * r} ${Math.sin(a2) * r} Z`}
                fill={color}
              />
            );
          })}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const Background: React.FC<{ from?: string; to?: string; children?: React.ReactNode }> = ({
  from = COLORS.cream,
  to = COLORS.butter,
  children,
}) => (
  <AbsoluteFill style={{ background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` }}>
    {children}
  </AbsoluteFill>
);

/** Text whose characters bounce in one after another. */
export const PopText: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  from?: "bottom" | "scale";
}> = ({ text, delay = 0, stagger = 2, style, from = "bottom" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <span style={{ display: "inline-flex", whiteSpace: "pre", ...style }}>
      {Array.from(text).map((ch, i) => {
        const s = spring({
          frame: frame - delay - i * stagger,
          fps,
          config: { damping: 10, stiffness: 200 },
        });
        const transform =
          from === "scale"
            ? `scale(${interpolate(s, [0, 1], [2.6, 1])})`
            : `translateY(${interpolate(s, [0, 1], [120, 0])}px) scale(${interpolate(s, [0, 1], [0.4, 1])})`;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform,
              opacity: interpolate(s, [0, 0.2], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
};

export const Pill: React.FC<{
  children: React.ReactNode;
  bg?: string;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, bg = COLORS.green, color = COLORS.white, style }) => (
  <div
    style={{
      background: bg,
      color,
      borderRadius: 999,
      padding: "14px 48px",
      fontFamily: FONT_ROUND,
      fontWeight: 800,
      fontSize: 56,
      boxShadow: "0 10px 0 rgba(0,0,0,0.12)",
      ...style,
    }}
  >
    {children}
  </div>
);

/** "税抜 537円 (税込590円)" price block. */
export const Price: React.FC<{
  ex: number;
  inc: number;
  size?: number;
  color?: string;
  subColor?: string;
  count?: boolean;
  delay?: number;
}> = ({ ex, inc, size = 140, color = COLORS.red, subColor = COLORS.ink, count = false, delay = 0 }) => {
  const frame = useCurrentFrame();
  const value = count
    ? Math.round(
        interpolate(frame - delay, [0, 24], [0, ex], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: (t) => 1 - Math.pow(1 - t, 3),
        }),
      )
    : ex;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: FONT_HEAVY }}>
      <div style={{ display: "flex", alignItems: "baseline", color, fontWeight: 900, lineHeight: 1 }}>
        <span style={{ fontSize: size * 0.32, marginRight: size * 0.06 }}>税抜</span>
        <span style={{ fontSize: size, fontVariantNumeric: "tabular-nums", letterSpacing: -2 }}>{value}</span>
        <span style={{ fontSize: size * 0.62 }}>円</span>
      </div>
      <div style={{ color: subColor, fontWeight: 700, fontSize: size * 0.3, marginTop: size * 0.06 }}>
        （税込 {inc}円）
      </div>
    </div>
  );
};

/** Image that floats gently up and down. */
export const Bob: React.FC<{
  src: string;
  width: number;
  amp?: number;
  period?: number;
  phase?: number;
  style?: React.CSSProperties;
}> = ({ src, width, amp = 10, period = 50, phase = 0, style }) => {
  const frame = useCurrentFrame();
  const y = Math.sin(((frame + phase) / period) * Math.PI * 2) * amp;
  return (
    <Img
      src={src}
      style={{
        width,
        transform: `translateY(${y}px)`,
        filter: "drop-shadow(0 24px 24px rgba(80,40,0,0.25))",
        ...style,
      }}
    />
  );
};

/** Little floating sparkles to keep frames alive. */
export const Sparkles: React.FC<{ color?: string; count?: number; seed?: number }> = ({
  color = COLORS.white,
  count = 14,
  seed = 1,
}) => {
  const frame = useCurrentFrame();
  const rand = (n: number) => {
    const x = Math.sin(n * 9301 + seed * 49297) * 233280;
    return x - Math.floor(x);
  };
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(count).fill(0).map((_, i) => {
        const x = rand(i) * 1080;
        const baseY = rand(i + 100) * 1920;
        const size = 10 + rand(i + 200) * 22;
        const y = (baseY - frame * (1 + rand(i + 300) * 2) + 1920) % 1920;
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(frame / 12 + i));
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="-10 -10 20 20"
            style={{ position: "absolute", left: x, top: y, opacity: twinkle }}
          >
            <path d="M0 -10 Q1.5 -1.5 10 0 Q1.5 1.5 0 10 Q-1.5 1.5 -10 0 Q-1.5 -1.5 0 -10Z" fill={color} />
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};
