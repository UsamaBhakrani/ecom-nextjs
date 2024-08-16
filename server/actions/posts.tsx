"use server";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { posts } from "../schema";

export const getAllPosts = async () => {
  const posts = await db.query.posts.findMany();
  if (!posts) return { error: "No posts found" };
  return { success: posts };
};

export const createPost = async (formData: FormData) => {
  const title = formData.get("title")?.toString();
  if (!title) return { error: "Title not found" };
  const newPost = await db.insert(posts).values({
    title,
  });
  // Get latest posts from the database
  revalidatePath("/");
  if (!newPost) return { error: "No post created" };
  return { success: newPost };
};
