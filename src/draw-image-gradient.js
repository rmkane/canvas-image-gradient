let imageGradientCanvas;

const drawImageGradient = function (img, x, y, gradient) {
  const ctx = this;

  // Throw error if image to use for gradient hasn't loaded.
  if (!img.complete) {
    const err = new Error();
    err.message = 'CanvasRenderingContext2D.prototype.drawImageGradient: The image has not loaded.';
    throw err;
  }

  const { width: imgWidth,  height: imgHeight } = img;

  if (!imageGradientCanvas) {
    imageGradientCanvas = document.createElement('canvas');
  }

  imageGradientCanvas.width = imgWidth;
  imageGradientCanvas.height = imgHeight;

  const imgCtx = imageGradientCanvas.getContext('2d');

  // Create default gradient.
  if (!gradient) {
    const gradient = imgCtx.createLinearGradient(0, 0, 0, imgHeight);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, '#000');
  }

  const gradientImageData = createRectangularGradientImageData();

  imgCtx.drawImage(img, 0, 0);

  const imageImageData = imgCtx.getImageData(0, 0, imgWidth, imgHeight);

  const ctxImageData = ctx.getImageData(x, y, imgWidth, imgHeight);

  let opacity = 1;

  const ctxImageDataData = ctxImageData.data,
      imageImageDataData = imageImageData.data,
      gradientImageDataData = gradientImageData.data,
      ctxImageDataDataLength = ctxImageData.data.length;

  for (let pixelOffset = 0; pixelOffset < ctxImageDataDataLength; pixelOffset += 4) {
    opacity = gradientImageDataData[pixelOffset + 3] / 255;

    for (let channelOffset = 0; channelOffset < 3; channelOffset++) {
      const offset = pixelOffset + channelOffset;
      ctxImageDataData[offset] = (imageImageDataData[offset] * opacity) + (ctxImageDataData[offset] * (1 - opacity));
    }
  }

  ctx.putImageData(ctxImageData, x, y);

  function createRectangularGradientImageData() {
    imgCtx.fillStyle = gradient;
    imgCtx.fillRect(0, 0, imgWidth, imgHeight);

    return imgCtx.getImageData(0, 0, imgWidth, imgHeight);
  }
};

export default drawImageGradient;