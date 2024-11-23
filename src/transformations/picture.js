export function grayscale(image, p, b_levels, g_size) {
  p.noSmooth();
  let width0 = image.width;
  let height0 = image.height;
  let cols = image.width / g_size;
  let rows = image.height / g_size;
  image.resize(cols, rows);
  image.loadPixels();
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      let index = (x + y * image.width) * 4;
      let r = image.pixels[index];
      let g = image.pixels[index + 1];
      let b = image.pixels[index + 2];
      let alpha = image.pixels[index + 3];
      let g_scale = (r + g + b) / 3;
      let level = p.round((g_scale / 255) * (b_levels - 1));
      let mappedGray = level * (255 / (b_levels - 1));
      image.pixels[index] = mappedGray;
      image.pixels[index + 1] = mappedGray;
      image.pixels[index + 2] = mappedGray;
      image.pixels[index + 3] = alpha;
    }
  }
  image.updatePixels();
  image.resize(width0, height0);
  return image;
}

export function drawAscii(img, p) {
  const asciiChars = ["@", "%", "#", "*", "=", "-", ".", " "];

  const charWidth = 8;
  const charHeight = 8;
  // p.image(img, 0, 0);
  p.textFont("monospace", charHeight);
  p.textAlign(p.CENTER, p.CENTER);

  const cols = p.floor(img.width / charWidth);
  const rows = p.floor(img.height / charHeight);

  img.loadPixels();

  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      const x = j * charWidth;
      const y = i * charHeight;

      const pixelIndex = 4 * (y * img.width + x);

      const r = img.pixels[pixelIndex];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];
      const brightness = (r + g + b) / 3;

      const charIndex = p.floor(
        p.map(brightness, 0, 255, 0, asciiChars.length - 1),
      );
      const asciiChar = asciiChars[charIndex];

      p.fill(0);
      p.text(asciiChar, x + charWidth / 2 + p.width/2 - img.width/2, y + charHeight / 2);
    }
  }
}