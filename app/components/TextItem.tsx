import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";

interface TextItemProps {
  item: {
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
  };
  updateTextItem: (id: string, updates: Partial<TextItem>) => void;
  removeTextItem: (id: string) => void;
}

export function TextItem({
  item,
  updateTextItem,
  removeTextItem,
}: TextItemProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        value={item.text}
        onChange={(e) => updateTextItem(item.id, { text: e.target.value })}
        placeholder="Enter text..."
      />
      <Input
        type="color"
        value={item.color}
        onChange={(e) => updateTextItem(item.id, { color: e.target.value })}
        className="w-12 h-10 p-1"
      />
      <Select
        value={item.fontSize}
        onValueChange={(value) => updateTextItem(item.id, { fontSize: value })}
      >
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
      <Input
        type="number"
        value={item.x}
        onChange={(e) => updateTextItem(item.id, { x: Number(e.target.value) })}
        className="w-20"
        placeholder="X"
      />
      <Input
        type="number"
        value={item.y}
        onChange={(e) => updateTextItem(item.id, { y: Number(e.target.value) })}
        className="w-20"
        placeholder="Y"
      />

      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2">
          <Input
            type="checkbox"
            checked={item.useShadow}
            onChange={(e) =>
              updateTextItem(item.id, { useShadow: e.target.checked })
            }
            className="w-4 h-4"
          />
          <span className="text-sm">Shadow</span>
        </label>
      </div>

      {item.useShadow && (
        <>
          <Input
            type="color"
            value={item.shadowColor || "#000000"}
            onChange={(e) =>
              updateTextItem(item.id, { shadowColor: e.target.value })
            }
            className="w-12 h-10 p-1"
          />
          <Input
            type="number"
            value={item.shadowBlur || 4}
            onChange={(e) =>
              updateTextItem(item.id, { shadowBlur: Number(e.target.value) })
            }
            className="w-20"
            placeholder="Blur"
          />
          <Input
            type="number"
            value={item.shadowOffsetX || 2}
            onChange={(e) =>
              updateTextItem(item.id, { shadowOffsetX: Number(e.target.value) })
            }
            className="w-20"
            placeholder="X Offset"
          />
          <Input
            type="number"
            value={item.shadowOffsetY || 2}
            onChange={(e) =>
              updateTextItem(item.id, { shadowOffsetY: Number(e.target.value) })
            }
            className="w-20"
            placeholder="Y Offset"
          />
        </>
      )}

      <Button
        variant="destructive"
        onClick={() => removeTextItem(item.id)}
        className="px-2"
      >
        Remove
      </Button>
    </div>
  );
}
