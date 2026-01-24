import { useEffect, useState } from "react";
import type { Category } from "../@types/dtos";
import { getAllCategories } from "../services/categoryService";

export function useCategories(){
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchCategories(){
            try {
                const res = await getAllCategories();
                if (!res.data && res.errors){
                    throw new Error('An error occurred.');
                }
                setCategories(res.data ?? []);
            } catch(e){
                console.error("Error on hook useCategories: ", e);
            }
            
            setLoading(false);
        }
        
        fetchCategories()
    }, []);

    return { categories, loading};

}