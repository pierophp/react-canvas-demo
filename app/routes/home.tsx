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

interface TextItem {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Canvas Demo" },
    { name: "description", content: "Canvas Demo!" },
  ];
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textItems, setTextItems] = useState<TextItem[]>([
    { id: "1", text: "", color: "#FFFFFF", x: 20, y: 40 },
  ]);
  const [fontSize, setFontSize] = useState("24");
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

  const addNewTextItem = () => {
    setTextItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: "",
        color: "#FFFFFF",
        x: 20,
        y: 40 + prev.length * 30, // Offset Y position for each new item
      },
    ]);
  };

  const updateTextItem = (id: string, updates: Partial<TextItem>) => {
    setTextItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const removeTextItem = (id: string) => {
    setTextItems((prev) => prev.filter((item) => item.id !== id));
  };

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

      // Set shadow properties
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

      // Draw each text item
      textItems.forEach((item) => {
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = item.color;
        ctx.fillText(item.text, item.x, item.y);
      });
    };
  };

  return (
    <div className="p-4 space-y-4">
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />

      <div className="grid gap-4">
        {/* Font size selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Font Size:</span>
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

        {/* Text items */}
        {textItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2 flex-wrap">
            <Input
              type="text"
              value={item.text}
              onChange={(e) =>
                updateTextItem(item.id, { text: e.target.value })
              }
              placeholder="Enter text..."
              className="max-w-sm"
            />
            <Input
              type="color"
              value={item.color}
              onChange={(e) =>
                updateTextItem(item.id, { color: e.target.value })
              }
              className="w-12 h-10 p-1"
            />
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={item.x}
                onChange={(e) =>
                  updateTextItem(item.id, { x: Number(e.target.value) })
                }
                className="w-20"
                placeholder="X"
              />
              <Input
                type="number"
                value={item.y}
                onChange={(e) =>
                  updateTextItem(item.id, { y: Number(e.target.value) })
                }
                className="w-20"
                placeholder="Y"
              />
            </div>
            <Button
              variant="destructive"
              onClick={() => removeTextItem(item.id)}
              className="px-2 h-9"
            >
              Remove
            </Button>
          </div>
        ))}

        <Button onClick={addNewTextItem} variant="outline" className="w-full">
          Add New Text
        </Button>

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

        <Button onClick={addTextToCanvas}>Update Canvas</Button>
      </div>
    </div>
  );
}
