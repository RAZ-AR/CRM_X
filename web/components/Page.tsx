export function Page({
  emoji,
  title,
  children,
}: {
  emoji?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[900px] mx-auto px-10 py-12">
      {emoji && <div className="text-6xl mb-3 select-none">{emoji}</div>}
      <h1 className="n-page-title mb-6">{title}</h1>
      {children}
    </div>
  );
}
