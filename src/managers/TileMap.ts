import { ColorSet } from './ColorSet';
import { MapParser } from './MapParser';

export class TileMap {
  private context: CanvasRenderingContext2D | null = null;

  protected element: HTMLCanvasElement | null = null;
  protected pixelRatio: number;
  protected colorSet: ColorSet;

  constructor(colorSet: ColorSet, pixelRatio: number, el?: HTMLCanvasElement | string, map?: MapStr | number[][]) {
    this.colorSet = colorSet;
    this.pixelRatio = pixelRatio;
    if (el) this.setElement(el);
    if (typeof map === 'string') this.readMap(map);
    if (Array.isArray(map)) this.setMap(map);
  }

  get width() { return (this.element?.width ?? 0) / this.pixelRatio; }
  get height() { return (this.element?.height ?? 0) / this.pixelRatio; }

  setElement(el: HTMLCanvasElement | string) {
    this.element = typeof el === 'string' ? document.querySelector(el) : el;
    if (!this.element) throw new Error(`Element '${el}' not found`);

    this.context = this.element.getContext('2d');
    this.context!.globalCompositeOperation = 'source-in';

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
    this.setSize(map[0].length, map.length);

    map.forEach((row, y) => row.forEach((colorIndex, x) => {
      this.context!.fillStyle = this.colorSet.get(colorIndex);
      this.context!.fillRect(x * this.pixelRatio, y * this.pixelRatio, this.pixelRatio, this.pixelRatio);
    }));

    return this;
  }

  setColor(x: number, y: number, color: number) {
    this.context!.fillStyle = this.colorSet.get(color);
    this.context!.fillRect(x * this.pixelRatio, y * this.pixelRatio, this.pixelRatio, this.pixelRatio);
    return this;
  }

  readMap(mapStr: MapStr) {
    if (!this.context) throw new Error('No context set');

    const { map, colorSet } = MapParser.toMap(mapStr);
    if (colorSet) this.colorSet = colorSet;
    this.setMap(map);

    return this;
  }
}
