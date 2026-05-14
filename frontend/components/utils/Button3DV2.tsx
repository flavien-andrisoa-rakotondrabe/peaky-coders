"use client";

import Image from "next/image";

import { ComponentType, useState, useRef, useId, useLayoutEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Slot } from "@radix-ui/react-slot";

type Button3DV2Props = {
  asChild?: boolean;
  Icon?: ComponentType;
  label: string | React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  color?: string;
  customGradient?: string | null;
  left_iconSrc?: string | null;
  right_iconSrc?: string | null;
  ariaLabel?: string | null;
  disabled?: boolean;
  textColor?: string;
  fullWidth?: boolean;
  gradientAngle?: number;
  breakpoints?: {
    tw: "sm" | "md" | "lg" | "xl" | "2xl";
    width: number;
    height: number;
    fontSize: number;
  }[];
};

const HIGHLIGHT_WHITE = "255,255,255";
const COLOR_MAP: Record<string, string> = {
  red: "#cf1616",
  blue: "#1e6fff",
  yellow: "#f5c22b",
  purple: "#9b5cff",
  white: "#ffffff",
};
const namedToHex = (v?: string) =>
  v ? COLOR_MAP[v.toLowerCase()] ?? v : "#cf1616";
const clamp = (v: number, a = 0, b = 255) =>
  Math.min(b, Math.max(a, Math.round(v)));
const hexToRgb = (hex: string) => {
  const h = hex.replace("#", "");
  const f =
    h.length === 3
      ? h
        .split("")
        .map((c) => c + c)
        .join("")
      : h;
  const n = parseInt(f, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};
const rgbToHex = (r: number, g: number, b: number) =>
  "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
const shade = (hex: string, p: number) => {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    clamp(r + (255 - r) * p),
    clamp(g + (255 - g) * p),
    clamp(b + (255 - b) * p),
  );
};
const darken = (hex: string, p: number) => {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(clamp(r * (1 - p)), clamp(g * (1 - p)), clamp(b * (1 - p)));
};
const buildStops = (hex: string) => [
  shade(hex, 0.22),
  shade(hex, 0.06),
  hex,
  darken(hex, 0.22),
  darken(hex, 0.4),
];
const angleToGradientCoords = (deg: number) => {
  const r = (deg - 90) * (Math.PI / 180);
  const x = Math.cos(r);
  const y = Math.sin(r);
  return { x1: 0.5 - x / 2, y1: 0.5 - y / 2, x2: 0.5 + x / 2, y2: 0.5 + y / 2 };
};

