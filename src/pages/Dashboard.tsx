import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Dot, Edit, File, FileText, Heart, Icon, MessageSquare, Plus, Settings, Trash, TrendingUp, X } from "lucide-react";
import type { Article, Category, CreatePostDTO } from "../@types/dtos";
import { createPost, deleteArticleById, getMyArticles } from "../services/articleService";
import { ArticleImage } from "../components/ArticleImage";
import { compactDateFormat } from "./Article";
import { Modal } from "../components/Modal";
import { useTheme } from "../hooks/useTheme";
import { FormInput } from "../components/FormInput";
import { useCategories } from "../hooks/useCategories";

type CreatePostForm = {
  title: string;
  summary: string;
  categoryId: number | null;
  coverImage: File | null;
  tags: string[];
  content: string;
};

export function Dashbaord() {
    const defaultCreateForm = {
        title: '',
        summary: '',
        categoryId: null,
        coverImage: null,
        tags: [],
        content: ''
    } as CreatePostForm;
    const navigate = useNavigate();
    const {user, loading} = useUser();
    const [articles, setArticles] = useState<Article[]>([]);
    const [modalVisible, setModalVisible] = useState<null | 'create' | 'delete' | 'edit'>(null);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const categoriesHook = useCategories();
    const [currentTag, setCurrentTag] = useState('');
    
    const [createForm, setCreateForm] = useState<CreatePostForm>(defaultCreateForm);


    const {classes} = useTheme();
    
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


    function confirmDelete(id: Article){
        setModalVisible('delete');
        setSelectedArticle(id);
    }

    async function handleDelete(id: string) {

        const deleted = await deleteArticleById(id);
        if (!deleted.errors && deleted.data){
            alert('Artigo deletado.');
            setArticles(articles.filter(a => a.id !== id));
            articles.filter(a => a.id !== id);
        }
        setModalVisible(null);
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();

        if (!createForm.categoryId) return;

        const dto: CreatePostDTO = {
            title: createForm.title,
            summary: createForm.summary,
            categoryId: createForm.categoryId,
            tags: createForm.tags,
            content: createForm.content
        };

        const res = await createPost(dto, createForm.coverImage);
        if (res.errors && !res.data){
            console.error(res.errors);
            alert(res.errors);
            return;
        }

        setArticles([...articles, res.data as Article])
        alert('success');
        setModalVisible(null);
        setCreateForm(defaultCreateForm);
    }

    const disableBtn = () =>{
        return createForm.content.length < 20 || createForm.summary.length < 10 || createForm.title.length < 3;
    }

    if (loading) return <h2>Carregando...</h2>
    return (
    <section className="flex flex-col min-h-screen p-20 gap-10 items-center max-w-screen">
        <div className="w-full max-w-[1200px] flex justify-between flex-wrap gap-10 ">
            <div>
                <h2 className="text-[36px]">Dashboard</h2>
                <p className="text-[var(--muted-text)]">
                    Bem vindo de volta, {user?.name}!
                </p>
            </div>
            <div className="flex gap-3">
                <Button invertColors onClickAction={() => console.log("Config")}>
                    <span className="flex gap-2 items-center ">
                        <Settings />
                        Configurações
                    </span>
                </Button>

                <Button onClickAction={() => setModalVisible('create')}>
                    <span className="flex gap-2 items-center">
                        <Plus />
                        Novo Artigo
                    </span>
                </Button>

            </div>
        </div>

        <div className="flex gap-5 max-w-screen flex-wrap">
            <InfoCard title="Total de Artigos" icon='file' metric={articles.length} />
            <InfoCard title="Engajamento" icon='comment' metric={getTotalComments()} />
            <InfoCard title="Curtidas" icon='like' metric={getTotalLikes()} />
            <InfoCard title="Tempo médio de leitura" icon='upscale' metric={!isNaN(getAverageReadTime()) ? getAverageReadTime() : 0} />
        </div>

        <div className="flex gap-10 border flex-wrap border-[var(--border)] p-5">
            
            <div className="flex-1 ">
                <div className="border-b border-b-[var(--border)] pb-2 mb-5">
                    <h3>Meus Artigos</h3>
                </div>

                <div className="flex flex-col gap-5 border flex-wrap border-[var(--border)] p-5">
                    {articles.map(article => (
                    <div
                        key={article.id}
                        className="flex justify-between flex-wrap items-center border-b border-b-[var(--border)] pb-3"
                    >
                        <div className="w-[120px]">
                            <ArticleImage title={article.title} postId={article.id} />
                        </div>

                        <div className="flex-1 px-5">
                        <h3>{article.title}</h3>
                        <p>{article.summary.length > 60 ? `${article.summary.substring(0, 60)}...` : article.summary}</p>

                        <div className="flex items-center gap-3 text-sm mt-2 ">
                            <p>{compactDateFormat(article.createdAt)}</p>
                            <Dot />
                            <MessageSquare />
                            <p>{article.comments.length}</p>
                            <Dot />
                            <Heart />
                            <p>{article.likes.length}</p>
                        </div>
                        </div>

                        <div className="flex flex-col gap-2">
                        <Button onClickAction={() => {}} invertColors>
                            <span className="flex gap-2 items-center">
                            <Edit />
                            Editar
                            </span>
                        </Button>

                        <Button onClickAction={() => confirmDelete(article)} invertColors>
                            <span className="flex gap-2 items-center">
                            <Trash />
                            Excluir
                            </span>
                        </Button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <div className="border border-[var(--border)] p-5">
                <div className="border-b border-b-[var(--border)] p-5">
                    <h4>Atividades recentes</h4>
                </div>
                <div>
                    
                </div>
            </div>

        </div>

        {modalVisible === 'delete' && selectedArticle && (
            <Modal title={`Excluir artigo`} onClose={() => setModalVisible(null)}>
                <div className={`flex flex-col max-w-full justify-end ${classes.textClass}`}>
                    <p className="text-[var(--muted-text)]">Tem certeza que deseja excluir este artigo? essa ação não pode ser desfeita</p>

                    <div className="flex justify-end gap-3 w-full">
                        <Button
                            ignoreCSS
                            className="bg-[var(--secondary)] border border-[var(--border)] p-3 hover:cursor-pointer hover:bg-[var(--primary)] transition text-[var(--text)]"
                            onClickAction={() => setModalVisible(null)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            ignoreCSS
                            className="bg-red-500/40 border-red-400 border text-red-300 p-3 hover:cursor-pointer hover:bg-red-700/80 transition"
                            onClickAction={() => handleDelete(selectedArticle?.id)}
                        >
                            Excluir
                        </Button>
                    </div>
                </div>                       
            </Modal>
        )}

        {modalVisible === 'create' && (
            <Modal title={`Criar artigo`} onClose={() => setModalVisible(null)}>
                <div className={`flex flex-col max-w-full justify-end ${classes.textClass}`}>
                    <form className="flex flex-col gap-5" onSubmit={handleCreate}>
                        <div className="flex flex-col">
                            <FormInput 
                            required
                            type="text"
                            label='Título do artigo'
                            identifier="title"
                            placeholder="Título... (mínimo 3 caracteres)"
                            onChangeAction={(e) => setCreateForm({...createForm, title: e})}/>

                        </div>

                        <div className="flex flex-col">
                             <FormInput 
                                required
                                type="textarea"
                                label='Resumo'
                                identifier="summary"
                                placeholder="Resumo... (mínimo 10 caracteres)"
                                onChangeAction={(e) => setCreateForm({...createForm, summary: e})}/>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[12px]" htmlFor="category">Categoria *</label>
                            <select
                            required
                            name="category"
                            value={String(createForm.categoryId)}
                            onChange={(e) => setCreateForm({...createForm, categoryId: Number.parseInt(e.target.value)})}
                            >
                            <option value="">Selecione uma categoria</option>

                            {categoriesHook.categories.map(c => (
                                <option key={c.id} value={c.id}>
                                {c.label}
                                </option>
                            ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="coverImage">Imagem de Capa *</label>
                            <input
                            type="file"
                            required
                            className={'border-2 border-[var(--border)] p-2 bg-[var(--secondary)] text-[var(--muted-text)]'}
                            name="coverImage"
                            id="coverImage"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setCreateForm({...createForm, coverImage: file});
                            }}
                            />

                        </div>

                        <div className="flex flex-col">
                            <FormInput 
                                required
                                type="text"
                                label='Tags'
                                identifier="tags"
                                placeholder="Tags..."
                                onChangeAction={(e) => setCurrentTag(e)}
                                />
                            <div className="flex flex-col items-end">
                            
                                <Button
                                type='button'
                                    onClickAction={() => {
                                        if (!currentTag.trim()) return;

                                        setCreateForm({
                                        ...createForm,
                                        tags: [...createForm.tags, currentTag.trim()]
                                        });

                                        setCurrentTag('');
                                    }}
                                >   
                                    <Plus />
                                </Button>

                            </div>
                            <div className="text-[12px] flex  gap-3 flex-wrap">
                                {createForm.tags.map(t => (
                                    <div key={t} className="border border-[var(--border)] flex items-center justify-center">
                                        <p>{t}</p>
                                        <button  className="hover:cursor-pointer" onClick={(e) => {
                                            setCreateForm({
                                            ...createForm,
                                            tags: createForm.tags.filter(tag => tag !== t)
                                            });
                                        }}><X/></button>
                                    </div>
                                ))}
                            </div>
                            

                        </div>

                        <div className="flex flex-col">
                            <FormInput 
                            required
                            type="textarea"
                            label='Conteúdo'
                            identifier="content"
                            placeholder="Conteúdo...(mínimo 20 caracteres )"
                            onChangeAction={(e) => setCreateForm({...createForm, content: e})}/>
                            <div className="flex items-center">
                                <p className="text-[var(--muted-text)] text-[12px]">{createForm.content.length} Caracteres</p>
                                <Dot></Dot>
                                <p className="text-[var(--muted-text)] text-[12px]">{createForm.content.trim().split(' ').length} Palavras</p>
                                <Dot></Dot>
                                <p className="text-[var(--muted-text)] text-[12px]">{Math.ceil(createForm.content.length / 200)} minutos de leitura</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-end gap-3">
                            <button  
                            className="transition p-2.5 disabled:bg-gray-500 disabled:cursor-not-allowed hover:cursor-pointer bg-[var(--primary)] text-[var(--bg)] hover:bg-cyan-800"
                            disabled={disableBtn()} type="submit">
                                {loading ? 'Carregando...' : `Publicar artigo`}
                            </button>
                            <Button invertColors onClickAction={() => setModalVisible(null)}>Cancelar</Button>
                        </div>
                       

                        
                    </form>
                </div>                       
            </Modal>
        )}
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