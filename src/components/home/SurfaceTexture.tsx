import type { CSSProperties, ReactNode, Ref } from "react";
import { cn } from "@/lib/cn";

type SurfaceTextureProps = {
  children: ReactNode;
  className?: string;
  clipPath?: string;
  surfaceRef?: Ref<HTMLDivElement>;
  tone?: "page" | "orange";
  underlay?: ReactNode;
};

type SurfaceStyle = CSSProperties & {
  "--surface-clip"?: string;
};

export function SurfaceTexture({
  children,
  className,
  clipPath,
  surfaceRef,
  tone = "page",
  underlay,
}: SurfaceTextureProps) {
  const style: SurfaceStyle | undefined = clipPath
    ? { "--surface-clip": clipPath, clipPath }
    : undefined;

  return (
    <div
      ref={surfaceRef}
      className={cn("surface", `surface--${tone}`, className)}
      style={style}
    >
      {underlay ? <div className="surface__underlay">{underlay}</div> : null}
      <div className="surface__content">{children}</div>
    </div>
  );
}
