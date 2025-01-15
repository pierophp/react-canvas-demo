import type { TextItem } from "~/types";

export function drawCanvas(ctx: any, img: any, textItems: TextItem[]) {
  ctx.drawImage(img, 0, 0);
  for (const item of textItems) {
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
  }
}
