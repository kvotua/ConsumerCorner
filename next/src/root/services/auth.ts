import { Cookies } from "react-cookie";

import { api } from "../http";
import { ILogin, IUser } from "../types/user";
import { useMutation, useQueryClient } from "react-query";
import { IError } from "../types/error";
import { toast } from "react-toastify";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "registerUser",
    mutationFn: (body: Omit<IUser, "id" | "points_id" | "balance">) =>
      api
        .post(`/proprietors`, {
          name: body.name,
          surname: body.surname,
          login: body.login,
          password: body.password,
          email: body.email,
        })
        .then(({ data }) => new Cookies().set("token", data)),

    onSuccess: () => {
      queryClient.invalidateQueries("getUser");
      toast.success("Регистрация успешна");
    },
    onError: (err: IError) => {
      if (err.response?.data.detail === "Login already in use") {
        toast.error("Пользователь с таким логином уже существует");
      }
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "loginUser",
    mutationFn: ({ login, password }: ILogin) =>
      api
        .get(`/proprietors/token?login=${login}&password=${password}`)
        .then(({ data }) => new Cookies().set("token", data)),

    onSuccess: () => {
      queryClient.invalidateQueries("getUser");
      toast.success("Вход успешен");
    },
    onError: (err: IError) => {
      if (err.response?.data.detail === "Wrong login or password") {
        toast.error("Не правильный логин или пароль");
      }
    },
  });
};
