/**
 * Helper to retrieve pregenerated blur placeholder data URIs.
 * Used by next/image with `placeholder="blur"`.
 *
 * The map is generated offline by `scripts/generate-blur.py`.
 * Run that script after adding new images.
 */

import blurData from "./blur-data.json";

const BLUR_MAP = blurData as Record<string, string>;

/**
 * 1×1 transparent fallback. Used when an image isn't in the blur map
 * (e.g. external URLs or images added after the last blur generation).
 */
const FALLBACK =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A//2Q==";

export function getBlur(src: string): string {
  return BLUR_MAP[src] ?? FALLBACK;
}
