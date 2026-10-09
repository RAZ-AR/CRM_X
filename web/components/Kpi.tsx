import Link from "next/link";

/** Плитка с цифрой: подпись, значение, пояснение и мини-график справа. */
export function Kpi({
  icon,
  label,
  value,
  sub,
  tone,
  href,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  tone?: "bad";
  href?: string;
  children?: React.ReactNode;
}) {
  const body = (
    <>
      <span className="flex items-center gap-2 text-[var(--muted)]">
        {icon}
        <span className="cap truncate">{label}</span>
      </span>
      <span className="flex items-end justify-between gap-2">
        <span className="flex flex-col gap-0.5 min-w-0">
          <span className={`num text-[28px] md:text-[34px] leading-none font-semibold tracking-[-0.02em] ${tone === "bad" ? "text-[var(--red)]" : ""}`}>{value}</span>
          <span className="cap truncate">{sub}</span>
        </span>
        {children}
      </span>
    </>
  );
  const cls = "card p-4 md:px-5 md:py-5 flex flex-col gap-3 min-w-0";
  return href ? (
    <Link href={href} className={`${cls} hover:border-[#d9d6ce]`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
