
type ButtonProps = {
  children: React.ReactNode;
  onClickAction: () => void;
  invertColors?: boolean;
  className?: string;
  ignoreCSS?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

export function Button({
  children,
  onClickAction,
  type = 'submit',
  invertColors = false,
  className = '',
  ignoreCSS = false,
  disabled = false
  
}: ButtonProps) {
  const baseClasses =
    `transition p-2.5 hover:cursor-pointer ${className}`;

  const normalClasses =
    "bg-[var(--primary)] text-[var(--bg)] hover:bg-cyan-800";

  const invertedClasses =
    "bg-[var(--bg)] text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--bg)]";

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClickAction}
      className={`${!ignoreCSS ? `${baseClasses} ${invertColors ? invertedClasses : normalClasses}` : className}`}
    >
      {children}
    </button>
  );
}