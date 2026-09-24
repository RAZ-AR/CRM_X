/** Заголовок страницы в едином стиле: маленькая подпись сверху, крупное название, действия справа. */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3 pb-2">
      <div className="flex flex-col gap-1 min-w-0">
        {eyebrow && <span className="cap">{eyebrow}</span>}
        <h1 className="page-title m-0">{title}</h1>
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </header>
  );
}

/** Карточка-секция с заголовком. */
export function Section({
  eyebrow,
  title,
  action,
  className = "",
  children,
}: {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`card p-5 md:p-6 min-w-0 ${className}`}>
      {(eyebrow || title || action) && (
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2 mb-4">
          <div className="flex flex-col gap-1 min-w-0">
            {eyebrow && <span className="cap">{eyebrow}</span>}
            {title && <h2 className="m-0 text-[17px] md:text-[19px] font-semibold tracking-tight">{title}</h2>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
