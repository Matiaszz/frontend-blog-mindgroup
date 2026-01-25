import { Link } from "react-router-dom";
import type { Article } from "../@types/dtos";
import { ArticleImage } from "./ArticleImage";
import { extenseDateFormat } from "../utils/utils";
import { Clock, Eye, Heart } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export function GridArticleCard({article, noImage = false}: {article: Article, noImage?: boolean}){
    const {classes} = useTheme();

    return(
        <Link
            key={article.id}
            to={`/artigo/${article.id}`}
            
            className={`
                flex 
                group
                flex-col 
                gap-3 
                max-w-[352px] 
                border
                border-[var(--border)] 
                ${classes.textClass} 
                bg-[var(--secondary)] 
                p-5 
                hover:border-[var(--primary)]
                transition

                `
            }
          >
            {!noImage && (
                <ArticleImage
                className="w-[352px] h-[228px] object-cover object-cover 
                    transition-transform 
                    duration-300 
                    group-hover:scale-105"
                title={article.title}
                postId={article.id}
                />
            )}


            <div className="flex items-center justify-between text-sm">
              <div className="flex gap-2 flex-wrap">
                {article.postTags.map((tag) => (
                  <span
                    key={tag.tag.id}
                    className="px-2 py-1 text-xs bg-[var(--muted)] text-[var(--muted-text)]"
                  >
                    {tag.tag.name}
                  </span>
                ))}
              </div>

              <span className="flex items-center gap-1 text-[var(--muted-text)]">
                <Clock size={14} />
                {extenseDateFormat(article.createdAt)}
              </span>
            </div>

            <h4 className="text-lg font-semibold group-hover:text-[var(--primary)] transition leading-tight">
              {article.title}
            </h4>

            <p className="text-sm text-[var(--muted-text)] line-clamp-3">
              {article.summary}
            </p>

            <div className="flex items-center justify-between text-sm pt-2 border-t border-[var(--border)]">
              <span className="text-[var(--muted-text)]">
                {article.author.name}
              </span>

              <div className="flex items-center gap-4 text-[var(--muted-text)]">
                <span className="flex items-center gap-1 group-hover:opacity-0 duration-200 transition"><Clock/>{article.averageReadTimeInMinutes} min</span>
                <span className="flex items-center gap-1 group-hover:opacity-0 duration-200 transition"><Eye/>{article.views}</span>
                <span className="flex items-center gap-1 transition"><Heart/>{article.likes.length} </span>
              </div>
            </div>
          </Link>
    )
} 