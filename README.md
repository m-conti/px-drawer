# Pixel-Drawer

<!-- TO DO ADD REAL LINKS -->
![npm](https://img.shields.io/npm/v/pixel-drawer)
![license](https://img.shields.io/github/license/m-conti/pixel-drawer)
![bundle size](https://img.shields.io/bundlephobia/min/pixel-drawer)

Pixel-Drawer is a simple, lightweight library that provides a drawable canvas, allowing users to draw, save their drawings, and display them on other canvases.

## 🚀 Features

- Easy-to-use drawable canvas
- Save drawings as images or data
- Load saved drawings onto other canvases
- Minimal setup required

## 📦 Installation

### Using npm
```sh
npm install pixel-drawer
```

### Using Yarn
```sh
yarn add pixel-drawer
```

## 🔌 Usage

### Browser (via CDN)
To use Pixel-Drawer in the browser via CDN, include the following script in your HTML file:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PixelDrawer</title>
  </head>
  <body>
    <div class="container">
      <canvas id="canvas-editor"></canvas>
      <button onclick="saveTileMap()">SAVE</button>
      <canvas id="canvas-display"></canvas>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/pixel-drawer@latest/dist/pixel-drawer.umd.js"></script>
    <script>
      const mapEditor = PixelDrawer.global
        .addColor('#FFFFFF')
        .addColor('#000000')
        .addColor('#FF0000')
        .addColor('#00FF00')
        .addColor('#0000FF')
        .createMapEditor('#canvas-editor', 16, 12)
        .handleCanvasClick();

      const map = PixelDrawer.global.createTileMap('#canvas-display');
      globalThis.saveTileMap = () => {
        const mapToSave = mapEditor.saveMap();

        // save it wherever you want ...
        console.log('saveTileMap', mapToSave);

        // you can read it like this :
        map.readMap(mapToSave);
      };
    </script>
    <style>
      body { background-color: #202020; }
      canvas { width: 100%; }
      #canvas-display { width: 80%; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    </style>
  </body>
</html>
```

### Using npm
To use Pixel-Drawer in a project with npm, follow these steps:

1. Install the package:
```sh
npm install pixel-drawer
```

2. Import and use it in your JavaScript file:
```js
import PixelDrawer from 'pixel-drawer';

const mapEditor = PixelDrawer.global
  .addColor('#FFFFFF')
  .addColor('#000000')
  .addColor('#FF0000')
  .addColor('#00FF00')
  .addColor('#0000FF')
  .createMapEditor('#canvas-editor', 16, 12)
  .handleCanvasClick();

const map = PixelDrawer.global.createTileMap('#canvas-display');
globalThis.saveTileMap = () => {
  const mapToSave = mapEditor.saveMap();

  // save it wherever you want ...
  console.log('saveTileMap', mapToSave);

  // you can read it like this :
  map.readMap(mapToSave);
};
```

## 📜 API Reference

### PixelDrawer
You can have multiple PixelDrawer for you app with
`const pixelDrawer = new PixelDrawer();`
or you can use a global one for all the app with
`PixelDrawer.global`

#### `setPixelRatio(ratio: number): PixelDrawer`
Sets the pixel ratio for the canvas. It'll not change the size of the pixel but it will change the precision of the canvas to have or avoid blur effect.

#### `addColor(color: ColorStr): PixelDrawer`
Adds a new color to the color set.

#### `setColors(data: ColorStr[]): PixelDrawer`
Set and replace multiple colors to the color set.

#### `createTileMap(el?: HTMLCanvasElement | string, map?: MapStr): TileMap`
Creates a new `TileMap` instance. linked to a canvas.

If no `el` is provided, you can link it after with: [`setElement`](#setelementel-htmlcanvaselement--string-tilemap)

If no map is provided, you can add it later with: [`readMap`](#readmapmapstr-mapstr-tilemap)

#### `createMapEditor(el?: HTMLCanvasElement | string, width?: number, height?: number): MapEditor`
Creates a new `MapEditor` instance.

If no `el` is provided, you can link it after with: [`setElement`](#setelementel-htmlcanvaselement--string-mapeditor)

If no height is provided it will take the width.

If no width is provided it will set to 4.

The width and the height should be > 0.

### TileMap

#### `setElement(el: HTMLCanvasElement | string): TileMap`
Sets the canvas element for the tile map.

#### `readMap(mapStr: MapStr): TileMap`
Reads and sets the map data from a string.

### MapEditor

#### `setElement(el: HTMLCanvasElement | string): MapEditor`
Sets the canvas element for the tile map.

#### `readMap(mapStr: MapStr): MapEditor`
Reads and sets the map data from a string.

#### `setSize(width: number, height: number): MapEditor`
Sets the size of the canvas.

#### `hideColorSet(): MapEditor`
Hides the color set from the canvas.

#### `showColorSet(): MapEditor`
Shows the color set on the canvas.

#### `setSelectedColor(color: number): MapEditor`
Sets the selected color for drawing. If you want to use an alternative as `handleCanvasClick`

#### `createEmptyMap(width: number, height: number): MapEditor`
Creates an empty map with the specified width and height.

#### `saveMap(withColorSet = false): MapStr`
Saves the current map data as a string. with the color set or not

#### `setColor(x: number, y: number, color = this.selectedColor): MapEditor`
Sets the color of a specific pixel in the map.

#### `handleCanvasClick(): MapEditor`
Enables handling of canvas click events for drawing.

#### `removeCanvasClick(): MapEditor`
Disables handling of canvas click events for drawing.

## 📖 Examples

### Basic Example

Here is a basic example of how to use Pixel-Drawer to create a simple drawing application:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PixelDrawer Example</title>
  </head>
  <body>
    <div class="container">
      <canvas id="canvas-editor"></canvas>
      <button onclick="saveDrawing()">Save Drawing</button>
      <canvas id="canvas-display"></canvas>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/pixel-drawer@latest/dist/pixel-drawer.umd.js"></script>
    <script>
      const editor = PixelDrawer.global
        .addColor('#FFFFFF')
        .addColor('#000000')
        .addColor('#FF0000')
        .addColor('#00FF00')
        .addColor('#0000FF')
        .createMapEditor('#canvas-editor', 16, 16)
        .handleCanvasClick();

      const display = PixelDrawer.global.createTileMap('#canvas-display');

      function saveDrawing() {
        const drawing = editor.saveMap();
        console.log('Saved Drawing:', drawing);
        display.readMap(drawing);
      }
    </script>
    <style>
      body { background-color: #f0f0f0; }
      canvas { border: 1px solid #000; }
      .container { display: flex; flex-direction: column; gap: 1rem; }
    </style>
  </body>
</html>
```

This example sets up a basic HTML page with two canvases: one for drawing and one for displaying the saved drawing. The `saveDrawing` function saves the drawing from the editor and displays it on the second canvas.

## 🛠 Development

```sh
git clone https://github.com/your-username/pixel-drawer.git
cd pixel-drawer
npm install
npm run dev
```

## ✅ Tests

No tests are implemented for the moment.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📬 Contact

- GitHub: [m-conti](https://github.com/m-conti)

