import { PixelManager } from '@/managers';


const mapEditor = PixelManager.global
  .addColor('#FFFFFF')
  .addColor('#FFFFFF00')
  .addColor('#000000')
  .addColor('#FF0000')
  .addColor('#00FF00')
  .addColor('#0000FF')
  .addColor('#FFFF00')
  .addColor('#00FFFF')
  .addColor('#FF00FF')
  .createMapEditor('#canvas-editor', 16, 12)
  .handleCanvasClick();

PixelManager.global.createTileMap('#canvas-display', mapEditor.saveMap());
PixelManager.global.createTileMap('#canvas-display-with-saved-color', mapEditor.saveMap(true));
