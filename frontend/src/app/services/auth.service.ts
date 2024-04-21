import { Cookies } from "react-cookie";

import { api } from "../http";
import { ILogin, IUser } from "../types/user.type";
import { useMutation, useQueryClient } from "react-query";
import { IError } from "../types/error.type";
import { toast } from "react-toastify";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "registerUser",
    mutationFn: (body: Omit<IUser, "id" | "points_id" | "balance">) =>
      api
        .post(`/proprietors`, {
          name: body.name.split(" ")[0],
          surname: body.name.split(" ")[1],
          login: body.login,
          password: body.password,
          email: body.email,
        })
        .then(({ data }) => new Cookies().set("token", data)),

    onSuccess: () => {
      queryClient.invalidateQueries("getUser");
      toast.success("Регестрация успещна");
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
