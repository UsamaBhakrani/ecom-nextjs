"use server";
import { db } from "..";

export const getAllPosts = async () => {
  const posts = await db.query.posts.findMany();

  if (!posts) return Error("No posts found");

  return posts 
};
