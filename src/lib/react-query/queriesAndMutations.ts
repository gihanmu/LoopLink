import { INewUser } from "@/types";
import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { createUserAccount, signInUser } from "../appwrite/api";

export const useCrerateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInUser = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => signInUser(user),
  });
};
