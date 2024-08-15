import { getAllPosts } from "@/server/actions/get-posts";

export default async function Home() {
  const data = await getAllPosts();
  console.log(data);
  return <main>Hello</main>;
}
