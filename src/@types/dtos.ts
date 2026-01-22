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
    user: {
        id: string;
        email: string;
        name: string;
        profilePictureUrl: string;
        biography: string | null;
        accountType: "USER" | "ADMIN"; 
        createdAt: string; 
        updatedAt: string; 
    }   
    
};
