import type { Route } from "./+types/home";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState("24");
  const [positionX, setPositionX] = useState(20);
  const [positionY, setPositionY] = useState(40);
  // Shadow states
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowBlur, setShadowBlur] = useState(4);
  const [shadowOffsetX, setShadowOffsetX] = useState(2);
  const [shadowOffsetY, setShadowOffsetY] = useState(2);
  const [useShadow, setUseShadow] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = "/tree.jpg";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, []);

  const addTextToCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Redraw image to clear previous text
    const img = new Image();
    img.src = "/tree.jpg";
    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = textColor;

      if (useShadow) {
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetX = shadowOffsetX;
        ctx.shadowOffsetY = shadowOffsetY;
      } else {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      ctx.fillText(text, positionX, positionY);
    };
  };

  return (
    <div className="p-4 space-y-4">
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />

      <div className="grid gap-4">
        {/* Text and basic controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            className="max-w-sm"
          />
          <Input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-12 h-10 p-1"
          />
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="16">16px</SelectItem>
              <SelectItem value="24">24px</SelectItem>
              <SelectItem value="32">32px</SelectItem>
              <SelectItem value="48">48px</SelectItem>
              <SelectItem value="64">64px</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Position controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm">Position:</span>
            <Input
              type="number"
              value={positionX}
              onChange={(e) => setPositionX(Number(e.target.value))}
              className="w-20"
              placeholder="X"
            />
            <Input
              type="number"
              value={positionY}
              onChange={(e) => setPositionY(Number(e.target.value))}
              className="w-20"
              placeholder="Y"
            />
          </div>
        </div>

        {/* Shadow controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2">
              <Input
                type="checkbox"
                checked={useShadow}
                onChange={(e) => setUseShadow(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Text Shadow</span>
            </label>
          </div>

          {useShadow && (
            <>
              <Input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="number"
                value={shadowBlur}
                onChange={(e) => setShadowBlur(Number(e.target.value))}
                className="w-20"
                placeholder="Blur"
              />
              <Input
                type="number"
                value={shadowOffsetX}
                onChange={(e) => setShadowOffsetX(Number(e.target.value))}
                className="w-20"
                placeholder="Offset X"
              />
              <Input
                type="number"
                value={shadowOffsetY}
                onChange={(e) => setShadowOffsetY(Number(e.target.value))}
                className="w-20"
                placeholder="Offset Y"
              />
            </>
          )}
        </div>

        <Button onClick={addTextToCanvas}>Add Text</Button>
      </div>
    </div>
  );
}
