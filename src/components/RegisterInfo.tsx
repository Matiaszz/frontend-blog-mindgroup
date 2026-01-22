import { Logo } from "./ui/Logo";

export function RegisterInfo(){
    return (
        <div className="flex justify-center items-center flex-col ">
            <Logo alwaysWhite={false} size={36}/>
            <h3 className="text-[32px] font-bold">Entrar na Plataforma</h3>
            <p className="text-[18px] text-[var(--muted-text)]">Acesse sua conta para gerenciar seus artigos</p>
        </div>
    )
}