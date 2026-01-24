import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

export function Dashbaord() {
    const navigate = useNavigate();
    const {user, loading} = useUser();
    
    useEffect(() => {
        if (!loading && !user){
            navigate('/login');
            return;
        }
    }, [loading]);

    if (loading) return <h2>Carregando...</h2>
    return (
        <section></section>
    );
}