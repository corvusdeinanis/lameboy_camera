import { ditherMatricies } from "./ditherMatricies";

const black = 0x00;
const dark_gray = 0x55;
const light_gray = 0xab;
const white = 0xff;

let pixelCount = 0;
const ditherFilter = (imageData: ImageData, contrast?: number) => {
  contrast = contrast > 15 ? 15 : contrast;
  contrast = contrast < 0 ? 0 : contrast;
  contrast = contrast ?? 7;
  const contrastMatrix = ditherMatricies[contrast];

  const w = imageData.width;
  const h = imageData.height;
  const pixels = imageData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const x = (pixelCount % w) % 4;
    const y = Math.ceil(pixelCount / w) % 4;

    let p = pixels[i];
    const ditherGroup = contrastMatrix[x][y];

    if (p < ditherGroup[0]) p = black;
    else if (p < ditherGroup[1]) p = dark_gray;
    else if (p < ditherGroup[2]) p = light_gray;
    else p = white;

    pixels[i] = pixels[i + 1] = pixels[i + 2] = p;
    pixelCount++;
  }
  return imageData;
};

export { ditherFilter };
