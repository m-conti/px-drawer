import { ColorSet } from './ColorSet';


const _mapToStr = (map: number[][]) => map.map(row => row.join(',')).join(',');

const toString = (map: number[][], colorSet?: ColorSet) => {
  const size = `${map[0].length}x${map.length}`;
  if (!colorSet) return `${size}|${_mapToStr(map)}`;
  return `colors:${colorSet.getColors().join('')}|${size}|${_mapToStr(map)}`;
};

const toMap = (map: MapStr) => {
  // TODO implement map parser with colorSet
  const [ size, data ] = map.split('|');
  const [ width, height ] = size.split('x').map(Number);
  return {
    map: data.split(',').map(row => row.split(',').map(Number)),
    width,
    height,
  };
};

export const MapParser = {
  toString,
  toMap,
};
