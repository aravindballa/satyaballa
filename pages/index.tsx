import { url } from "inspector";
import Link from "next/link";

import Layout from "../components/Layout";
import getRandomTailwindGradient from "../utils/getRandomTailwindGradient";
import getReadableDate from "../utils/getReadableDate";

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID || "";

export type Post = {
  id: string;
  Cover?: { name: string; url: string; rawUrl: string }[];
  Slug: string;
  Page: string;
  Date: string;
  Published: boolean;
  Tags?: String[];
};

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
};

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

function HomePage({ posts }: { posts: Post[] }) {
  return (
    <Layout>
      <div className="full-width head">
        <h1 className="text-gray-900">Satya's Blog</h1>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {posts
          .filter((post) => Boolean(post.Page) && post.Published)
          .map((post) => (
            <Link key={post.id} href="/blog/[slug]" as={`/blog/${post.Slug}`}>
              <a className="block bg-white rounded-md shadow-lg hover:shadow-xl focus:shadow-xl">
                <div
                  className={`w-full h-64 mb-4 rounded-md rounded-b-none ${getRandomTailwindGradient()}`}
                  style={
                    post.Cover
                      ? {
                          backgroundImage: `url(${post.Cover[0].url})`,
                          backgroundSize: "cover",
                        }
                      : {}
                  }
                />
                <span className="block text-2xl mx-6">{post.Page}</span>
                <span className="block text-sm text-gray-600 mx-6 mb-6">
                  {getReadableDate(post.Date)}
                </span>
              </a>
            </Link>
          ))}
      </div>
    </Layout>
  );
}

export default HomePage;
