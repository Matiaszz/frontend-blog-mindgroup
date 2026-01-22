import type React from "react";
import { RegisterInfo } from "../components/RegisterInfo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { NavLink } from "../components/ui/NavLink";
import { FormInput } from "../components/ui/FormInput";
import { LogIn } from "lucide-react";
import { login } from "../services/authService";

export function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {classes} = useTheme();

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        setLoading(true);
        try{
            const res = await login({
                email,
                password
            });

            if (res.errors){
                alert(res.errors)
                console.error(res);
                return;
            }
            alert('Entrada efetuada com sucesso!')
            navigate('/dashboard');

        } finally {
            setLoading(false);
        }
    }


    return (
        <section className="flex justify-center items-center flex-col gap-5 min-w-screen min-h-screen">
            <RegisterInfo/>
            <div className={`${classes.textClass}`}>
                <div>
                    <form className={`flex flex-col justify-center gap-1.5 p-5 border-2 border-[var(--border)] w-80 h-fit`} onSubmit={handleSubmit}>
                        <FormInput
                            identifier="email"
                            label="Email"
                            type="email"
                            placeholder="exemplo@email.com"
                            onChangeAction={(e) => setEmail(e.target.value)}
                        />
                        <FormInput
                            identifier="password"
                            label="Senha"
                            type="password"
                            placeholder="*********"
                            onChangeAction={(e) => setPassword(e.target.value)}
                        />
                        

                        <button  className="bg-[var(--primary)] transition p-2.5 text-[var(--bg)] hover:bg-cyan-800 hover:cursor-pointer mt-3 flex justify-center items-center gap-2"
                         disabled={loading} type="submit"><LogIn size={16}/>{loading ? 'Carregando...' : `Entrar`}</button>
                        <div className="h-[1px] min-w-[80%] bg-[var(--muted)] mt-3"></div>
                        <div className="flex justify-center text-[16px]">
                            <p className="list-none flex gap-1 text-center"><span className="text-[var(--muted-text)]">Ainda não tem uma conta?</span> <NavLink to='/register'>Criar conta</NavLink></p>
                        </div>
                    </form>
                </div>
                
               
            </div>
            
        </section>
    );
}