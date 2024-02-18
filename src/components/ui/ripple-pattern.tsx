import { cn } from "@/lib/utils";

type NetscanRipplePatternProps = {
  className?: string;
};

const NetscanRipplePattern = ({ className }: NetscanRipplePatternProps) => {
  return (
    <div className={className}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className={cn(
              "border rounded-full animate-[ripple_5s_ease-in-out_infinite]"
            )}
            style={{
              width: `${80 * (i + 1)}px`,
              height: `${80 * (i + 1)}px`,
              border: `1px solid rgba(23, 105, 178, ${0.3 - i * 0.04})`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default NetscanRipplePattern;
