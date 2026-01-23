import { useEffect, useState } from "react";
import type { Article, User } from "../@types/dtos";
import { getAllArticles } from "../services/articleService";

export function useArticles(){
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchUser(){
            try {
                const res = await getAllArticles();
                if (!res.data && res.errors){
                    throw new Error('An error occurred.');
                }
                setArticles(res.data ?? []);
            } catch(e){
                console.error("Error on hook useArticles: ", e);
            }
            
            setLoading(false);
        }
        
        fetchUser()
    }, []);

    return { articles, loading};

}