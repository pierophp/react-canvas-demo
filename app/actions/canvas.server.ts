import { createCanvas, loadImage } from "canvas";
import type { TextItem } from "~/types";
import { drawCanvas } from "./draw.canvas";

export async function generateCanvas(textItems: TextItem[]) {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  const img = await loadImage("public/tree.jpg");

  canvas.width = img.width;
  canvas.height = img.height;

  drawCanvas(ctx, img, textItems);

  return canvas.toBuffer("image/jpeg");
}
