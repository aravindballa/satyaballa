import Head from "next/head";
import Link from "next/link";
import { NotionRenderer, BlockMapType } from "react-notion";

import { getAllPosts, Post } from "../";
import Layout from "../../components/Layout";
import SatyaSign from "../../components/SatyaSign";
import getReadableDate from "../../utils/getReadableDate";

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
      slug,
    },
  };
}

const BlogPost: React.FC<{
  post: Post;
  blocks: BlockMapType;
  slug: string;
}> = ({ post, blocks, slug }) => {
  if (!post) return null;

  return (
    <Layout slug={slug}>
      <Head>
        <title>{post.Page} | Satya Balla</title>
        {post.Description && (
          <meta name="description" content={post.Description} />
        )}
      </Head>
      <div className="mt-6 mb-3">
        <Link href="/">⬅ Home</Link>
      </div>
      <div className="bg-white p-6 mb-6 rounded shadow-md">
        <div className="mb-6">
          <h1 className="">{post.Page}</h1>
          <p className="text-gray-600 text-sm">{getReadableDate(post.Date)}</p>
          {post.Tags && (
            <div className="mt-4 flex gap-2">
              {post.Tags.map((tag) => (
                <span className="py-1 px-3 bg-gray-300 text-gray-700 rounded text-sm cursor-default">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <NotionRenderer blockMap={blocks} />
        <SatyaSign className="w-16 h-auto" />
      </div>
    </Layout>
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
