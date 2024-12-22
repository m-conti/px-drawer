import { chunk } from '@/utils/Array';
import { ColorSet } from './ColorSet';
import { MapParser } from './MapParser';
import { TileMap } from './TileMap';

export class MapEditor extends TileMap {
  private isColorSetDisplayed = true;
  private map: number[][] = [[]];
  private selectedColor = 0;

  constructor(colorSet: ColorSet, pixelRatio: number, el?: HTMLCanvasElement | string, width: number = 0, height: number = width) {
    if (width < 0 || height < 0) throw new Error('Width and height must be positive');
    super(colorSet, pixelRatio, el);
    this.setMap(Array.from({ length: height }, () => Array.from({ length: width }, () => 0)));
  }

  hideColorSet() {
    this.isColorSetDisplayed = false;
    this.setMap(this.map);
    return this;
  }
  showColorSet() {
    this.isColorSetDisplayed = true;
    this.setMap(this.map);
    return this;
  }

  setSelectedColor(color: number) {
    this.selectedColor = color;
    return this;
  }

  createEmptyMap(width: number, height: number) {
    this.map = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
    super.setMap(this.map);
    return this;
  }

  getSetColorMap(width: number = this.width) {
    return chunk(this.colorSet.getColors().map((_, index) => index), width, 0);
  }

  setMap(map: number[][]) {
    this.map = map;
    console.log('SetColorMap', this.getSetColorMap(map[0].length));
    super.setMap([
      ...(this.isColorSetDisplayed ? this.getSetColorMap(map[0].length) : []),
      ...map,
    ]);
    return this;
  }

  saveMap(withColorSet = false) {
    const map = MapParser.toString(this.map, withColorSet ? this.colorSet : undefined);
    console.log('saveMap', this.map, map);
    return map;
  }

  setColor(x: number, y: number, color = this.selectedColor) {
    const colorMapHeight = this.isColorSetDisplayed ? this.getSetColorMap().length : 0;
    this.map[y][x] = color;
    super.setColor(x, y + colorMapHeight, this.map[y][x]);
    return this;
  }

  handleCanvasClick() {
    this.element?.addEventListener('click', this.onClick.bind(this));

    return this;
  }

  onClick(event: MouseEvent) {
    const rect = (this.element)!.getBoundingClientRect();
    const x = Math.floor(((event.clientX - rect.left) / rect.width) * this.width);
    const y = Math.floor(((event.clientY - rect.top) / rect.height) * this.height);
    const colorSetY = this.getSetColorMap().length;
    if (y < colorSetY)
      this.setSelectedColor(this.getSetColorMap()[y][x]);
    else
      this.setColor(x, y - colorSetY);

    return this;
  }
}
