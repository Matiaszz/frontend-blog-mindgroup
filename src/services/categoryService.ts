import type { Category, ServiceResult } from "../@types/dtos";
import { fetchApi } from "./api";

export async function getAllCategories(): Promise<ServiceResult<Category[]>> {
  const data = await fetchApi<Category[]>({
    endpoint: '/categories',
    method: 'GET'
  });

  return {
    data: data.body,
    errors: null,
  };
}