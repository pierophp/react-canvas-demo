import type { Route } from "./+types/home";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { TextItem } from "~/components/TextItem";

interface TextItem {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
  fontSize: string;
  useShadow?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
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
    {
      id: "1",
      text: "",
      color: "#FFFFFF",
      x: 20,
      y: 40,
      fontSize: "16",
      useShadow: false,
      shadowColor: "#000000",
      shadowBlur: 4,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
    },
  ]);

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
        y: 40 + prev.length * 30,
        fontSize: "16",
        useShadow: false,
        shadowColor: "#000000",
        shadowBlur: 4,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
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

    const img = new Image();
    img.src = "/tree.jpg";
    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      textItems.forEach((item) => {
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
    };
  };

  const downloadCanvas = async () => {
    const formData = new FormData();
    formData.append("textItems", JSON.stringify(textItems));

    const response = await fetch("/export-image", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const url = window.URL.createObjectURL(await response.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = "canvas.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />

      <div className="grid gap-4">
        {/* Text items */}
        {textItems.map((item) => (
          <TextItem
            key={item.id}
            item={item}
            updateTextItem={updateTextItem}
            removeTextItem={removeTextItem}
          />
        ))}

        <Button onClick={addNewTextItem} variant="outline" className="w-full">
          Add New Text
        </Button>

        <Button onClick={addTextToCanvas}>Update Canvas</Button>
        <Button onClick={downloadCanvas} variant="secondary">
          {"Download Canvas"}
        </Button>
      </div>
    </div>
  );
}
