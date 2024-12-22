import { ColorSet } from './ColorSet';
import { TileMap } from './TileMap';

export class MapEditor extends TileMap {
  private map: number[][];
  private selectedColor: number;

  constructor(colorSet: ColorSet, pixelRatio: number, el?: HTMLCanvasElement | string, width: number = 0, height: number = width) {
    if (height <= 0 || width <= 0) {
      super(colorSet, pixelRatio, el);
      this.map = [];
      this.selectedColor = 0;
      return;
    }
    const map = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
    super(colorSet, pixelRatio, el, map);
    this.map = map;
    this.selectedColor = 0;
  }

  setSelectColor(color: number) {
    this.selectedColor = color;
    return this;
  }

  setSize(width: number, height: number): this {
    this.map = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
    super.setSize(width, height);
    super.setMap(this.map);
    return this;
  }

  setMap(map: number[][]) {
    this.map = map;
    super.setMap(map);
    return this;
  }

  setColor(x: number, y: number, color = this.selectedColor) {
    this.map[y][x] = color;
    super.setColor(x, y, this.map[y][x]);
    return this;
  }
}
