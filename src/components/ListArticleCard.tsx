import { Clock, Eye, Heart } from "lucide-react";
import type { Article } from "../@types/dtos";
import { ArticleImage } from "./ArticleImage";
import { Link } from "react-router-dom";


export function ListArticleCard({a}: {a: Article}){
    const extenseDateFormat = (date: string) => {
      return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date));
    }
    return (
        <Link to='/dashboard' key={a.id} 
            className="
            bg-[var(--secondary)] 
            border 
            border-[var(--border)] 
            pr-3 pl-3 pb-6 pt-6 flex gap-10 
            transition 
            hover:cursor-pointer 
            hover:border-[var(--primary)]
            flex
            text-white
            ">
                <div>
                <ArticleImage className='w-88 h-52 ' postId={a.id} title={a.title} />                 
                </div>
                <div className="flex flex-col w-full pr-9">
                <div className="flex items-center justify-between">
                    <span className="bg-[var(--muted)] min-w-30 text-center text-[12px] p-1">{a.category.label}</span>
                    <span className="text-[12px] p-3 text-[var(--muted-text)]">{extenseDateFormat(a.createdAt)}</span>
                </div>
                <h2 className="font-semibold text-[20px]">{a.title}</h2>
                <p className="text-[14px]">{a.summary}</p>
                <div className="flex justify-between">
                    <div className="author">
                    <p className="text-[var(--muted-text)]">{a.author.name}</p>
                    </div>
                    <div className="flex gap-6">
                    <MetaInfo type="readTime" content={a.averageReadTimeInMinutes.toString()}/>
                    <MetaInfo type='views' content={a.views.toString()}/>
                    <MetaInfo type='likes' content={'3 (mock)'}/>
                </div>
                      
                </div>
            </div>
        </Link>
    )
}

function MetaInfo({content, type}: {content: string, type: 'likes' | 'views' | 'readTime'}){
    const icons = {
        'likes': <Heart className="text-[var(--muted-text)]" size={16} />,
        'views': <Eye className="text-[var(--muted-text)]" size={16} />,
        'readTime': <Clock className="text-[var(--muted-text)]" size={16} />
    }

    return (
        <div className="flex justify-center items-center gap-2">
            {icons[type]}
            <span className="text-[var(--muted-text)]">{content}</span>
        </div>
    )
}