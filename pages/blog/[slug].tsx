import { NotionRenderer, BlockMapType } from "react-notion";

import { getAllPosts, Post } from "../";

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // Get all posts again
  const posts = await getAllPosts();

  // Find the current blogpost by slug
  const post = posts.find((t) => t.Slug === slug);

  const blocks = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post!.id}`
  ).then((res) => res.json());

  return {
    props: {
      blocks,
      post,
    },
  };
}

const BlogPost: React.FC<{ post: Post; blocks: BlockMapType }> = ({
  post,
  blocks,
}) => {
  if (!post) return null;

  return (
    <div className="content">
      <h1>{post.Page}</h1>
      <p className="text-gray-600 text-sm ">
        {new Date(post.Date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <NotionRenderer blockMap={blocks} />
    </div>
  );
};

export async function getStaticPaths() {
  const table = await getAllPosts();
  return {
    paths: table.map((row) => `/blog/${row.Slug}`),
    fallback: false,
  };
}

export default BlogPost;
