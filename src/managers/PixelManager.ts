import { ColorSet } from './ColorSet';
import { MapEditor } from './MapEditor';
import { TileMap } from './TileMap';

const PIXEL_RATIO = 64;

export class PixelManager {
  static _global: PixelManager;
  static get global() {
    if (!PixelManager._global) PixelManager._global = new PixelManager();
    return PixelManager._global;
  }

  private colorSet = new ColorSet();
  private pixelRatio: number = PIXEL_RATIO;

  // pixelRatio
  setPixelRatio(ratio: number) {
    this.pixelRatio = ratio;
    return this;
  }

  // colorSet
  addColor(color: ColorStr) { this.colorSet.add(color); return this; }
  setColors(data: ColorStr[]) { this.colorSet.set(data); return this; }

  // maps
  createTileMap(el?: HTMLCanvasElement | string, map?: MapStr) { return new TileMap(this.colorSet, this.pixelRatio, el, map); }
  createMapEditor(el?: HTMLCanvasElement | string, height?: number, width?: number) { return new MapEditor(this.colorSet, this.pixelRatio, el, height, width); }

}
