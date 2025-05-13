import { chunk } from '@/utils/Array';
import { ColorSet } from './ColorSet';
import { MapParser } from './MapParser';
import { TileMap } from './TileMap';
import { Cursor } from './Cursor';

export class MapEditor extends TileMap {
  private isColorSetDisplayed = true;
  private map: number[][] = [[]];
  private selectedColor = 0;
  private activateCanvasClick = false;

  private overCursor: Cursor | null = null;
  private selectedCursorColor: Cursor | null = null;

  constructor(colorSet: ColorSet, pixelRatio: number, el?: HTMLDivElement | string, width: number = 4, height: number = width) {
    if (width <= 0 || height <= 0) throw new Error('Width and height must be positive');
    super(colorSet, pixelRatio, el);
    this.setMap(Array.from({ length: height }, () => Array.from({ length: width }, () => 0)));
    this.onClick = this.onClick.bind(this);
    this._activateMouseMoveClick = this._activateMouseMoveClick.bind(this);
    this._deactivateMouseMoveClick = this._deactivateMouseMoveClick.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
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

  private getSetColorMap(width: number = this.width) {
    return chunk(this.colorSet.getColors().map((_, index) => index), width, 0);
  }

  protected setMap(map: number[][]) {
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
    this.activateCanvasClick = true;
    this.element?.addEventListener('click', this.onClick);
    this.element?.addEventListener('touchend', this.onClick);
    this.element?.addEventListener('mousedown', this._activateMouseMoveClick);
    this.element?.addEventListener('touchstart', this._activateMouseMoveClick);
    this.element?.addEventListener('mouseup', this._deactivateMouseMoveClick);
    this.element?.addEventListener('touchend', this._deactivateMouseMoveClick);
    this.element?.addEventListener('cancel', this._deactivateMouseMoveClick);
    this.activateOverCursor();
    return this;
  }

  removeCanvasClick() {
    this.activateCanvasClick = false;
    this.element?.removeEventListener('click', this.onClick);
    this.element?.removeEventListener('touchend', this.onClick);
    this.element?.removeEventListener('mousedown', this._activateMouseMoveClick);
    this.element?.removeEventListener('touchstart', this._activateMouseMoveClick);
    this.element?.removeEventListener('mouseup', this._deactivateMouseMoveClick);
    this.element?.removeEventListener('touchend', this._deactivateMouseMoveClick);
    this.element?.removeEventListener('cancel', this._deactivateMouseMoveClick);
    this.deactivateOverCursor();
    return this;
  }

  withCursor() {
    if (!this.overCursor) this.overCursor = new Cursor(this);
    if (!this.selectedCursorColor) this.selectedCursorColor = new Cursor(this);
    if (!this.activateCanvasClick) return this;
    this.activateOverCursor();
    this.selectedCursorColor.setCursorPosition(0, 0);
    return this;
  }

  withoutCursor() {
    if (this.overCursor) this.deactivateOverCursor();
    this.overCursor = null;
    if (this.selectedCursorColor) this.selectedCursorColor.destroy();
    this.selectedCursorColor = null;
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

  getMousePosition(event: MouseEvent | TouchEvent) {
    const rect = (this.element)!.getBoundingClientRect();
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    const x = Math.floor(((clientX - rect.left) / rect.width) * this.width);
    const y = Math.floor(((clientY - rect.top) / rect.height) * this.height);
    return { x, y };
  }

  onClick(event: MouseEvent | TouchEvent) {
    const { x, y } = this.getMousePosition(event);
    const colorSetY = this.getSetColorMap().length;
    if (y < colorSetY) {
      this.setSelectedColor(this.getSetColorMap()[y][x]);
      this.selectedCursorColor?.setCursorPosition(x, y);
    }
    else
      this.setColor(x, y - colorSetY);

    event.stopImmediatePropagation();
    event.preventDefault();

    return this;
  }

  // overCursor
  private activateOverCursor() {
    if (!this.overCursor) return this;
    this.element?.addEventListener('mousemove', this._handleMouseMove);
    this.element?.addEventListener('mouseover', this.overCursor.showCursor);
    this.element?.addEventListener('mouseout', this.overCursor.hideCursor);
    return this;
  }

  private deactivateOverCursor() {
    if (!this.overCursor) return this;
    this.overCursor.setVisible(false);
    this.element?.removeEventListener('mousemove', this._handleMouseMove);
    this.element?.removeEventListener('mouseover', this.overCursor.showCursor);
    this.element?.removeEventListener('mouseout', this.overCursor.hideCursor);
    this.overCursor.destroy();
  }

  private _handleMouseMove(event: MouseEvent) {
    if (!this.overCursor) throw new Error('No overCursor set');
    const { x, y } = this.getMousePosition(event);
    this.overCursor.setCursorPosition(x, y);
  }
}
