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
  const ctx = document.querySelector('#test-canvas').getContext('2d');
  ctx.canvas.width = desertImage.width;
  ctx.canvas.height = desertImage.height;

  ctx.drawImage(desertImage, 0, 0);

  const linearGradient = ctx.createLinearGradient(0, 0, 0, googleImage.height);
  linearGradient.addColorStop(0, 'transparent');
  linearGradient.addColorStop(1, '#000');

  ctx.drawImageGradient(googleImage, 12, 65, linearGradient);

  const imageData = ctx.canvas.toDataURL('image/png');

  document.querySelector('#data-url').value = imageData;
};