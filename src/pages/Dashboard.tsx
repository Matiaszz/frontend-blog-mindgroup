import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { File, FileText, Heart, Icon, MessageSquare, Plus, Settings, TrendingUp } from "lucide-react";
import type { Article } from "../@types/dtos";
import { getMyArticles } from "../services/articleService";

export function Dashbaord() {
    const navigate = useNavigate();
    const {user, loading} = useUser();
    const [articles, setArticles] = useState<Article[]>([]);
    
    useEffect(() => {
        async function setup(){
            if (!loading && !user){
                navigate('/login');
                return;
            }
            const myArticles = await getMyArticles();
            setArticles(myArticles.data ?? []);
        }
        setup();      

    }, [loading]);

    function getTotalComments(): number{
        let s = 0;
        articles.forEach(a => {
            s += a.comments.length;
        });

        return s;
    }

    function getTotalLikes(): number{
        let s = 0;
        articles.forEach(a => {
            s += a.likes.length;
        });

        return s;
    }

    function getAverageReadTime(){
        let s = 0;
        articles.forEach(a => {
            s += a.averageReadTimeInMinutes;
        });

        return Math.ceil(s / articles.length);
    }

    if (loading) return <h2>Carregando...</h2>
    return (
    <section className="flex flex-col min-w-screen min-h-screen p-20 gap-10">
        <div className="flex items-center justify-between min-w-[90%] ">
            <div>
            <h2 className="text-[36px]">Dashboard</h2>
            <p className="text-[var(--muted-text)]">
                Bem vindo de volta, {user?.name}!
            </p>
            </div>
            <div className="flex gap-3">
                <Button invertColors onClickAction={() => console.log("Config")}>
                    <span className="flex gap-2 items-center">
                        <Settings />
                        Configurações
                    </span>
                </Button>

                <Button onClickAction={() => console.log("new article")}>
                    <span className="flex gap-2 items-center">
                        <Plus />
                        Novo Artigo
                    </span>
                </Button>

            </div>
        </div>

        <div className="flex gap-5 justify-center">
            <InfoCard title="Total de Artigos" icon='file' metric={articles.length} />
            <InfoCard title="Engajamento" icon='comment' metric={getTotalComments()} />
            <InfoCard title="Curtidas" icon='like' metric={getTotalLikes()} />
            <InfoCard title="Tempo médio de leitura" icon='upscale' metric={getAverageReadTime()} />
        </div>

        
    </section>
  );
}

function InfoCard({title, icon, metric}: {title: string, icon: 'file' | 'comment' | 'like' | 'upscale', metric: number}){

    const icons = {
        'file': <FileText className="text-[var(--muted-text)] text-[18px]"></FileText>,
        'comment': <MessageSquare className="text-[var(--muted-text)] text-[18px]"/>,
        'like': <Heart className="text-[var(--muted-text)] text-[18px]"/>,
        'upscale': <TrendingUp className="text-[var(--muted-text)] text-[18px]"/>
    }

    return (
    <div className="flex flex-col w-75 h-27 border border-[var(--border)] p-3">
        <div className="flex justify-between items-center">
            <h4 className="text-[var(--muted-text)] text-[18px]">{title}</h4>
            {icons[icon]}
        </div>
        
        <p className="text-[32px]">{metric}</p>
    </div>
    )
}