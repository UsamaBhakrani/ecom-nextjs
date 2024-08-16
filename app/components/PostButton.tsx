"use client";

import { useFormStatus } from "react-dom";
const PostButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white rounded-lg py-2 px-4 disabled:opacity-10"
      disabled={pending}
    >
      {title}
    </button>
  );
};

export default PostButton;
