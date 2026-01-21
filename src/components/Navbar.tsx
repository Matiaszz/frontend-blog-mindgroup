import { useTheme } from "../hooks/useTheme";
import { ThemeToogle } from "./ui/ThemeToogle";
import { NavLink } from "./ui/NavLink";
import { Logo } from "./ui/Logo";
import { Button } from "./Button";

export function Navbar(){
    const {classes} = useTheme();
    return (
        <nav className={`fixed flex justify-between items-center p-3 min-w-full border-b ${classes.borderClass} ${classes.bgClass}`}>
            <ul className="flex items-center justify-center">
                <Logo/>
            </ul>
            <ul className={`flex items-center justify-center gap-2.5 ${classes.textClass}`}>
                <NavLink to="#">Home</NavLink>
                <NavLink to="#">Artigos</NavLink>
                <div className={`w-[0.5px] bg-[var(--muted)] h-5 `}></div>
                <li><ThemeToogle/></li>
                <NavLink to="#">Entrar</NavLink>
                <Button onClickAction={() => {console.log('Jose')}}>Cadastrar</Button>
            </ul>
        </nav>
    )
}