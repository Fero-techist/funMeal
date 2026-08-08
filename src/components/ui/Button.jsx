export default function Button({
  children,
  textOnly,
  className = "",
  ...props
}) {
  const defaultClasses = textOnly
    ? "text-button inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition hover:text-[#ffab04]"
    : "inline-flex items-center justify-center rounded-full bg-[#ffc404] px-5 py-2.5 text-[10px] font-bold text-[#1b170f] transition hover:bg-[#ffab04] disabled:opacity-60";

  const cssClasses = `${defaultClasses}${className ? ` ${className}` : ""}`;

  return (
    <button
      className={cssClasses}
      {...props}
    >
      {children}
    </button>
  );
}
