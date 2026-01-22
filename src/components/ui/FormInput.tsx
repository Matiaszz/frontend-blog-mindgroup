import type React from "react"

type InputProps = {
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: 'password' | 'email' | 'text' | 'date';
    identifier: string;
    placeholder: string;
    label: string;
}

export function FormInput({onChangeAction, type, identifier, placeholder, label}: InputProps){
    return (
    <>
        <label className="text-[12px]" htmlFor={identifier}>{label}</label>
        <input className="border-2 border-[var(--border)] p-2 bg-[var(--secondary)] text-[var(--muted-text)]"
        onChange={onChangeAction} type={type} name={identifier} id={identifier} placeholder={placeholder} />
    </>
    )
}