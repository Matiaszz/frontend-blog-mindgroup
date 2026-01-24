import type React from "react"

type InputProps = {
    onChangeAction: (value: string) => void;
    type: 'password' | 'email' | 'text' | 'date' | 'file' | 'textarea';
    identifier: string;
    placeholder: string;
    label: string;  
    ignoreCSS?: boolean;
    className?: string;
    required?: boolean;
    isTextArea?: boolean;
    readonly?: boolean;
}

export function FormInput({onChangeAction, type, identifier, placeholder, label, readonly = false, ignoreCSS = false, className = '', required = false}: InputProps){
    return (
    <>
        {type !== 'textarea' && (
            <>
                <label className="text-[12px]" htmlFor={identifier}>{label} {`${required ? '*' : ''}`}</label>
                <input
                required={required}
                readOnly={readonly}
                className={`${!ignoreCSS ? 'border-2 border-[var(--border)] p-2 bg-[var(--secondary)] text-[var(--muted-text)]' : ''} ${className}`}
                onChange={(e) => onChangeAction(e.target.value)}
                type={type}
                name={identifier}
                id={identifier}
                placeholder={placeholder}
/>
            </>
            
        )}
        {type === 'textarea' && (
            <>
                <label className="text-[12px]" htmlFor={identifier}>{label} {`${required ? '*' : ''}`}</label>
                <textarea
                required={required}
                readOnly={readonly}
                className={`${!ignoreCSS ? 'border-2 border-[var(--border)] p-2 bg-[var(--secondary)] text-[var(--muted-text)]' : ''} ${className}`}
                onChange={(e) => onChangeAction(e.target.value)}
                name={identifier}
                id={identifier}
                placeholder={placeholder}
/>
            </>
        )}
        
    </>
    )
}