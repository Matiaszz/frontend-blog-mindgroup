
type ButtonProps = {
  children: React.ReactNode;
  onClickAction: () => void;
};

export function Button({children, onClickAction}: ButtonProps){
    return <button onClick={onClickAction} className="bg-[var(--primary)] transition p-2.5 text-[var(--bg)] hover:bg-cyan-800 hover:cursor-pointer">{children}</button>
}