import type React from "react"

type InputProps = {
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: 'password' | 'email' | 'text' | 'date';
    identifier: string;
    placeholder: string;
    label: string;  
    ignoreCSS?: boolean;
    className?: string;

}

export function FormInput({onChangeAction, type, identifier, placeholder, label, ignoreCSS = false, className = ''}: InputProps){
    return (
    <>
        <label className="text-[12px]" htmlFor={identifier}>{label}</label>
        <input className={`${!ignoreCSS ? 'border-2 border-[var(--border)] p-2 bg-[var(--secondary)] text-[var(--muted-text)]' : ''} ${className}`}
        onChange={onChangeAction} type={type} name={identifier} id={identifier} placeholder={placeholder} />
    </>
    )
}