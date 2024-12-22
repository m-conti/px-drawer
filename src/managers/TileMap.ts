import { ColorSet } from './ColorSet';
import { MapParser } from './MapParser';

export class TileMap {
  private element: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;

  private colorSet: ColorSet;
  private pixelRatio: number;

  constructor(colorSet: ColorSet, pixelRatio: number, el?: HTMLCanvasElement | string, map?: MapStr | number[][]) {
    this.colorSet = colorSet;
    this.pixelRatio = pixelRatio;
    if (el) this.setElement(el);
    if (typeof map === 'string') this.readMap(map);
    if (Array.isArray(map)) this.setSize(map[0].length, map.length).setMap(map);
  }

  get width() { return (this.element?.width ?? 0) / this.pixelRatio; }
  get height() { return (this.element?.height ?? 0) / this.pixelRatio; }

  setElement(el: HTMLCanvasElement | string) {
    this.element = typeof el === 'string' ? document.querySelector(el) : el;
    if (!this.element) throw new Error(`Element '${el}' not found`);

    this.context = this.element.getContext('2d');

    return this;
  }

  setSize(width: number, height: number) {
    if (!this.element) throw new Error('No element set');

    this.element.width = width * this.pixelRatio;
    this.element.height = height * this.pixelRatio;

    return this;
  }

  setMap(map: number[][]) {
    if (!this.context) throw new Error('No context set');

    map.forEach((row, y) => row.forEach((colorIndex, x) => { this.setColor(x, y, colorIndex); }));

    return this;
  }

  setColor(x: number, y: number, color: number) {
    this.context!.fillStyle = this.colorSet.get(color);
    this.context!.fillRect(x * this.pixelRatio, y * this.pixelRatio, this.pixelRatio, this.pixelRatio);
    return this;
  }

  readMap(mapStr: MapStr) {
    if (!this.context) throw new Error('No context set');

    const { height, width, map } = MapParser.toMap(mapStr);
    this.setSize(width, height).setMap(map);

    return this;
  }
}
