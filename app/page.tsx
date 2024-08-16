import PostButton from "@/app/components/PostButton";
import { createPost, getAllPosts } from "@/server/actions/posts";

export default async function Home() {
  const { error, success } = await getAllPosts();

  if (error) throw new Error(error);
  if (success)
    return (
      <main>
        {success.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
        <form action={createPost}>
          <input
            className="border"
            type="text"
            placeholder="Title"
            name="title"
          />
          <PostButton title="Submit Post" />
        </form>
      </main>
    );
}
