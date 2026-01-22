import { useTheme } from "../hooks/useTheme";
import { ThemeToogle } from "./ui/ThemeToogle";
import { NavLink } from "./ui/NavLink";
import { Logo } from "./ui/Logo";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { NavbarDropdown } from "./ui/NavbarDropdown";

type NavbarProps = {
    showAuthLinks: boolean;
}


export function Navbar({showAuthLinks = true}: NavbarProps){
    const {classes} = useTheme();
    const navigate = useNavigate(); 
    const {user, loading} = useUser();

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className={`fixed flex justify-between items-center p-3 min-w-full border-b ${classes.borderClass} ${classes.bgClass}`}>
            <ul className="flex items-center justify-center">
                <Logo alwaysWhite={false} size={36}/>
            </ul>
            <ul className={`flex items-center justify-center gap-2.5 ${classes.textClass}`}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/artigos">Artigos</NavLink>
                <div className={`w-[0.5px] bg-[var(--muted)] h-5 `}></div>
                <li><ThemeToogle/></li>

                {showAuthLinks && !loading && !user && (
                    <>
                        <NavLink to="/login">Entrar</NavLink>
                        <Button onClickAction={() => {navigate('/register')}}>Cadastrar</Button>
                    </>
                )}

                {showAuthLinks && !loading && user && (
                    <div className="w-8 h-8">
                        <button className="hover:cursor-pointer" onClick={() => setShowDropdown(prev => !prev)}>
                            <img
                            src={user.user.profilePictureUrl ?? 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png'} />
                        </button>
                        <NavbarDropdown size={210} show={showDropdown} />
                    </div>
                )}
                
            </ul>
        </nav>
    )
}