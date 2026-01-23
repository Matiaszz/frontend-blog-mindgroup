import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../components/ui/FormInput";
import { useArticles } from "../hooks/useArticles";
import { Clock, Eye, Grid, Heart, LayoutGrid, LayoutList, List, Search, SearchIcon, View } from "lucide-react";
import { API_URL, fetchApi } from "../services/api";
import { ArticleImage } from "../components/ArticleImage";
import { NavLink } from "../components/ui/NavLink";
import { useTheme } from "../hooks/useTheme";
import { ListArticleCard } from "../components/ListArticleCard";

export function Articles() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [view, setView] = useState<'grid' | 'column'>('grid');
    const {user, loading} = useUser();
    const articlesHook = useArticles();
    const {classes} = useTheme();

    
    useEffect(() => {
        if (!loading && !user){
            navigate('/login');
            return;
        }
    }, [loading]);

    const extenseDateFormat = (date: string) => {
      return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date));
    }

    const compactDateFormat = (date: string) => {
       return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date));
    }

    const filteredArticles = articlesHook.articles.filter(a =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <h2>Carregando...</h2>
    return (
        <section className={`flex flex-col p-16 min-w-screen min-h-screen gap-5 ${classes.textClass}`}>
            <div>
                <h2 className="text-[24px] font-semibold">Todos os Artigos</h2>
                <p className="text-[var(--muted-text)] text-[18px]">Explore nossa coleção completa de artigos técnicos</p>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center gap-1 border border-[var(--border)] pt-2 pb-2 pl-4 min-w-90">
                    <SearchIcon size={16} />
                    <FormInput
                    ignoreCSS
                    className="border-[var(--border)] min-w-[90%]"
                    identifier="search"
                    label=""
                    type="text"
                    placeholder={`Buscar artigos...`}  onChangeAction={(e) => setSearch(e.target.value)}/>
                </div>
                <div className="flex justify-between items-center gap-6">
                    <select 
                      name="categories" 
                      id="categories" 
                      onChange={(e) => setCategory(e.target.value)}
                  >
                      <option value="">Selecione uma categoria</option>
                      <option value="tech">Tecnologia</option>
                      <option value="games">Jogos</option>
                      <option value="lifestyle">Estilo de vida</option>
                  </select>

                  <div className="flex gap-3">

                    <button  className={`${view === 'grid' ? 'bg-orange-400' : ''} p-2 transition hover:cursor-pointer`}>
                      <LayoutGrid size={25} className={view === 'grid' ? '' : ''} 
                    onClick={() => setView('grid')}
                    /></button>

                    <button className={`${view === 'column' ? 'bg-orange-400' : ''} p-2 transition hover:cursor-pointer`}
                    onClick={() => setView('column')} 
                    ><LayoutList/></button>
                  </div>
                </div>
            </div>

            <div className={`flex flex-col gap-5`}>
              {!articlesHook.loading && !loading && filteredArticles.map((a) => (
               <ListArticleCard a={a}/>
              ))}
            </div>

        </section>
    );
}
