import { MapEditor } from './MapEditor';


export class Cursor {
  private _cursorElement: HTMLDivElement | null = null;

  private _mapEditor: MapEditor | null = null;
  private get _mapElement() { return this._mapEditor?.getElement(); }
  public showCursor: () => void;
  public hideCursor: () => void;

  constructor(mapEditor?: MapEditor) {
    if (mapEditor) this.setMapEditor(mapEditor);
    this.setCursorElement();
    this.showCursor = this.setVisible.bind(this, true);
    this.hideCursor = this.setVisible.bind(this, false);
  }


  public destroy() {
    this._cursorElement?.remove();
    this._cursorElement = null;
    this._mapEditor = null;
  }

  public setMapEditor(mapEditor: MapEditor) {
    this._mapEditor = mapEditor;
  }

  public setCursorElement(cursorElement?: HTMLDivElement) {
    this._cursorElement = cursorElement || document.createElement('div');
    this._cursorElement.style.position = 'absolute';
    this._cursorElement.style.pointerEvents = 'none';
    this._cursorElement.style.zIndex = '1000';
    this._cursorElement.style.border = '1px solid red';
    this._cursorElement.style.boxSizing = 'border-box';
    this.setVisible(false);
    this._mapElement?.appendChild(this._cursorElement);
  }

  public setVisible(visible: boolean) {
    if (!this._cursorElement) throw new Error('No cursor element set');
    this._cursorElement.style.visibility = visible ? 'visible' : 'hidden';
  }

  public setCursorPosition(x: number, y: number) {
    if (!this._mapEditor) throw new Error('No map editor set');
    if (!this._mapElement) throw new Error('No element in map editor');
    if (!this._cursorElement) throw new Error('No cursor element set');
    this.setVisible(true);

    const rect = this._mapElement.getBoundingClientRect();
    const size = rect.width / this._mapEditor.width;
    const insideX = x * size;
    const insideY = y * size;

    this._cursorElement.style.left = `${insideX}px`;
    this._cursorElement.style.top = `${insideY}px`;
    this._cursorElement.style.width = `${size}px`;
    this._cursorElement.style.height = `${size}px`;
  }


}
