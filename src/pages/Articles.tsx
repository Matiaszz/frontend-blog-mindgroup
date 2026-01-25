import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../components/FormInput";
import { useArticles } from "../hooks/useArticles";
import { LayoutGrid, LayoutList, SearchIcon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { ListArticleCard } from "../components/ListArticleCard";
import { useCategories } from "../hooks/useCategories";
import { GridArticleCard } from "../components/GridArticleCard";


export function Articles() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [view, setView] = useState<'grid' | 'column'>('grid');
    const {user, loading} = useUser();
    const articlesHook = useArticles();
    const categoriesHook = useCategories();
    const {classes} = useTheme();

    
    useEffect(() => {
        if (!loading && !user){
            navigate('/login');
            return;
        }
    }, [loading]);

    const filteredArticles = articlesHook.articles.filter(a => {
      const matchSearch =
        search === '' ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.summary.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === '' ||
        a.category.label.toLowerCase() === selectedCategory.toLowerCase();

      return matchSearch && matchCategory;
    });

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
                    placeholder={`Buscar artigos...`}  onChangeAction={(e) => setSearch(e)}/>
                </div>
                <div className="flex justify-between items-center gap-6">
                  <select 
                      name="categories" 
                      id="categories" 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categoriesHook.categories.length > 0 && categoriesHook.categories.map(c => (
                      <option value={c.label}>{c.label}</option>
                    ))}
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

            <div className={`flex ${view === 'column' ? 'flex-col' : ''} gap-5`}>
              {!articlesHook.loading && !loading && view === 'column' && filteredArticles.map((a) => (
               <ListArticleCard a={a}/>
              ))}

              {!articlesHook.loading && !loading && view === 'grid' && filteredArticles.map((a) => (
                <GridArticleCard article={a} />
              )) }
            </div>

        </section>
    );
}