// Mapping Tailwind breakpoints to pixel widths
const tailwindBreakpointsPx: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export default function Button3DV2({
  asChild,
  Icon,
  label,
  type = "button",
  onClick,
  className = "",
  iconClassName,
  color = "red",
  customGradient = null,
  left_iconSrc,
  right_iconSrc,
  ariaLabel,
  disabled = false,
  textColor,
  fullWidth,
  gradientAngle = 180,
  breakpoints = [
    { tw: "lg", width: 140, height: 48, fontSize: 16 },
    { tw: "sm", width: 80, height: 38, fontSize: 12 }, // default mobile
  ],
}: Button3DV2Props) {
  const Comp = asChild ? Slot : "button";
  const baseColor = namedToHex(color);
  const stops = customGradient
    ? customGradient.split(",").map((s) => s.trim())
    : buildStops(baseColor);
  const { x1, y1, x2, y2 } = angleToGradientCoords(gradientAngle);

  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const [textBBoxWidth, setTextBBoxWidth] = useState(0);

  // Determine active breakpoint - call all hooks unconditionally
  const isLg = useMediaQuery(`(min-width: ${tailwindBreakpointsPx.lg}px)`);
  const isXl = useMediaQuery(`(min-width: ${tailwindBreakpointsPx.xl}px)`);
  const is2xl = useMediaQuery(`(min-width: ${tailwindBreakpointsPx["2xl"]}px)`);
  const isMd = useMediaQuery(`(min-width: ${tailwindBreakpointsPx.md}px)`);
  const isSm = useMediaQuery(`(min-width: ${tailwindBreakpointsPx.sm}px)`);

  // Determine active breakpoint after hooks
  let appliedBp = breakpoints[breakpoints.length - 1]; // default smallest
  for (const bp of breakpoints) {
    const isActive = (() => {
      switch (bp.tw) {
        case "2xl":
          return is2xl;
        case "xl":
          return isXl;
        case "lg":
          return isLg;
        case "md":
          return isMd;
        case "sm":
          return isSm;
        default:
          return false;
      }
    })();
    if (isActive) {
      appliedBp = bp;
      break;
    }
  }

  const baseHeight = appliedBp.height;
  const fontInternal = appliedBp.fontSize;
  const iconH = Math.max(12, Math.round(baseHeight * 0.45));
  const txtColor = textColor ? namedToHex(textColor) : "#ffffff";

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const bbox = textRef.current.getBBox();
    const nextBBoxWidth = Math.round(bbox.width);

    setTextBBoxWidth((prev) => (prev === nextBBoxWidth ? prev : nextBBoxWidth));

    const iconSpacing = appliedBp.tw === "sm" ? 8 : 32;
    const horizontalPadding = appliedBp.tw === "sm" ? 12 : 24;

    const extraSpace =
      horizontalPadding * 2 +
      (left_iconSrc || Icon ? iconH + iconSpacing : 0) +
      (right_iconSrc ? iconH + iconSpacing : 0);

    const nextTextWidth = nextBBoxWidth + extraSpace;

    setTextWidth((prev) => (prev === nextTextWidth ? prev : nextTextWidth));
  }, [
    label,
    fontInternal,
    left_iconSrc,
    right_iconSrc,
    Icon,
    appliedBp.tw,
    iconH,
  ]);

  const [parentWidth, setParentWidth] = useState<number | null>(null);
  useLayoutEffect(() => {
    if (!svgRef.current?.parentElement) return;

    const parent = svgRef.current.parentElement;
    let frame: number | null = null;

    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setParentWidth((prev) => (prev === width ? prev : width));
      });
    });

    observer.observe(parent);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const finalWidth = fullWidth
    ? Math.max(parentWidth ?? 0, textWidth, appliedBp.width)
    : Math.max(appliedBp.width, textWidth);
  const rx = baseHeight / 2;
  const hasLeftIcon = Icon || left_iconSrc;
  const iconSpacing = appliedBp.tw === "sm" ? 8 : 12;
  const horizontalPadding = appliedBp.tw === "sm" ? 12 : 24;
  const contentWidth = hasLeftIcon
    ? iconH + iconSpacing + textBBoxWidth
    : textBBoxWidth;
  const groupStartX = (finalWidth - contentWidth) / 2;
  const iconX = hasLeftIcon ? groupStartX : 0;
  const textX = hasLeftIcon
    ? groupStartX + iconH + iconSpacing + textBBoxWidth / 2
    : finalWidth / 2;
  const id = useId();
  const gradId = `g-${id}`;
  const maskId = `m-${id}`;
  const topId = `t-${id}`;
  const cornerId = `c-${id}`;
  const triId = `tr-${id}`;
  const shineId = `sh-${id}`;

  const [isHovered, setHovered] = useState(false);
  const [isPressed, setPressed] = useState(false);
  const shadowY = isPressed ? 2 : isHovered ? -2 : 4;
  const translateY = isPressed ? 2 : 0;
  const blurTop = isHovered ? 6 : 3;
  const blurCorner = isHovered ? 16 : 12;
  const blurSafeTop = blurTop * 1.25;

  return (
    <Comp
      type={type}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      disabled={disabled}
      className={`relative p-0 transition-transform duration-150 rounded-full ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        } ${className}`}
      style={{
        width: fullWidth ? "100%" : finalWidth,
        height: baseHeight,
        transform: `translateY(${translateY}px)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <span className="absolute inset-0 flex justify-center items-center rounded-full">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${finalWidth} ${baseHeight}`}
          preserveAspectRatio="xMidYMid meet"
          style={{
            filter: `drop-shadow(0 ${shadowY}px 8px rgba(0,0,0,0.3))`,
            transition: "filter 0.15s, transform 0.15s",
            width: "100%",
            height: "100%",
          }}
        >
          <defs>
            <linearGradient id={gradId} x1={x1} y1={y1} x2={x2} y2={y2}>
              {stops.map((s, i) => (
                <stop
                  key={i}
                  offset={`${(i / (stops.length - 1)) * 100}%`}
                  stopColor={s}
                />
              ))}
            </linearGradient>
            <linearGradient id={topId} x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor={`rgba(${HIGHLIGHT_WHITE},0.95)`} />
              <stop offset="20%" stopColor={`rgba(${HIGHLIGHT_WHITE},0.35)`} />
              <stop offset="100%" stopColor={`rgba(${HIGHLIGHT_WHITE},0)`} />
            </linearGradient>
            <radialGradient id={cornerId} cx="88%" cy="14%" r="42%">
              <stop offset="0%" stopColor={`rgba(${HIGHLIGHT_WHITE},0.9)`} />
              <stop offset="35%" stopColor={`rgba(${HIGHLIGHT_WHITE},0.55)`} />
              <stop offset="100%" stopColor={`rgba(${HIGHLIGHT_WHITE},0)`} />
            </radialGradient>
            <linearGradient id={triId} x1={x1} y1={y1} x2={x2} y2={y2}>
              <stop offset="0%" stopColor={`rgba(${HIGHLIGHT_WHITE},0.9)`} />
              <stop offset="55%" stopColor={`rgba(${HIGHLIGHT_WHITE},0.35)`} />
              <stop offset="100%" stopColor={`rgba(${HIGHLIGHT_WHITE},0)`} />
            </linearGradient>
            <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <mask id={maskId}>
              <rect
                width={finalWidth}
                height={baseHeight}
                rx={rx}
                fill="#fff"
              />
            </mask>
          </defs>

          {/* Base */}
          <g mask={`url(#${maskId})`}>
            <rect
              x={6}
              y={6}
              width={finalWidth - 12}
              height={baseHeight - 12}
              rx={rx}
              fill={darken(baseColor, 0.28)}
            />
            <rect
              x={4}
              y={2}
              width={finalWidth - 8}
              height={baseHeight - 4}
              rx={rx}
              fill={`url(#${gradId})`}
            />
          </g>

          {/* Highlights */}
          <g mask={`url(#${maskId})`}>
            <rect
              x={finalWidth * 0.06}
              y={baseHeight * 0.06 + blurSafeTop}
              width={finalWidth * 0.88 - blurSafeTop}
              height={baseHeight * 0.11}
              rx={baseHeight * 0.22}
              fill={`url(#${topId})`}
              style={{ filter: `blur(${blurTop}px)`, mixBlendMode: "overlay" }}
            />
            <ellipse
              cx={finalWidth * 0.86}
              cy={baseHeight * 0.18}
              rx={finalWidth * 0.14}
              ry={baseHeight * 0.38}
              fill={`url(#${cornerId})`}
              style={{
                filter: `blur(${blurCorner}px)`,
                mixBlendMode: "screen",
              }}
            />
            <path
              d={`
              M ${finalWidth * 0.76} ${baseHeight * 0.07}
              Q ${finalWidth * 0.94} ${baseHeight * 0.07} ${finalWidth * 0.92
                } ${baseHeight * 0.46}
              Q ${finalWidth * 0.86} ${baseHeight * 0.28} ${finalWidth * 0.76
                } ${baseHeight * 0.07}
              Z
            `}
              fill={`url(#${triId})`}
              style={{ mixBlendMode: "screen" }}
            />
          </g>

          {/* Shine overlay */}
          {isHovered && (
            <rect
              x={-finalWidth}
              y={0}
              width={finalWidth}
              height={baseHeight}
              rx={rx}
              fill={`url(#${shineId})`}
            >
              <animate
                attributeName="x"
                from={-finalWidth}
                to={finalWidth}
                dur="0.8s"
                repeatCount="1"
                fill="freeze"
              />
            </rect>
          )}

          {/* Label */}
          {typeof label === 'string' ? (
            <text
              ref={textRef}
              x={textX}
              y="52%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-geist-sans), Inter, Arial, Helvetica, sans-serif"
              fontWeight={600}
              fontSize={fontInternal}
              fill={txtColor}
            >
              {label}
            </text>
          ) : (
            <foreignObject
              x={0}
              y={0}
              width={finalWidth}
              height={baseHeight}
            >
              <div
                className="flex items-center justify-center w-full h-full"
                style={{
                  fontFamily: "var(--font-geist-sans), Inter, Arial, Helvetica, sans-serif",
                  fontWeight: 600,
                  fontSize: fontInternal,
                  color: txtColor,
                }}
              >
                {label}
              </div>
            </foreignObject>
          )}
        </svg>

        {/* Icons */}

        {Icon && (
          <span
            className={`${iconClassName} absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none`}
            style={{
              left: `${iconX}px`,
              width: iconH,
              height: iconH,
            }}
          >
            <Icon size={iconH} />
          </span>
        )}
        {left_iconSrc && (
          <span
            className={`${iconClassName} absolute left-6 top-[52%] -translate-y-[52%] flex pointer-events-none`}
          >
            <Image src={left_iconSrc} alt="" width={iconH} height={iconH} />
          </span>
        )}
        {right_iconSrc && (
          <span
            className={`${iconClassName} absolute right-6 top-[52%] -translate-y-[52%] flex pointer-events-none`}
          >
            <Image src={right_iconSrc} alt="" width={iconH} height={iconH} />
          </span>
        )}
      </span>
    </Comp>
  );
}
