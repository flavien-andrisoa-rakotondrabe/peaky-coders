// ─── LiveDot ──────────────────────────────────────────────────
const DOT_COLORS = {
  green:  { ring: "bg-green-500/20",  dot: "bg-green-500"  },
  orange: { ring: "bg-orange-500/20", dot: "bg-orange-500" },
  red:    { ring: "bg-red-500/20",    dot: "bg-red-500"    },
  blue:   { ring: "bg-blue-500/20",   dot: "bg-blue-500"   },
};

export function LiveDot({
  color = "green",
}: {
  color?: keyof typeof DOT_COLORS;
}) {
  const { ring, dot } = DOT_COLORS[color];

  return (
    <span className={`relative inline-flex w-3 h-3 rounded-full ${ring}`}>
      <span
        className={`absolute inset-0.5 rounded-full ${dot} animate-ping opacity-75`}
      />
      <span className={`absolute inset-0.5 rounded-full ${dot}`} />
    </span>
  );
}