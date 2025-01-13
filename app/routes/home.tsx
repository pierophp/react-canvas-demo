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

    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = textColor;
    ctx.fillText(text, 20, 40);
  };

  return (
    <div className="p-4 space-y-4">
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />
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
        <Button onClick={addTextToCanvas}>Add Text</Button>
      </div>
    </div>
  );
}
