import { Github, Linkedin, Twitter } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { Logo } from "./ui/Logo";
import { NavLink } from "./ui/NavLink";


export function Footer(){
    const {classes} = useTheme();
    return (
        <footer className={`min-w-screen min-h-77.5 bg-[var(--secondary)] ${classes.borderClass} border border-t-[var(--border)] p-16`}>
            <div className="flex justify-between items-center border-b-[1px] border-b-[var(--border)] pb-2">
                {/* left */}
                <div>
                    <div className="max-w-77">
                        <Logo alwaysWhite size={30}/>
                        <p className="text-[15px] text-gray-400">Seu portal de tecnologia com artigo, tutoriais e novidades do mundo tech.</p>
                    </div>
                </div>

                {/* right */}
                <div className="flex gap-30 p-3">
                    <nav>
                        <h3 className="font-semibold">Navegação</h3>
                        <ul className="text-[var(--muted-text)]">
                            <NavLink to='/'>Home</NavLink>
                            <NavLink to='/artigos'>Artigos</NavLink>
                            <NavLink to='/dashboard'>Dashboard</NavLink>
                        </ul>
                    </nav>
                    <nav>
                        <h3 className="font-semibold">Redes Sociais</h3>
                        <ul className="flex gap-3 text-[var(--muted-text)]">
                            <li><a className="transition transform hover:underline hover:text-[var(--primary)]" target="_blank" href="https://www.linkedin.com/in/matiassdev/"><Linkedin/></a></li>
                            <li><a className="transition transform hover:underline hover:text-[var(--primary)]" target="_blank" href="https://github.com/Matiaszz/"><Github/></a></li>
                            <li><a className="transition transform hover:underline hover:text-[var(--primary)]" target="_blank" href="#"><Twitter/></a></li>
                        </ul>
                    </nav>

                </div>
                
            </div>
            <p className="text-center mt-8 text-sm text-[var(--muted-text)]">
                &copy; 2025 TechBlog. Todos os direitos reservados.
            </p>
            
        </footer>
    )
}