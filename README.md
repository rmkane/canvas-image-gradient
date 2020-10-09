# Canvas Image Gradient

_A function to draw an image with a gradient_

## About

Adds the ability to draw images with a linear or radial transparent gradient effect, to the canvas context.

This project is based on the (archived) [canvasimagegradient](https://code.google.com/archive/p/canvasimagegradient/) project hosted on Google Code.

## Usage

To use, download `canvas-image-gradient.js`. This will bind the `drawImageGradient` function to the `CanvasRenderingContext2D` object.

## Examples

### Linear Gradient

```js
ctx.drawImage(desertImage, 0, 0);

var linearGradient = ctx.createLinearGradient(0, 0, 0, googleImage.height);
linearGradient.addColorStop(0, "transparent");
linearGradient.addColorStop(1, "#000");

ctx.drawImageGradient(googleImage, 12, 65, linearGradient);
```

![Rendered linear gradient](public/img/linear_gradient.jpg)

### Radial Gradient

```js
ctx.drawImage(desertImage, 0, 0);

var centerX = googleImage.width/2;
var centerY = googleImage.height/2;

var radialGradient = ctx.createRadialGradient(centerX, centerY, 1, centerX, centerY, centerX);
radialGradient.addColorStop(0, "transparent");
radialGradient.addColorStop(1, "#000");

ctx.drawImageGradient(googleImage, 12, 65, radialGradient);
```

![Rendered radial gradient](public/img/radial_gradient.jpg)