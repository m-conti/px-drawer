import { ColorSet } from './ColorSet';


const _mapToStr = (map: number[][]) => map.map(row => row.join(',')).join(',');

const toString = (map: number[][], colorSet?: ColorSet) => {
  const size = `${map[0].length}x${map.length}`;
  if (!colorSet) return `${size}|${_mapToStr(map)}` as MapStr;
  return `colors:${colorSet.getColors().join('')}|${size}|${_mapToStr(map)}` as MapStr;
};

const toMap = (mapStr: MapStr) => {
  // TODO implement map parser with colorSet
  const map = mapStr.split('|');
  const [ colors, size, data ] = map.length === 3 ? map : [ undefined, map[0], map[1] ];
  const [ width, height ] = size.split('x').map(Number);
  const flatMap = data.split(',').map(Number);

  return {
    map: new Array(height).fill(false).map((_, y) => flatMap.slice(y * width, (y + 1) * width)),
    colorSet: colors ? new ColorSet().clear().set(colors.split('#').map(color => `#${color}` as ColorStr)) : undefined,
  };
};

export const MapParser = {
  toString,
  toMap,
};
