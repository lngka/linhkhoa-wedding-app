/** Light sweeping across a stained-glass image, confined to the image's opaque pixels. */
export function GlassShimmer({ src, delay = 0, className = '' }: { src: string; delay?: number; className?: string }) {
  const mask = `url("${src}") center / 100% 100% no-repeat`
  return (
    <div
      aria-hidden
      className={`shimmer absolute inset-0 ${className}`}
      style={{ WebkitMask: mask, mask, animationDelay: `${delay}s` }}
    />
  )
}
