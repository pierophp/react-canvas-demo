import type { Route } from "./+types/home";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("");

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

    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(text, 20, 40);
  };

  return (
    <div className="p-4 space-y-4">
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          className="max-w-sm"
        />
        <Button onClick={addTextToCanvas}>Add Text</Button>
      </div>
    </div>
  );
}
