import React from "react";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ title, onClose, children }: ModalProps) {
    return (
        <div
        className={`
            text-[var(--text)]
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40
            animate-fade-in
        `}
        >
        <div
            className="
            w-full max-w-md
            border border-[var(--border)]
            shadow-lg
            p-6
            relative
            animate-modal-in
            bg-[var(--secondary)]
            "
            
        >
            <button
            onClick={onClose}
            className="absolute right-4 top-4  hover:cursor-pointer"
            >
            ✕
            </button>

            <h3 className={`text-xl font-semibold mb-4 text-[var(--text)]`}>
            {title}
            </h3>

            {children}
        </div>
        </div>
    );
}