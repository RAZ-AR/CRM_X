import { NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

export async function GET() {
  try {
    const stored = await put("crmx-ping.json", JSON.stringify({ t: Date.now() }), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    const listed = await list({ prefix: "crmx", limit: 20 });
    return NextResponse.json({
      ok: true,
      pathname: stored.pathname,
      url: Boolean(stored.url),
      download: Boolean(stored.downloadUrl),
      count: listed.blobs.length,
      names: listed.blobs.map((b) => b.pathname),
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "err" }, { status: 500 });
  }
}
