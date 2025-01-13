import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface TextItemProps {
  item: {
    id: string;
    text: string;
    color: string;
    x: number;
    y: number;
  };
  updateTextItem: (
    id: string,
    updates: Partial<Omit<TextItemProps["item"], "id">>
  ) => void;
  removeTextItem: (id: string) => void;
}

export function TextItem({
  item,
  updateTextItem,
  removeTextItem,
}: TextItemProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Input
        type="text"
        value={item.text}
        onChange={(e) => updateTextItem(item.id, { text: e.target.value })}
        placeholder="Enter text..."
        className="max-w-sm"
      />
      <Input
        type="color"
        value={item.color}
        onChange={(e) => updateTextItem(item.id, { color: e.target.value })}
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
  );
}
