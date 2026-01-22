import type React from "react";
import { RegisterInfo } from "../components/RegisterInfo";
import { useState } from "react";
import { register } from "../services/authService";
import type { RegisterDTO } from "../@types/dtos";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Button } from "../components/Button";

export function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const {classes} = useTheme();

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        setLoading(true);
        try{
            const res = await register({
                name,
                email,
                password,
                confirmPassword
            });

            if (res.errors){
                console.error(res);
                return;
            }

            navigate('/dashboard');

        } finally {
            setLoading(false);
        }
    }


    return (
        <section className="flex justify-center items-center flex-col ">
            <RegisterInfo/>
            <div className={`${classes.textClass}`}>
                <form className={`flex flex-col`} onSubmit={handleSubmit}>
                    <input onChange={(e) => setName(e.target.value)} className="text-red-500" type="text" name="name" id="name" placeholder="John Doe" />
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="exemplo@email.com" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="*********"/>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" placeholder="*********" />
                    <button type="submit">Registrar</button>
                </form>
            </div>
            
        </section>
    );
}