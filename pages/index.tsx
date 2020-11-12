import Link from "next/link";

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID || "";

export type Post = {
  id: string;
  Slug: string;
  Page: string;
  Date: string;
  Published: boolean;
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
    <div className="content">
      <h1>Satya's Blog</h1>
      <div className="mt-6">
        {posts
          .filter((post) => Boolean(post.Page))
          .map((post) => (
            <Link href="/blog/[slug]" as={`/blog/${post.Slug}`}>
              <a className="text-xl">
                <b>{post.Page}</b>
                <div className="sub text-sm">posted on {post.Date}</div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
