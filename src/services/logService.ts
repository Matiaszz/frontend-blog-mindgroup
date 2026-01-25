import type { LogResponseDTO } from "../@types/dtos";
import { fetchApi } from "./api";

export async function getLatestActivites() {
  const res = await fetchApi<LogResponseDTO[]>({
    endpoint: `/logs/latest`,
    method: 'GET'
  });

    if (res.statusCode >= 400 && res.statusCode <= 599){
      return {data: null, errors: ['Um erro ocorreu.' + res.body]}
    }
    
  return {data: res, errors: null};
}