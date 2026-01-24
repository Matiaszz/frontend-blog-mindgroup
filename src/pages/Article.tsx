import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Article, Comment, CommentLike, Favorite, Like } from "../@types/dtos";
import { getArticleById, toggleCommentLike, toggleFavorite, toggleLike } from "../services/articleService";
import { useTheme } from "../hooks/useTheme";
import { ArrowLeft, Clock, Dot, Heart } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { MetaInfo } from "../components/ListArticleCard";
import { ArticleImage } from "../components/ArticleImage";
import ReactMarkdown from "react-markdown";
import { Button } from "../components/Button";
import remarkGfm from "remark-gfm";
import { createComment } from "../services/commentService";

export function Article(){
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article>();
    const navigate = useNavigate();
    const {classes} = useTheme();
    const {user, loading} = useUser();
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState<Like[]>([]);
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [disable, setDisable] = useState(false);
    const [userLiked, setUserLiked] = useState(false);
    const [userFavorited, setUserFavorited] = useState(false);
    const [commentLikes, setCommentLikes] = useState<Record<number, CommentLike[]>>([]);
    const [userCommentLikes, setUserCommentLikes] = useState<Record<number, boolean>>({})
    
    useEffect(() => {
        async function fetchArticle(){
            try {
                const res = await getArticleById(id ?? '');
                if (!res.data && res.errors){
                    navigate('/artigos');
                    throw new Error('An error occurred.');
                }
                setArticle(res.data!);
                setComments(res.data!.comments);
                setLikes(res.data!.likes);
                setFavorites(res.data!.favorites);
                setUserLiked(res.data!.likes.map(l => l.postId === res.data!.id && l.userId === user?.id).length > 0);

                const newCommentLikes: Record<number, CommentLike[]> = {};
                const newUserCommentLikes: Record<number, boolean> = {};
                res.data!.comments.forEach(c => {
                    newCommentLikes[c.id] = c.commentLikes; 
                    newUserCommentLikes[c.id] = c.commentLikes.some(cl => cl.userId === user?.id);
                });

                setCommentLikes(newCommentLikes);
                setUserCommentLikes(newUserCommentLikes);
                

                setUserFavorited(res.data!.favorites.map(l => l.postId === res.data!.id && l.userId === user?.id).length > 0);
            } catch(e){
                console.error("Error on fetch Article: ", e);
            }
            
        }

        fetchArticle()
        
    }, [id, navigate, user]);

    if (!article || !user) return;


    async function handleCommentSubmit(){
        if (!comment.trim() || !article){
            return;
        }

        const res = await createComment({
            postId: article.id,
            content: comment.trim()
        });

        if (res.errors){
            alert(res.errors);
            return;
        }
        if (res.data) {
            const newComment: Comment = {
                id: res.data.id,
                content: res.data.content,
                postId: res.data.postId,
                user: res.data.user,
                commentLikes: res.data.commentLikes || [],
                createdAt: res.data.createdAt
            };

            setComments(prev => [newComment, ...prev]);
            setComment('');
        }
        setComment('');

    }

    async function handleLike() {
        const res = await toggleLike({
            postId: article!.id,
        });

        if (!res.data) return;

        if (res.data.body?.like){
            setLikes([...likes, {id: res.data.body.id, userId: user?.id ?? '', postId: article?.id ?? '', like: true}]);
            setUserLiked(true);
            return;
        } 

        setLikes(likes.filter(l => l.userId !== user?.id && l.postId !== article?.id));
        setUserLiked(false);
        

    }

     async function handleCommentLike(commentId: number) {
        if (!user || !article) return;

        try {
            const res = await toggleCommentLike({ commentId });
            if (!res.data) return;

            const currentLikes = commentLikes[commentId] || [];

            if (res.data.body?.commentLiked) {
                const newLike: CommentLike = {
                    id: res.data.body.id,
                    userId: user.id,
                    postId: article.id,
                    commentId: commentId,
                    commentLiked: true,
                };

                setCommentLikes({
                    ...commentLikes,
                    [commentId]: [...currentLikes, newLike],
                });

                setUserCommentLikes({
                    ...userCommentLikes,
                    [commentId]: true,
                });
                return;
            }
        const updatedLikes = currentLikes.filter(l => l.userId !== user.id);

        setCommentLikes({
            ...commentLikes,
            [commentId]: updatedLikes,
        });

        setUserCommentLikes({
            ...userCommentLikes,
            [commentId]: false,
        });

        return;
        } catch (err) {
            console.error("Erro ao curtir comentário:", err);
        }
    }


    async function handleFavorite() {
        const res = await toggleFavorite({
            postId: article!.id
        });

        if (!res.data) return;

        if (res.data.body?.favorited){
            setFavorites([...favorites, {id: res.data.body.id, userId: user?.id ?? '', postId: article?.id ?? '', favorited: true}]);
            setUserFavorited(true);
            return;
        }

        setFavorites(favorites.filter(l => l.userId !== user?.id && l.postId !== article?.id));
        setUserFavorited(false);
    }

    async function handleShare() {
        const currentUrl = window.location.href;
        await navigator.clipboard.writeText(currentUrl);
        alert("URL copiada para a área de transferência!");
    }

    if (!article){
        return <p>Carretgando..</p>;
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
                            <button onClick={handleLike}>
                                <MetaInfo className={`
                                ${user && userLiked ? 'fill-red-600  text-red-600' : ''} 
                                hover:cursor-pointer hover:fill-red-600 hover:outline-0 hover:text-red-600 transition
                                `} content="" type="likes"/>
                            </button>
                            
                            <button onClick={handleFavorite}>
                                <MetaInfo className={`
                                ${user && userFavorited ? 'fill-yellow-500 text-yellow-500' : ''} 
                                hover:cursor-pointer hover:fill-yellow-500 hover:outline-0 hover:text-yellow-500 transition
                                `} content="" type="favorite"/>
                            </button>

                            <button onClick={handleShare}>
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
                            `} content={likes.length.toString() + " Curtidas"} type="likes"/>
                        <MetaInfo className={`
                            hover:cursor-pointer hover:fill-red-600 hover:outline-0 hover:text-red-600 transition
                            `} content={article.views.toString() + " Vizualizações"} type="views"/>
                        <MetaInfo className={`
                            hover:cursor-pointer hover:fill-red-600 hover:outline-0 hover:text-red-600 transition
                            `} content={`${comments.length} Comentários`} type="comment"/>
                    </div>
                    <div className="flex flex-col gap-15 border-b border-b-[var(--border)] p-5">
                        <div className="flex items-center justify-center">
                            <ArticleImage
                            className="max-w-[90%]"
                            postId={article.id} title={article.title} />
                        </div>
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {article.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                
                </div>

                <div className="flex gap-4 border-b border-b-[var(--border)] pb-10 items-center">
                    {article.postTags.map(t => (
                        <span className="p-1 bg-[var(--secondary)]">
                            {t.tag.name}
                        </span>
                    ))}
                </div>

                <div className="flex flex-col gap-5">
                    <h3>Comentário ({comments.length})</h3>
                    <div className="flex flex-col gap-4">
                        {!user && !loading && (<LoginCommentPlaceholder/>)}
                        {user && !loading && (
                            <>
                                <textarea 
                                onChange={(e) => setComment(e.target.value)}
                                className="bg-[var(--secondary)] border border-[var(--border)] min-w-full min-h-37 p-3"
                                name="comment" id="comment">
                                </textarea>
                                <Button onClickAction={() => handleCommentSubmit()}>Publicar Comentário</Button>
                            </>
                        )}
                        {user && !loading && comments.map(comment => (
                        <div key={comment.id} className="min-w-full border border-[var(--border)] p-8 mb-4">
                            <div className="flex gap-5">
                            <div className="w-16 h-16">
                                <img
                                src={comment.user.profilePictureUrl}
                                alt="Profile picture"
                                className="w-full h-full rounded-full object-cover"
                                />
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <p className="font-semibold">{comment.user.name}</p>
                                    <p className="text-sm text-gray-500">{compactDateFormat(comment.createdAt)}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleCommentLike(comment.id)}>
                                        <Heart
                                        className={`${commentLikes[comment.id].some(cl => cl.userId === user?.id) ? 'text-red-500 fill-red-500' : ''} hover:cursor-pointer hover:fill-red-600 hover:outline-0 hover:text-red-600 transition`}
                                        />
                                    </button>
                                    
                                    <p>{commentLikes[comment.id].length}</p>
                                </div>
                                </div>

                                <p className="mt-4">{comment.content}</p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    
                </div>
            </article>
            
       </section>
    )
}

function LoginCommentPlaceholder(){
    const navigate = useNavigate();

    return (
        <div className="border border-[var(--border)] min-w-full min-h-37 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-3">
                <p className="text-[var(--muted-text)] text-[16px]">Faça login para comentar</p>
                <Button onClickAction={() => navigate('/login')}>Fazer login</Button>
            </div>
        </div>
    )

}

export const compactDateFormat = (date?: string) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(parsedDate);
}