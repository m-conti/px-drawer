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
    this.onClick = this.onClick.bind(this);
    this._activateMouseMoveClick = this._activateMouseMoveClick.bind(this);
    this._deactivateMouseMoveClick = this._deactivateMouseMoveClick.bind(this);
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
    super.setMap([
      ...(this.isColorSetDisplayed ? this.getSetColorMap(map[0].length) : []),
      ...map,
    ]);
    return this;
  }

  saveMap(withColorSet = false) {
    const map = MapParser.toString(this.map, withColorSet ? this.colorSet : undefined);
    return map;
  }

  setColor(x: number, y: number, color = this.selectedColor) {
    const colorMapHeight = this.isColorSetDisplayed ? this.getSetColorMap().length : 0;
    if (this.map[y][x] === color) return this;
    this.map[y][x] = color;
    super.setColor(x, y + colorMapHeight, this.map[y][x]);
    return this;
  }

  handleCanvasClick() {
    this.element?.addEventListener('click', this.onClick);
    this.element?.addEventListener('touchend', this.onClick);
    this.element?.addEventListener('mousedown', this._activateMouseMoveClick);
    this.element?.addEventListener('touchstart', this._activateMouseMoveClick);
    this.element?.addEventListener('mouseup', this._deactivateMouseMoveClick);
    this.element?.addEventListener('touchend', this._deactivateMouseMoveClick);
    this.element?.addEventListener('cancel', this._deactivateMouseMoveClick);
    return this;
  }

  removeCanvasClick() {
    this.element?.removeEventListener('click', this.onClick);
    this.element?.removeEventListener('touchend', this.onClick);
    this.element?.removeEventListener('mousedown', this._activateMouseMoveClick);
    this.element?.removeEventListener('touchstart', this._activateMouseMoveClick);
    this.element?.removeEventListener('mouseup', this._deactivateMouseMoveClick);
    this.element?.removeEventListener('touchend', this._deactivateMouseMoveClick);
    this.element?.removeEventListener('cancel', this._deactivateMouseMoveClick);
    return this;
  }

  private _activateMouseMoveClick() {
    this.element?.addEventListener('mousemove', this.onClick);
    this.element?.addEventListener('touchmove', this.onClick);
    return this;
  }
  private _deactivateMouseMoveClick() {
    this.element?.removeEventListener('mousemove', this.onClick);
    this.element?.removeEventListener('touchmove', this.onClick);
    return this;
  }

  onClick(event: MouseEvent | TouchEvent) {
    const rect = (this.element)!.getBoundingClientRect();
    const clientX = (event as MouseEvent).clientX ?? (event as TouchEvent).touches[0].clientX;
    const clientY = (event as MouseEvent).clientY ?? (event as TouchEvent).touches[0].clientY;

    const x = Math.floor(((clientX - rect.left) / rect.width) * this.width);
    const y = Math.floor(((clientY - rect.top) / rect.height) * this.height);
    const colorSetY = this.getSetColorMap().length;
    if (y < colorSetY)
      this.setSelectedColor(this.getSetColorMap()[y][x]);
    else
      this.setColor(x, y - colorSetY);

    event.stopImmediatePropagation();
    event.preventDefault();

    return this;
  }
}
