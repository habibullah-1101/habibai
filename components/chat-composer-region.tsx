import { ComposerPill } from "@/components/composer-pill";
import type { ComponentProps, CSSProperties } from "react";

type ComposerRegionProps = {
  className?: string;
  style?: CSSProperties;
  value: string;
  onChange: (value: string) => void;
  leftActions: ComponentProps<typeof ComposerPill>["leftActions"];
  rightActions: ComponentProps<typeof ComposerPill>["rightActions"];
  onSend: () => void;
};

export function ChatComposerRegion({
  className,
  style,
  value,
  onChange,
  leftActions,
  rightActions,
  onSend,
}: ComposerRegionProps) {
  return (
    <div className={className} style={style}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <ComposerPill
          value={value}
          onChange={onChange}
          leftActions={leftActions}
          rightActions={rightActions}
          onSend={onSend}
        />
      </form>
    </div>
  );
}
