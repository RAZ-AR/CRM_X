import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Quicky для телефона — статическая страница из public/quicky (копия design/quicky, см. scripts/sync-quicky.mjs).
  // Открываем сразу index.html: её относительные ссылки (иконки, manifest) должны считаться от /quicky/.
  async redirects() {
    return [{ source: "/quicky", destination: "/quicky/index.html", permanent: false }];
  },
};

export default nextConfig;
