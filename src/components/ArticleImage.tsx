import { useEffect, useState } from "react";
import { API_URL } from "../services/api";

export function ArticleImage({ postId, title, className }: { postId: string; title: string, className?: string }) {
  const [coverUrl, setCoverUrl] = useState<string>("https://via.placeholder.com/150");

  useEffect(() => {
    async function fetchCover() {
        try {
        const res = await fetch(`${API_URL ?? 'http://localhost:3000/api'}/post/${postId}/cover`);

        if (res.ok) {
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setCoverUrl(url);
        } else {
            setCoverUrl('./default-cover.png');
        }
        } catch (err) {
        console.error("Erro ao carregar cover:", err);
        setCoverUrl('./default-cover.png'); 
        }
    }

    fetchCover();
    }, [postId]);


  return <img className={className} src={coverUrl} alt={title} />;
}
