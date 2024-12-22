
export class ColorSet {
  colors: ColorStr[] = [];

  add(color: ColorStr) { return this.colors.push(color) - 1; }
  get(index: number) { return this.colors[index]; }
  set(data: ColorStr[]) { this.colors.push(...data); }
}
