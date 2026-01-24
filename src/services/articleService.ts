import type { Article, Category, CreateLikeDTO, CreatePostDTO, Like, ServiceResult, User } from "../@types/dtos";
import { API_URL, fetchApi } from "./api";

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

export async function createPost(dto: CreatePostDTO, file: File | null): Promise<ServiceResult<Article>> {
  if (!file) return { data: null, errors: ['Cover image is required'] };
  const errors: string[] = [];

  if (!dto.categoryId) errors.push("Category is required");
  if (!dto.content.trim()) errors.push("Content is required");
  if (!dto.summary.trim()) errors.push('Summary is required');
  if (!dto.title.trim()) errors.push('Title is required');
    
  if (errors.length > 0) {
    return { data: null, errors };
  }

  const response = await fetchApi<Article>({
    endpoint: "/post",
    method: "POST",
    body: dto,
  });

  if (errors.length > 0) {
    return { data: null, errors };
  }
   const formData = new FormData();
   formData.append("file", file);

  const sendBanner = await fetch(`${API_URL}/post/${response.body?.id}/upload`, {
    method: "POST",
    credentials: "include",
    body: formData, 
  });

  if (!sendBanner.ok) {
    const error = await sendBanner.text();
    await deleteArticleById(response.body!.id);
    throw new Error(error);
  }

  return {
    data: response.body,
    errors: null
  };
}

export async function updateArticleById(id:string, dto: CreatePostDTO, file?: File | null): Promise<ServiceResult<Article>> {
  console.warn(dto);
  const errors: string[] = [];

  if (!dto.categoryId) errors.push("Category is required");
  if (!dto.content.trim()) errors.push("Content is required");
  if (!dto.summary.trim()) errors.push('Summary is required');
  if (!dto.title.trim()) errors.push('Title is required');
    
  if (errors.length > 0) {
    return { data: null, errors };
  }

  const response = await fetchApi<Article>({
    endpoint: "/post/" + id,
    method: "PUT",
    body: dto,
  });

  if (errors.length > 0) {
    return { data: null, errors };
  }

  if (file) { 
    const formData = new FormData();
    formData.append("file", file);

    const removeBanner = await fetch(`${API_URL}/post/${response.body?.id}/removeCover`, {
      method: 'DELETE',
      credentials: 'include',
      body: formData
    });

    if (!removeBanner.ok){
      const error = await removeBanner.text();

      throw new Error(error);
    }

    const sendBanner = await fetch(`${API_URL}/post/${response.body?.id}/upload`, {
      method: "POST",
      credentials: "include",
      body: formData, 
    });

    if (!sendBanner.ok) {
      const error = await sendBanner.text();

      throw new Error(error);
    }


    return {data: response.body, errors: null};

  };
    
  

  return {
    data: response.body,
    errors: null
  };
}


export async function toggleLike(dto: CreateLikeDTO) {
  const res = await fetchApi<Like>({
    endpoint: `/toggleLike`,
    method: 'POST',
    body: dto
  });

    if (res.statusCode >= 400 && res.statusCode <= 599){
      return {data: null, errors: ['Um erro ocorreu.' + res.body]}
    }
    
  return {data: res, errors: null};
}