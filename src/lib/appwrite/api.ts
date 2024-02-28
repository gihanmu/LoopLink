import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID } from "appwrite";
import { URL } from "url";

export const createUserAccount = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );
    if (!newAccount) throw new Error("Account not created");
    const avatarUrl = avatars.getInitials(newAccount.name);
    const newUser = await saveUserToDatabase({
      accountId: newAccount.$id,
      email: newAccount.email,
      imageUrl: avatarUrl,
      username: newAccount.name,
      name: user.name,
    });
    return newUser;
  } catch (error) {
    return error;
  }
};

export const saveUserToDatabase = async (user: {
  accountId: string;
  email: string;
  imageUrl: URL;
  username: string;
  name?: string;
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    return error;
  }
};

export const signInUser = async (user: { email: string; password: string }) => {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    return error;
  }
};
