import drawImageGradient from './draw-image-gradient'

(function () {
  // If browser doesn't support canvas exit function.
  if (!CanvasRenderingContext2D) return;

  // Holds a dynamically create canvas element that the gradient is drawn onto.
  CanvasRenderingContext2D.prototype.drawImageGradient = drawImageGradient;
})();