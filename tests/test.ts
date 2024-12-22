import { PixelManager } from '@/managers';


const mapEditor = PixelManager.global
  .addColor('#FFFFFF00')
  .addColor('#000000')
  .addColor('#FFFFFF')
  .addColor('#FF0000')
  .addColor('#00FF00')
  .addColor('#0000FF')
  .addColor('#FFFF00')
  .addColor('#00FFFF')
  .addColor('#FF00FF')
  .createMapEditor('#canvas-editor', 32, 16);

setTimeout(() => { mapEditor.setSize(32, 8); }, 5000);
