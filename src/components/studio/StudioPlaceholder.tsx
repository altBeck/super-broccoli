type StudioPlaceholderProps = {
  title: string;
  description: string;
};

export function StudioPlaceholder({ title, description }: StudioPlaceholderProps) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
        Studio module
      </p>
      <h1 className="mt-4 text-5xl font-semibold leading-tight">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        {description}
      </p>
      <div className="mt-8 rounded-lg border border-border bg-surface p-6">
        <h2 className="text-2xl font-semibold">Prepared for later</h2>
        <p className="mt-3 leading-8 text-muted">
          TODO: Add authentication, authorization, validation, and database
          rules before enabling real create, update, or delete actions.
        </p>
      </div>
    </div>
  );
}
