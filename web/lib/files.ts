import type { Attachment } from "./types";

export async function filesToAttachments(files: FileList | File[]): Promise<Attachment[]> {
  const out: Attachment[] = [];
  for (const f of Array.from(files)) {
    if (f.size > 900_000) {
      alert(`Файл ${f.name} больше 900 КБ — пропусти`);
      continue;
    }
    const dataUrl = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result));
      r.onerror = () => rej(r.error);
      r.readAsDataURL(f);
    });
    out.push({
      id: `a-${crypto.randomUUID().slice(0, 8)}`,
      name: f.name,
      type: f.type,
      dataUrl,
    });
  }
  return out;
}
