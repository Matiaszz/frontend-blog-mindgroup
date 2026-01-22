
import type { HttpResponse, LoginDTO, RegisterDTO, ServiceResult, User } from "../@types/dtos";
import { fetchApi } from "./api";



export async function login(dto: LoginDTO): Promise<ServiceResult<User>> {
  const errors: string[] = [];

  if (!dto.email?.trim()) errors.push("Email is required");
  if (!dto.password?.trim()) errors.push("Password is required");

  if (errors.length > 0) {
    return { data: null, errors };
  }

  await logout();

  const response = await fetchApi<User>({
    endpoint: "/auth/login",
    method: "POST",
    body: dto,
  });

  return {
    data: response.body,
    errors: null
  };
}

export async function register(
  form: RegisterDTO
): Promise<ServiceResult<User>> {

    const { email, password, confirmPassword, name } = form;

    const values = { email, password, confirmPassword, name };

    const requiredFields: Record<keyof typeof values, string> = {
        email: "Email",
        password: "Senha",
        confirmPassword: "Confirmar senha",
        name: "Nome"
    };

    const errors = (Object.keys(requiredFields) as Array<keyof typeof values>)
        .filter((key) => !values[key]?.trim())
        .map((key) => `${requiredFields[key]} é obrigatório.`);

    if (errors.length > 0) {
        return { data: null, errors };
    }
    
    const response = await fetchApi<User>({
        endpoint: "/auth/register",
        method: "POST",
        body: form,
    });

    if (response.statusCode !== 201){
        errors.push('Um erro ocorreu.');
        return {data: null, errors}
    }

    return {
        data: response.body,
        errors: null
    };
}


export async function logout(){
  await fetchApi<null>({
    endpoint: "/auth/logout",
    method: "POST",
  });

  return {
    data: null,
    errors: null,
  };
}

