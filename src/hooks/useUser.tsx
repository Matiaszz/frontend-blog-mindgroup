import { useEffect, useState } from "react";
import type { User } from "../@types/dtos";
import { getUser } from "../services/userService";

export function useUser(){
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchUser(){
            try {
                const res = await getUser();
                if (res.errors){
                    throw new Error('An error occurred.');
                }
                setUser(res.data);
            } catch(e){
                console.error("Error on hook useUser: ", e);
            }
            
            setLoading(false);
        }
        
        fetchUser()
    }, []);

    return {user, loading};

}