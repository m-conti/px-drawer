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
  .addColor('#FFA500')
  .addColor('#800080')
  .addColor('#008080')
  .addColor('#800000')
  .addColor('#008000')
  .addColor('#000080')
  .addColor('#808000')
  .addColor('#800080')
  .addColor('#008080')
  .addColor('#808080')
  .addColor('#C0C0C0')
  .createMapEditor('#canvas-editor', 16, 12)
  .handleCanvasClick();

const map = PixelManager.global.createTileMap('#canvas-display');
(globalThis as any).saveTileMap = () => {
  console.log('saveTileMap', mapEditor.saveMap());
  map.readMap(mapEditor.saveMap());
};
