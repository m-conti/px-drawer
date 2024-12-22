

export {};

declare global {
  type ColorStr = `#${string}`;
  type SizeInMap = `${number}x${number}`;
  type ColorsInMap = `colors:${string}`;
  type MapStr = `${SizeInMap}|${string}` | `${ColorsInMap}|${SizeInMap}|${string}`;
}
