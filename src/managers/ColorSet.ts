
export class ColorSet {
  private _colors: ColorStr[] = [];

  add(color: ColorStr) { return this._colors.push(color) - 1; }
  get(index: number) { return this._colors[index]; }
  set(data: ColorStr[]) { this._colors.push(...data); return this; }
  clear() { this._colors = []; return this; }
  getColors() { return this._colors; }
}
