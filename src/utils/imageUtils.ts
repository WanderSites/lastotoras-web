/**
 * Utilities for responsive images (srcset, sizes, WebP)
 */

export function getResponsiveSrcSet(src: string): string | undefined {
  if (!src || !src.endsWith('.webp')) return undefined;
  if (src.includes('-640w') || src.includes('-1024w')) return undefined;
  
  const basePath = src.replace(/\.webp$/, '');
  return `${basePath}-640w.webp 640w, ${basePath}-1024w.webp 1024w, ${src} 1600w`;
}
