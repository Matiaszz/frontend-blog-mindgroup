import type { ServiceResult, UpdateUserDTO, User } from "../@types/dtos";
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

export async function updateUser(body: UpdateUserDTO): Promise<ServiceResult<User>> {
  const res = await fetchApi<User>({
    endpoint: '/user',
    method: 'PUT',
    body
  });
  if (res.statusCode >= 400 && res.statusCode <= 599){
    return {data: null, errors: [``]}
  }

  return {
    data: res.body,
    errors: null,
  };
}