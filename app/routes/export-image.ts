import { generateCanvas } from "~/actions/canvas";
import type { Route } from "./+types/export-image";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const textItems = JSON.parse(formData.get("textItems") as string);

  const buffer = await generateCanvas(textItems);

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
}
