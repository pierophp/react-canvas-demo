import { createCanvas, loadImage } from "canvas";
import type { TextItem } from "~/types";

export async function generateCanvas(textItems: TextItem[]) {
  const canvas = createCanvas(800, 600); // Default size, will be updated when image loads
  const ctx = canvas.getContext("2d");

  // Load the background image
  const img = await loadImage("public/tree.jpg");

  // Set canvas dimensions to match image
  canvas.width = img.width;
  canvas.height = img.height;

  // Draw background image
  ctx.drawImage(img, 0, 0);

  // Add text items
  textItems.forEach((item) => {
    console.log({ item });
    if (item.useShadow) {
      ctx.shadowColor = item.shadowColor || "#000000";
      ctx.shadowBlur = item.shadowBlur || 4;
      ctx.shadowOffsetX = item.shadowOffsetX || 2;
      ctx.shadowOffsetY = item.shadowOffsetY || 2;
    } else {
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    ctx.font = `${item.fontSize}px Arial`;
    ctx.fillStyle = item.color;
    ctx.fillText(item.text, item.x, item.y);
  });

  return canvas.toBuffer("image/jpeg");
}
