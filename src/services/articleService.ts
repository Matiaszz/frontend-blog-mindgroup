import type { Article, Category, ServiceResult, User } from "../@types/dtos";
import { fetchApi } from "./api";

export async function getAllArticles(): Promise<ServiceResult<Article[]>> {
  const data = await fetchApi<Article[]>({
    endpoint: '/posts',
    method: 'GET'
  });

  return {
    data: data.body,
    errors: null,
  };
}

export async function getArticleById(id: string): Promise<ServiceResult<Article>> {
    const data = await fetchApi<Article>({
        endpoint: '/post/' + id,
        method: 'GET'
    });

    if (data.statusCode >= 400 && data.statusCode <= 599){
        return {data: null, errors: ['Um erro ocorreu.' + data.body]}
    }
    
    return {data: data.body, errors: null};
}