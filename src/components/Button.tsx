
type ButtonProps = {
  children: React.ReactNode;
  onClickAction: () => void;
  invertColors?: boolean;
};

export function Button({
  children,
  onClickAction,
  invertColors = false,
}: ButtonProps) {
  const baseClasses =
    "transition p-2.5 hover:cursor-pointer";

  const normalClasses =
    "bg-[var(--primary)] text-[var(--bg)] hover:bg-cyan-800";

  const invertedClasses =
    "bg-[var(--bg)] text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--bg)]";

  return (
    <button
      onClick={onClickAction}
      className={`${baseClasses} ${
        invertColors ? invertedClasses : normalClasses
      }`}
    >
      {children}
    </button>
  );
}