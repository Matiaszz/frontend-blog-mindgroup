import type { ServiceResult, User } from "../@types/dtos";
import { fetchApi } from "./api";

export async function getUser(): Promise<ServiceResult<User>> {
  const data = await fetchApi<User>({
    endpoint: '/me',
    method: 'GET'
  });

  if (data.statusCode === 401) return {data: null, errors: ['Usuário não autenticado.']};

  return {
    data: data.body,
    errors: null,
  };
}