/*
 * NOTE:
 * Images are stored as base64 strings in the images.js file to overcome the security problems of running the html file
 * locally (see http://aaronmt.com/?p=673 and associated comments).
*/
const main = () => {
  const imageData = [getDesertImage(), getGoogleImage()];
  Promise.all(imageData.map(img => ImageUtil.loadImage(img))).then(render);
};

const render = ([desertImage, googleImage]) => {
  const ctx = document.getElementById('testCanvas').getContext('2d');
  ctx.canvas.width = desertImage.width;
  ctx.canvas.height = desertImage.height;

  ctx.drawImage(desertImage, 0, 0);

  const centerX = googleImage.width / 2;
  const centerY = googleImage.height / 2;

  const radialGradient = ctx.createRadialGradient(centerX, centerY, 1, centerX, centerY, centerX);
  radialGradient.addColorStop(0, 'transparent');
  radialGradient.addColorStop(1, '#000');

  ctx.drawImageGradient(googleImage, 12, 65, radialGradient);
};