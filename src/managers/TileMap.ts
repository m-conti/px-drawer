import { ColorSet } from './ColorSet';
import { MapParser } from './MapParser';

export class TileMap {
  private context: CanvasRenderingContext2D | null = null;
  private _pixelRatio!: number;

  protected element: HTMLDivElement | null = null;
  protected canvas: HTMLCanvasElement | null = null;
  protected colorSet: ColorSet;

  public get pixelRatio() { return this._pixelRatio; }
  protected set pixelRatio(value: number) { this._pixelRatio = value; }

  constructor(colorSet: ColorSet, pixelRatio: number, el?: HTMLDivElement | string, map?: MapStr | number[][]) {
    this.colorSet = colorSet;
    this.pixelRatio = pixelRatio;
    if (el) this.setElement(el);
    if (typeof map === 'string') this.readMap(map);
    if (Array.isArray(map)) this.setMap(map);
  }

  get width() { return (this.canvas?.width ?? 0) / this.pixelRatio; }
  get height() { return (this.canvas?.height ?? 0) / this.pixelRatio; }

  setElement(el: HTMLDivElement | string) {
    this.element = typeof el === 'string' ? document.querySelector(el) : el;
    if (!this.element) throw new Error(`Element '${el}' not found`);

    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.imageRendering = 'pixelated';
    this.canvas.style.imageRendering = '-moz-crisp-edges';
    this.canvas.style.imageRendering = '-o-crisp-edges';
    this.canvas.style.imageRendering = 'crisp-edges';
    this.canvas.style.imageRendering = 'optimize-contrast';
    this.canvas.style.imageRendering = 'pixelated';

    this.element.appendChild(this.canvas);
    this.element.style.position = 'relative';

    this.context = this.canvas.getContext('2d');
    this.context!.globalCompositeOperation = 'source-in';

    return this;
  }

  public getElement() {
    if (!this.element) throw new Error('No element set');
    return this.element;
  }

  setSize(width: number, height: number) {
    if (!this.canvas) throw new Error('No element set');

    this.canvas.width = width * this.pixelRatio;
    this.canvas.height = height * this.pixelRatio;

    return this;
  }

  protected setMap(map: number[][]) {
    if (!this.context) throw new Error('No context set');
    this.setSize(map[0].length, map.length);

    map.forEach((row, y) => row.forEach((colorIndex, x) => {
      this.context!.fillStyle = this.colorSet.get(colorIndex);
      this.context!.fillRect(x * this.pixelRatio, y * this.pixelRatio, this.pixelRatio, this.pixelRatio);
    }));

    return this;
  }

  setColor(x: number, y: number, color: number) {
    const colorStr = this.colorSet.get(color);
    const alpha = Number(`0x${colorStr.replace(/#[0-9A-F]{6}/, '') || 'FF'}`) / 0xFF;
    const realX = x * this.pixelRatio;
    const realY = y * this.pixelRatio;
    this.context!.fillStyle = colorStr;
    this.context!.globalAlpha = alpha;

    this.context!.clearRect(realX, realY, this.pixelRatio, this.pixelRatio);
    this.context!.fillRect(realX, realY, this.pixelRatio, this.pixelRatio);
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
