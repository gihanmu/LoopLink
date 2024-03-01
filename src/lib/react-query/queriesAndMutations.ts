import { INewUser } from "@/types";
import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { createUserAccount, signInUser } from "../appwrite/api";
import { account, appwriteConfig, databases } from "../appwrite/config";
import { Query } from "appwrite";

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

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Account not found");
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw new Error("User not found");
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
