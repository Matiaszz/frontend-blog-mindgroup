import type { Comment, ServiceResult } from "../@types/dtos";
import { fetchApi } from "./api";

export async function createComment(dto: {postId: string, content: string}): Promise<ServiceResult<Comment>> {
  const errors: string[] = [];

  if (!dto.content?.trim()) errors.push("Content is required");
  if (!dto.postId?.trim()) errors.push("PostId is required");

  if (errors.length > 0) {
    return { data: null, errors };
  }


  const response = await fetchApi<Comment>({
    endpoint: "/comment",
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
