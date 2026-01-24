import type { Article, Category, CreatePostDTO, ServiceResult, User } from "../@types/dtos";
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

export async function getMyArticles(): Promise<ServiceResult<Article[]>> {
    const data = await fetchApi<Article[]>({
        endpoint: '/posts/my',
        method: 'GET'
    });

    if (data.statusCode >= 400 && data.statusCode <= 599){
        return {data: null, errors: ['Um erro ocorreu.' + data.body]}
    }
    
    return {data: data.body, errors: null};
}


export async function deleteArticleById(id: string) {
  const res = await fetchApi<void>({
    endpoint: `/post/${id}`,
    method: 'DELETE'
  });

  if (res.statusCode >= 400 && res.statusCode <= 599){
    return {data: null, errors: ['Um erro ocorreu.' + res.body]}
  }
  
  return {data: true, errors: null};
}

export async function createPost(dto: CreatePostDTO): Promise<ServiceResult<User>> {
  const errors: string[] = [];

  if (!dto.categoryId) errors.push("Category is required");
  if (!dto.content.trim()) errors.push("Content is required");
  if (!dto.summary.trim()) errors.push('Summary is required');
  if (!dto.title.trim()) errors.push('Title is required');
    
  if (errors.length > 0) {
    return { data: null, errors };
  }


  const response = await fetchApi<null>({
    endpoint: "/post",
    method: "POST",
    body: dto,
  });

  if (errors.length > 0) {
    return { data: null, errors };
  }

  return {
    data: response.body,
    errors: null
  };
}
