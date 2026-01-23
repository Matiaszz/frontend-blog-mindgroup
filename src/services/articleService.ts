import type { Article, ServiceResult, User } from "../@types/dtos";
import { fetchApi } from "./api";

export async function getAllArticles(): Promise<ServiceResult<Article[]>> {
  const data = await fetchApi<Article[]>({
    endpoint: '/posts',
    method: 'GET'
  });

  if (data.statusCode === 401) return {data: null, errors: ['Usuário não autenticado.']};

  return {
    data: data.body,
    errors: null,
  };
}