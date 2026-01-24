export type HttpResponse<T> = {
  statusCode: number;
  body: T | null;
};

export type ServiceResult<T> = {
  data: T | null;
  errors: string[] | null;
};

export type RegisterDTO = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type LoginDTO = Pick<RegisterDTO, "email" | "password">

export type User = {
  id: string;
  email: string;
  name: string;
  profilePictureUrl: string;
  biography: string | null;
  accountType: "USER" | "ADMIN"; 
  createdAt: string; 
  updatedAt: string; 
};

export type Tag = {
  id: number;
  name: string;
};

export type PostTag = {
  tag: Tag;
};

export type Author = {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
};

export type Category = {
  id: number;
  label: string;
};

export type Article = {
  id: string;
  title: string;
  summary: string;
  content: string;
  published: boolean;
  views: number;
  averageReadTimeInMinutes: number;
  createdAt: string;
  author: Author;
  category: Category;
  postTags: PostTag[];
  likes: Like[];
  favorites: Favorite[];
  comments: Comment[];
};

export type Favorite = {
  id: number;
  userId: string;
  postId: string;
  favorited: boolean;
}

export type Comment = {
  id: number;
  content: string;
  postId: string;
  user: User;
  createdAt: string;
  commentLikes: CommentLikeResponseDTO[];
}

export type CreateLikeDTO = {
  postId: string;
}

export type CreateFavoriteDTO = {
  postId: string;
}


export type Like = {
  id: number;
  postId: string;
  userId: string;
  like: boolean;
}


export type CommentLikeResponseDTO = {
  id: number,
  userId: string,
  postId: string,
  commentId: number
}

export type CreatePostDTO = {
  title: string,
  summary: string,
  content: string,
  tags?: string[],
  categoryId: number
}