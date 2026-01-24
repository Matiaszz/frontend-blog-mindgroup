import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Article } from "../@types/dtos";
import { getArticleById } from "../services/articleService";
import { useTheme } from "../hooks/useTheme";
import { ArrowLeft, Clock, Dot } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { MetaInfo } from "../components/ListArticleCard";
import { ArticleImage } from "../components/ArticleImage";
import ReactMarkdown from "react-markdown";

export function Article(){
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article>();
    const navigate = useNavigate();
    const {classes} = useTheme();
    const {user} = useUser();

    useEffect(() => {
        async function fetchArticle(){
            try {
                const res = await getArticleById(id ?? '');
                if (!res.data && res.errors){
                    navigate('/artigos');
                    throw new Error('An error occurred.');
                }
                setArticle(res.data!);
            } catch(e){
                console.error("Error on fetch Article: ", e);
            }
            
        }

        fetchArticle()
        
    }, [id, navigate]);

    if (!article){
        return null;
    }

    const compactDateFormat = (date: string) => {
       return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date));
    }


    return (
       <section className={`${classes.bgClass} ${classes.textClass} p-20 flex min-w-screen flex-col justify-center items-center gap-20`}>
            <div className="border-b border-b-[var(--border)] p-6 min-w-[80dvw]">
                <span className="flex gap-3">
                    <ArrowLeft/>
                    <Link to='/artigos'>Voltar aos artigos</Link>
                </span>
            </div>

            <article className="min-w-[60dvw] gap-10 flex flex-col">
                <div className="bg-orange-400 max-w-fit items-center p-1 text-black">
                    <p>{article.category.label}</p>
                </div>

                <div className="border-b border-b-[var(--border)] pb-3">
                    <h1 className="text-[64px]">{article.title}</h1>
                    <p className="text-[24px] text-[var(--muted-text)]">{article.summary}</p>
                </div>

                <div className="flex items-center gap-3 border-b border-b-[var(--border)] pb-10">
                    <img
                        className="w-15 h-15 rounded-full"
                        src={article?.author.profilePictureUrl}
                        alt="Profile picture"
                    />

                    <div className="flex justify-between min-w-[90%] items-center">
                        <div>
                            <p>
                                {article.author.name}
                            </p>

                            <div className="flex items-center gap-1 text-sm opacity-80">
                                <p>{compactDateFormat(article.createdAt)}</p>
                                <Dot size={14} />
                                <Clock size={12} />
                                <p>{article.averageReadTimeInMinutes} min</p>
                            </div>
                        </div>

                        <div className="flex justify-center items-center ">
                            <button>
                                <MetaInfo className={`
                                ${user && article.favorites.filter(f => f.userId === user.id).length > 0 ? 'fill-red-600 outline-0' : ''} 
                                hover:cursor-pointer hover:fill-red-600 hover:outline-0 hover:text-red-600 transition
                                `} content="" type="likes"/>
                            </button>
                            
                            <button>
                                <MetaInfo className={`
                                ${user && article.likes.filter(f => f.userId === user.id).length > 0 ? 'fill-yellow-500 outline-0' : ''} 
                                hover:cursor-pointer hover:fill-yellow-500 hover:outline-0 hover:text-yellow-500 transition
                                `} content="" type="favorite"/>
                            </button>

                            <button>
                                <MetaInfo className={`
                                hover:cursor-pointer hover:fill-blue-600 hover:outline-0 hover:text-blue-600 transition`} content="" type="share"/>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="flex gap-5 pb-4">
                        <MetaInfo className={`
                                hover:cursor-pointer hover:fill-red-600 hover:outline-0 hover:text-red-600 transition
                                `} content={article.likes.length.toString() + " Curtidas"} type="likes"/>
                            <MetaInfo className={`
                                hover:cursor-pointer hover:fill-red-600 hover:outline-0 hover:text-red-600 transition
                                `} content={article.views.toString() + " Vizualizações"} type="views"/>
                            <MetaInfo className={`
                                hover:cursor-pointer hover:fill-red-600 hover:outline-0 hover:text-red-600 transition
                                `} content={`X comentários`} type="comment"/>
                    </div>
                    <div className="flex flex-col gap-15 border-b border-b-[var(--border)] p-5">
                        <div className="flex items-center justify-center">
                            <ArticleImage
                            className="max-w-[90%]"
                            postId={article.id} title={article.title} />
                        </div>
                        <div>
                            <ReactMarkdown>  
                                {article.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                
                </div>
            </article>
            
       </section>
    )
}