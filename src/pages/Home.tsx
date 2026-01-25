import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useArticles } from "../hooks/useArticles";
import type { Article } from "../@types/dtos";
import { useEffect, useState } from "react";
import { NavLink } from "../components/ui/NavLink";
import { ArrowRight, Clock, Mail } from "lucide-react";
import { ArticleImage } from "../components/ArticleImage";
import { useTheme } from "../hooks/useTheme";
import { extenseDateFormat } from "../utils/utils";
import { GridArticleCard } from "../components/GridArticleCard";
import { FormInput } from "../components/FormInput";

export function Home() {
  const navigate = useNavigate();

  const {articles} = useArticles();
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);  
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const {classes} = useTheme();


  useEffect(() => {
    setTrendingArticles(
      [...articles]
        .sort((a, b) => b.likes.length - a.likes.length)
        .slice(0, 6)
    );

    setRecentArticles(
      [...articles].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  }, [articles]);

  return (
    <section className={classes.textClass}>
        <section className="min-w-screen min-h-screen flex justify-center items-center border-b border-b-[var(--border)] gap-5 flex-col">
          <div className="">
            <h1 className="text-[36px] font-semibold max-w-100 text-center">Explore o Futuro da <span className="text-[var(--primary)]">Tecnologia</span></h1>
          </div>
          <div className="max-w-150 text-center">
            <p className="text-[var(--muted-text)] font-semibold text-[24px]">Artigos sobre IA, desenvolvimento, DevOps e as últimas tendências tecnológicas</p>
          </div>
          <div className="min-w-fit flex flex-col gap-3">
            <Button className="min-w-full" onClickAction={() => navigate('/artigos')}>Explorar Artigos</Button>
            <Button className="min-w-full" invertColors onClickAction={() => navigate('/dashboard')}>Começar a Escrever</Button>
          </div>
        </section>

        <section className="min-w-screen min-h-fit p-20 flex flex-col gap-5">
          <header className="flex justify-between flex-col min-w-screen">
            <div className="flex justify-between min-w-[90dvw]">
              <h3 className="text-[36px] font-semibold">Artigos em Destaque</h3>
              <NavLink className="list-none" to='/artigos' >
                <span className="flex items-center pr-40 gap-3">
                  Ver todos <ArrowRight/>
                </span>
              </NavLink>
            </div>
            <div>
              <p className="text-[var(--muted-text)] text-[24px]">Os melhores conteúdos selecionados para você</p>
            </div>
          </header>
          <div className="grid grid-cols-3 grid-rows-3">
            {trendingArticles.map((article) => (
              <GridArticleCard article={article} />
            ))}
          </div>
        </section>
        <section className="min-w-screen min-h-fit p-20 flex flex-col gap-5">
          <header className="flex justify-between flex-col min-w-screen">
            <div className="flex justify-between min-w-[90dvw]">
              <h3 className="text-[36px] font-semibold">Artigos recentes</h3>
            </div>
            <div>
              <p className="text-[var(--muted-text)] text-[24px]">Conteúdo recente da comunidade</p>
            </div>
          </header>
          <div className="grid grid-cols-3 grid-rows-3">
            {recentArticles.map((article) => (
              <GridArticleCard noImage article={article}/>
            ))}
          </div>

        </section>

        <section className="min-w-screen/2 min-h-screen/2 p-20 flex flex-col justify-center items-center border-[var(--border)] border gap-5 bg-[var(--secondary)]">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className={`p-6 ${classes.bgClass} border flex items-center justify-center w-20 h-20 border-[var(--border)]`}>
                <Mail size={40}/>
              </div>
              <div className="text-center">
                <h1 className="font-semibold text-[32px]">Newsletter Semanal</h1>
                <p>
                  Receba os melhores artigos de tecnologia diretamente no seu email. 
                  Sem spam, apenas conteúdo de qualidade.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <form className="flex gap-3 justify-center items-center" action="#">
                  <FormInput 
                  type='text'
                  placeholder="exemplo@email.com"
                  label=""
                  identifier="newsletter"
                  className="bg-[var(--bg)] border-2 w-sm border-[var(--border)] p-2 text-[var(--muted-text)]"
                  ignoreCSS
                  onChangeAction={() => {}} />
                  <Button onClickAction={() => {}}>Inscrever</Button>
                </form>

                <p className="text-[var(--muted-text)] text-sm">Mais de 10.000 desenvolvedores já recebem nossa newsletter</p>
              </div>
            </div>
        </section>

        <section className="min-w-screen/2 min-h-screen/2 p-20 flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="text-center">
                <h1 className="font-semibold text-[32px]">Compartilhe seu conhecimento</h1>
                <p className="text-[14px]">
                  Junte-se à nossa comunidade de escritores e compartilhe suas experiências e conhecimentos em tecnologia
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Button onClickAction={() => {navigate('/registro')}}>Criar Conta Gratuita</Button>
              </div>
            </div>
        </section>
    </section>
  )
}
