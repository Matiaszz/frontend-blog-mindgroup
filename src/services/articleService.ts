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